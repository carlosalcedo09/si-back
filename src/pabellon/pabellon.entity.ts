import { DetalleMatricula } from "src/detallematricula/detallematricula.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name:'pabellon'})

export class Pabellon{

      @PrimaryColumn()
         IdPabellon: string
      
      @Column()
         NombrePabellon: string

      
      @OneToMany(()=>DetalleMatricula,(detallematricula)=>detallematricula.pabellon)
         detallematricula:DetalleMatricula[];
   }