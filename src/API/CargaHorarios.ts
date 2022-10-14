/*
// HTTP POST
// Url: /horarios

// El frontend envia una lista de cursos, de los cuales recuperar sus datos
{
    cursos: Array<number> // Un array de id_curso
}

// Backend responde con los cursos especificados y sus horarios
[
    // Cada objeto dentro del array sera un Curso
    {
        id_curso: number,
        id_datos_carrera: any, // Opcional
        nombre_curso: string,
        curso_anio: number | string,
        abreviado: string,
        // Un array de objetos, estos objetos son de la entidad Laboratorio
        laboratorios: [
            {
                id_laboratorio: number,
                id_curso: number,
                grupo: string,
                docente: string,
                // Array de objetos de la entidad Horario
                horario: [
                    {
                        id_horario: number,
                        dia: string,
                        hora_inicio: string,
                        hora_fin: string,
                    }
                ]
            }
        ]
    }
]
 */


import { SERVER_PATH } from "../Store";

export type Horario = {
    id_horario: number,
    id_laboratorio: number,
    dia: string,
    hora_inicio: string,
    hora_fin: string,
}
export type Laboratorio = {
    id_laboratorio: number,
    id_curso: number,
    grupo: string,
    docente: string,
    // Array de objetos de la entidad Horario
    horario: Array<Horario>
}
export type CursoCompleto = {
    id_curso: number,
    nombre_curso: string,
    curso_anio: number | string,
    abreviado: string,
    // Un array de objetos, estos objetos son de la entidad Laboratorio
    laboratorios: Array<Laboratorio>
}

type InputData = {
    cursos: Array<number>
}
export type ListaCursosCompleto = Array<CursoCompleto>

type GetHorariosFn = (_: InputData) => Promise<ListaCursosCompleto>

export const getHorarios: GetHorariosFn = async(data) => {
    const response = await fetch(`${SERVER_PATH}/horarios`, {
        body: JSON.stringify(data),
    });
    return await response.json();
};

export const getHorariosMock: GetHorariosFn = async(_) => {
    const c1: CursoCompleto = {
        id_curso: 0,
        nombre_curso: "Gestion de Sistemas y Tecnologias de Informacion",
        curso_anio: "5to",
        abreviado: "GSTI",
        laboratorios: [
            {
                id_laboratorio: 0,
                id_curso: 0,
                grupo: "A",
                docente: "Luis Rocha",
                horario: [
                    {
                        id_horario: 0,
                        id_laboratorio: 0,
                        hora_inicio: "1830",
                        hora_fin: "1920",
                        dia: "Jueves",
                    },
                    {
                        id_horario: 1,
                        id_laboratorio: 0,
                        hora_inicio: "1550",
                        hora_fin: "1740",
                        dia: "Viernes",
                    },
                ],
            },
            {
                id_laboratorio: 1,
                id_curso: 0,
                grupo: "B",
                docente: "Luis Rocha",
                horario: [
                    {
                        id_horario: 2,
                        id_laboratorio: 1,
                        hora_inicio: "0700",
                        hora_fin: "0850",
                        dia: "Lunes",
                    },
                    {
                        id_horario: 3,
                        id_laboratorio: 1,
                        hora_inicio: "1400",
                        hora_fin: "1640",
                        dia: "Miercoles",
                    },
                    {
                        id_horario: 6,
                        id_laboratorio: 1,
                        hora_inicio: "1400",
                        hora_fin: "1640",
                        dia: "Viernes",
                    },
                ],
            },
        ],
    };
    const c2: CursoCompleto = {
        id_curso: 1,
        nombre_curso: "Plataformas Emergentes",
        curso_anio: "5to",
        abreviado: "PE",
        laboratorios: [
            {
                id_laboratorio: 2,
                id_curso: 1,
                grupo: "A",
                docente: "Diego Iquira",
                horario: [
                    {
                        id_horario: 4,
                        id_laboratorio: 2,
                        hora_inicio: "0850",
                        hora_fin: "0940",
                        dia: "Jueves",
                    },
                ],
            },
            {
                id_laboratorio: 3,
                id_curso: 1,
                grupo: "B",
                docente: "Diego Iquira",
                horario: [
                    {
                        id_horario: 5,
                        id_laboratorio: 3,
                        hora_inicio: "1740",
                        hora_fin: "1830",
                        dia: "Martes",
                    },
                ],
            },
        ],
    };

    return [c1, c2];
};
