
interface Curso {
    nombre: string,
    abreviado: string,
    Teoria: {
        [grupo: string]: {
            Docente: string,
            Horas: string[]
        }
    }
    Laboratorio?: {
        [grupo: string]: {
            Docente: string,
            Horas: string[]
        }
    }
}

interface Anio {
    [key: string]: {
        [nombre: string]: Curso
    }
}

export interface DatosHorario {
    titulo: string,
    descripcion: string,
    años: Anio
}

