import { CategoriaCurso } from "src/categoriacurso/categoriacurso.entity";
import { Ciclo } from "src/ciclo/ciclo.entity";
import { DetalleMatricula } from "src/detallematricula/detallematricula.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name:'curso'})

export class Curso{

    @PrimaryColumn()
    idCurso: string

    
    @Column()
    NombreCurso: string

    @Column()
    NumeroCreditos: number

    @Column()
    idCategoriaCurso: string

    @Column()
    idCiclo: number

    @ManyToOne(()=> CategoriaCurso, (categoriacurso)=>categoriacurso.curso)
    @JoinColumn({name:'idCategoriaCurso'})
    categoriacurso: CategoriaCurso;

    @ManyToOne(()=> Ciclo, (ciclo)=>ciclo.curso)
    @JoinColumn({name:'idCiclo'})
    ciclo: Ciclo;

    @OneToMany(()=>DetalleMatricula,(detallematricula)=>detallematricula.curso)
    detallematricula:DetalleMatricula[];
    
}