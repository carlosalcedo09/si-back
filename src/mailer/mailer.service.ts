import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer'; 
import * as hbs from 'nodemailer-express-handlebars';
import * as path from 'path';

@Injectable()
export class MailerService{
    private transporter;
    private verificationCode: string;
  
    constructor() {
      this.transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'ucvasistent@gmail.com',
          pass: 'cdcl xmvr rawb peys', // Contraseña de aplicación
        },
      });
  
      const handlebarOptions = {
        viewEngine: {
          partialsDir: path.resolve('./src/templates/'),
          defaultLayout: false,
        },
        viewPath: path.resolve('./src/templates/'),
      };
  
      this.transporter.use('compile', hbs(handlebarOptions));
    }
  
    generateVerificationCode(length: number): string {
      const characters = '0123456789';
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      // Almacena el código generado
      this.verificationCode = result;
      return result;
    }
  
    async sendVerificationEmail(email: string, code: string) {
      await this.transporter.sendMail({
        from: '"Código de Verificación " <ucvasistent@gmail.com>',
        to: email,
        subject: 'Código de Verificación',
        template: 'verification-code',
        context: {
          code: code,
        },
      });
    }
  
    verifyVerificationCode(code: string): boolean {
      return code === this.verificationCode;
    }
}