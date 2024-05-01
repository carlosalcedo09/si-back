import { DetalleMatricula } from "src/detallematricula/detallematricula.entity";
import { Distrito } from "src/distrito/distrito.entity";
import { EstadoCivil } from "src/estadocivil/estadocivil.entity";
import { Genero } from "src/genero/genero.entity";
import { Usuario } from "src/usuario/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity({name:'profesor'})

export class Profesor{
    @PrimaryColumn()
    codigoD: number

    @Column()
    dniProf: string

    @Column()
    nombresD: string

    @Column()
    apellidosD: string

    @Column()
    correo: string

    @Column()
    celular: string

    @Column()
    direccion: string

    @Column()
    idGenero: string
    
    @Column()
    idEstado: string

    @Column()
    idDistrito: number

    @ManyToOne(()=> Genero, (genero)=>genero.profesor)
    @JoinColumn({name:'idGenero'})
    genero: Genero;

    @ManyToOne(()=>EstadoCivil, (estadocivil)=>estadocivil.profesor)
    @JoinColumn({name:'idEstado'})
    estadocivil: EstadoCivil;

    @ManyToOne(()=>Distrito,(distrito)=>distrito.profesor)
    @JoinColumn({name:'idDistrito'})
    distrito: Distrito;

    @OneToMany(()=>DetalleMatricula,(detallematricula)=>detallematricula.profesor)
    detallematricula:DetalleMatricula[];

    @OneToOne(()=>Usuario,(usuario)=>usuario.profesor)
    usuario: Usuario;

}