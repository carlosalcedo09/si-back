import { DetalleMatricula } from "src/detallematricula/detallematricula.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name:'modalidad'})

export class Modalidad{
    @PrimaryColumn() 
    idModalidad:string

    @Column()
    descripcionM:string
    
    @OneToMany(()=>DetalleMatricula,(detallematricula)=>detallematricula.curso)
    detallematricula:DetalleMatricula[];
    }