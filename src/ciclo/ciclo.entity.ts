import { Curso } from "src/curso/curso.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name: 'ciclo'})

export class Ciclo{
    @PrimaryColumn()
    idCiclo: number

    @Column()
    descripcion: string

    @OneToMany(()=>Curso,(curso)=>curso.ciclo)
    curso: Curso[]
}