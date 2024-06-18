import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('email')
export class EmailController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('enviarCorreo')
  async enviarCorreo(@Body() body: { email: string }){
    const verificationCode = this.mailerService.generateVerificationCode(4); // Genera un código de 6 dígitos
    await this.mailerService.sendVerificationEmail(body.email,verificationCode);
    return { message: 'Correo de verificación enviado' };
  }

  
  @Post('verificarCodigo')
  async verificarCodigo(@Body() body: { code: string }) {
    const isCodeValid = this.mailerService.verifyVerificationCode(body.code);
    if (isCodeValid) {
      return { message: 'Código de verificación válido' };
    } else {
      return { message: 'Código de verificación inválido' };
    }
  }
  
}
