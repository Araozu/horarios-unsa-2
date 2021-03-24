export interface CursoRaw {
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

export interface DatosHorarioRaw {
    titulo: string,
    descripcion: string,
    version: number,
    años: {
        [key: string]: {
            [nombre: string]: CursoRaw
        }
    }
}

export interface DatosGrupo {
    Docente: string,
    Horas: string[]
    seleccionado: boolean
}

export interface Curso {
    nombre: string,
    abreviado: string,
    oculto: boolean,
    Teoria: {
        [grupo: string]: DatosGrupo
    }
    Laboratorio?: {
        [grupo: string]: DatosGrupo
    }
}

export interface ListaCursosUsuario {
    sigIndice: number,
    cursos: Curso[]
}

export interface Cursos {
    [nombre: string]: Curso
}

export interface Anios {
    [key: string]: Cursos
}

export interface DatosHorario {
    titulo: string,
    descripcion: string,
    version: number,
    años: Anios
}

export interface DataProcesada {
    [hora: string]: {
        [dia: string]: {
            id: string,
            txt: string,
            esLab: boolean,
            datosGrupo: DatosGrupo,
            fnSeleccionar: () => void
        }[]
    }
}