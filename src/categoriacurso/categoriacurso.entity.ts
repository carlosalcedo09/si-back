import { Curso } from "src/curso/curso.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name:'categoriacurso'})

export class CategoriaCurso{
    @PrimaryColumn()
    idCategoriaCurso:string

    @Column()
	descripcionCC:string

    @OneToMany(()=> Curso, (curso)=>curso.categoriacurso)
    curso: Curso[];
}