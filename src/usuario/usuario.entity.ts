import {Entity, Column, PrimaryColumn} from 'typeorm'

@Entity({name: 'usuario'})
export class Usuario{
    @PrimaryColumn()
    id: number
    
    @Column()
    username: string

    @Column()
    password: string
}