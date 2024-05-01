import { Notas } from "src/notas/notas.entity";
import { Tipo } from "src/tipo/tipo.entity";
import { Unidad } from "src/unidad/unidad.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({name:'detallenota'})

export class DetalleNota{
    @PrimaryColumn()
    idDetalleMC:string

    @PrimaryColumn()
    idTipo:string

    @PrimaryColumn()
    idUnidad:string

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    nota: number

    @ManyToOne(()=>Notas, (notas)=>notas.detallenota)
    @JoinColumn({name:'idDetalleMC'})
    notas: Notas;

    @ManyToOne(()=>Tipo,(tipo)=>tipo.detallenota)
    @JoinColumn({name:'idTipo'})
    tipo: Tipo;

    @ManyToOne(()=>Unidad, (unidad)=>unidad.detallenota)
    @JoinColumn({name:'idUnidad'})
    unidad: Unidad;
}