

export interface auto{
   auto1:{
    modelo: string;
    patente: string;
    marca: string;
    id:string;
    uid:string;
   }
  
}

export interface alumno {
    nombre: string;
    correo: string;
    edad: number;
    uid: string;
    password: string;
    perfil: 'profesor'| 'alumno'
    cursos: string[]; // Lista de los id de los cursos en los que está inscrito el alumno
    asistencia: {
    // Propiedad de asistencia para cada curso en el que está inscrito el alumno
    [cursoId: string]: {
    [claseId: string]: { // Lista de las asistencias del alumno en cada clase del curso
    date: number;
    }
    }
    };
    }

export interface estacionamiento{
    estacionamiento1:{
     capacidad: string;
     ubicacion: string;
     precio: string;
     id:string;
     uid: string;
    }
   
 }

 export interface Curso {
    classes: any;
    id: string;
    name: string;
    qrCode: string;
  }
 
