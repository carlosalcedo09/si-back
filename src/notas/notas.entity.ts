import { DetalleMatricula } from "src/detallematricula/detallematricula.entity";
import { DetalleNota } from "src/detallenota/detallenota.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name:'notas'})

export class Notas{
    @PrimaryColumn()
    idDetalleMC: string

    @Column()
    idCurso: string

    @Column()
    idMatricula: number

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    promedioPonderado: number

    @Column()
    estado:string

    @ManyToOne(() => DetalleMatricula, (detalleMatricula)=> detalleMatricula.notas)
    @JoinColumn([{ name: 'idMatricula', referencedColumnName: 'idMatricula' },
                { name: 'idCurso', referencedColumnName: 'idCurso' }])
    detalleMatricula: DetalleMatricula;

    @OneToMany(()=>DetalleNota, (detallenota)=>detallenota.notas)
    detallenota: DetalleNota[];
}