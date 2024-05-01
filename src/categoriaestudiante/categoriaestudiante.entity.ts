import { Estudiante } from "src/estudiante/estudiante.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name:'categoriaestudiante'})
export class CategoriaEstudiante{
    @PrimaryColumn()
    idCategoriaE:string

    @Column()
	descripcionCE: string

    
    @OneToMany(()=>Estudiante,(estudiante)=>estudiante.categoriaestudiante)
    estudiante: Estudiante[];
}