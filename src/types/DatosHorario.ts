export interface DatosVariante {
    Docente: string,
    Horas: string[]
}

export interface DatosVarianteUsuario extends DatosVariante {
    seleccionado: boolean
}

export interface Curso {
    nombre: string,
    abreviado: string,
    Teoria: {
        [grupo: string]: DatosVariante
    }
    Laboratorio?: {
        [grupo: string]: DatosVariante
    }
}

export interface CursoUsuario extends Curso {
    oculto: boolean,
    Teoria: {
        [grupo: string]: DatosVarianteUsuario
    }
    Laboratorio?: {
        [grupo: string]: DatosVarianteUsuario
    }
}

export interface ListaCursosUsuario {
    cursos: CursoUsuario[]
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

export interface DataProcesada {
    [hora: string]: {
        [dia: string]: {
            id: string,
            txt: string,
            esLab: boolean
        }[]
    }
}