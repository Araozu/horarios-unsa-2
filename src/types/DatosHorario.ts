export interface Curso {
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

export interface AnioData {
    [nombre: string]: Curso
}

export interface Anio {
    [key: string]: AnioData
}

export interface DatosHorario {
    titulo: string,
    descripcion: string,
    version: number,
    años: Anio
}

