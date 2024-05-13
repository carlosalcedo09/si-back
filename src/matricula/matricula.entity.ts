import { DetalleMatricula } from "src/detallematricula/detallematricula.entity";
import { Estudiante } from "src/estudiante/estudiante.entity";
import { Profesor } from "src/profesor/profesor.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'matricula' })
export class Matricula {
    @PrimaryColumn()
    idMatricula: number;

    @Column()
    codigoE: number;
    
    @Column()
    totalCursos: number;

    @Column()
    totalCreditos: number;

    @Column()
    fechaMatricula: Date;

    @ManyToOne(() => Estudiante, (estudiante) => estudiante.matricula)
    @JoinColumn({ name: 'codigoE' })
    estudiante: Estudiante;

    @OneToMany(() => DetalleMatricula, (detalleMatricula) => detalleMatricula.matricula)
    detallematricula: DetalleMatricula[]; // Aquí se corrigió el nombre

    @ManyToOne(() => Profesor, (profesor) => profesor.detallematricula)
    @JoinColumn({ name: 'codigoD' })
    profesor: Profesor;
}
