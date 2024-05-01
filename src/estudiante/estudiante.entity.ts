import { Carrera } from "src/carrera/carrera.entity";
import { CategoriaEstudiante } from "src/categoriaestudiante/categoriaestudiante.entity";
import { Distrito } from "src/distrito/distrito.entity";
import { EstadoCivil } from "src/estadocivil/estadocivil.entity";
import { Genero } from "src/genero/genero.entity";
import { Matricula } from "src/matricula/matricula.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name:'estudiante'})

export class Estudiante{
    @PrimaryColumn()
    codigoE: number

    @Column()
    dniE: string

    @Column()
    nombresE:string

    @Column()
    apellidosE: string

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

    @Column()
    idCategoriaE: string

    @Column()
    idCarrera: number

    @ManyToOne(()=> Genero, (genero)=>genero.estudiante)
    @JoinColumn({name:'idGenero'})
    genero: Genero;

    @ManyToOne(()=>EstadoCivil, (estadocivil)=>estadocivil.estudiante)
    @JoinColumn({name:'idEstado'})
    estadocivil: EstadoCivil;

    @ManyToOne(()=>Distrito,(distrito)=>distrito.estudiante)
    @JoinColumn({name:'idDistrito'})
    distrito: Distrito;    

    @ManyToOne(()=>CategoriaEstudiante, (categoriaestudiante)=>categoriaestudiante.estudiante)
    @JoinColumn({name:'idCategoriaE'})
    categoriaestudiante: CategoriaEstudiante;

    @ManyToOne(()=>Carrera,(carrera)=>carrera.estudiante)
    @JoinColumn({name:'idCarrera'})
    carrera: Carrera;

    @OneToMany(()=>Matricula,(matricula)=>matricula.estudiante)
    matricula: Matricula[];

}