import { Curso } from "src/curso/curso.entity";
import { Matricula } from "src/matricula/matricula.entity";
import { Modalidad } from "src/modalidad/modalidad.entity";
import { Notas } from "src/notas/notas.entity";
import { Pabellon } from "src/pabellon/pabellon.entity";
import { Profesor } from "src/profesor/profesor.entity";
import { Turno } from "src/turno/turno.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity({name: 'detallematricula'})

export class DetalleMatricula{
   @PrimaryColumn()
   idMatricula: number

   @PrimaryColumn()
   idCurso: string

   @Column()
   fechaInicio: Date

   @Column()
   fechaTermino: Date
   
   @Column()
   aula: string

   @Column()
   idPabellon:string

   @Column()
   idTurno:String

   @Column()
   codigoD:number

   @Column()
   idModalidad: string

   @ManyToOne(()=>Matricula, (matricula)=> matricula.detallematricula)
   @JoinColumn({name:'idMatricula'})
   matricula: Matricula;
   
   @ManyToOne(()=>Curso, (curso)=>curso.detallematricula)
   @JoinColumn({name:'idCurso'})
   curso: Curso;

   @ManyToOne(()=>Pabellon,(pabellon)=>pabellon.detallematricula)
   @JoinColumn({name:'idPabellon'})
   pabellon: Pabellon;

   @ManyToOne(()=>Turno, (turno)=>turno.detallematricula)
   @JoinColumn({name:'idTurno'})
   turno: Turno;

   @ManyToOne(()=>Profesor,(profesor)=>profesor.detallematricula)
   @JoinColumn({name:'codigoD'})
   profesor: Profesor;

   @ManyToOne(()=>Modalidad,(modalidad)=>modalidad.detallematricula)
   @JoinColumn({name:'idModalidad'})
   modalidad: Modalidad;

   @OneToMany(() => Notas, (nota) => nota.detalleMatricula)
   notas: Notas[];

}