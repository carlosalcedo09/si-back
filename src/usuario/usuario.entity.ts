import { Profesor } from 'src/profesor/profesor.entity'
import {Entity, Column, PrimaryColumn, OneToOne, JoinColumn} from 'typeorm'

@Entity({name: 'usuario'})
export class Usuario{
    @PrimaryColumn()
    id: number
    
    @Column()
    username: string

    @Column()
    password: string

    @Column()
    issuperuser: boolean

    @Column()
    codigoD: number

    @OneToOne(()=>Profesor, (profesor)=>profesor.usuario)
    @JoinColumn({name:'codigoD'})
    profesor: Profesor;

}