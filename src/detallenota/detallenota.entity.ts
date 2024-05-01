import { Notas } from "src/notas/notas.entity";
import { Tipo } from "src/tipo/tipo.entity";
import { Unidad } from "src/unidad/unidad.entity";
import { Column, Entity, JoinColumn, ManyToMany, PrimaryColumn } from "typeorm";

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

    @ManyToMany(()=>Notas, (notas)=>notas.detallenota)
    @JoinColumn({name:'idDetalleMc'})
    notas: Notas;

    @ManyToMany(()=>Tipo,(tipo)=>tipo.detallenota)
    @JoinColumn({name:'idTipo'})
    tipo: Tipo;

    @ManyToMany(()=>Unidad, (unidad)=>unidad.detallenota)
    unidad: Unidad;
}