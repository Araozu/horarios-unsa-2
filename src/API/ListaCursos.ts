/*
// HTTP GET
// Url: /cursos

// El frontend pide una lista de la informacion de todos los cursos

// Backend responde con una lista de todos los cursos
[
    {
        id_curso: number,
        id_datos_carrera: any, // Opcional
        nombre_curso: string,
        curso_anio: number | string, // Numero o string, dependiendo de como este en DB
        abreviado: string,
    }
]
*/

import { SERVER_PATH } from "../Store";

export type InfoCurso = {
    id_curso: number,
    nombre_curso: string,
    curso_anio: string,
    abreviado: string,
}
// `"1er"`, `"2do"`, etc
type NombreAnio = string
export type RespuestaListaCursos = {[key: NombreAnio]: Array<InfoCurso>}
type ListaCursosFn = () => Promise<RespuestaListaCursos>

export const getAllListaCursos: ListaCursosFn = async() => {
    const response = await fetch(`${SERVER_PATH}/cursos`);
    const data = await response.json() as Array<InfoCurso>;

    const resultMap: RespuestaListaCursos = {};
    data.forEach((curso) => {
        if (resultMap[curso.curso_anio] === undefined) {
            resultMap[curso.curso_anio] = [];
        }

        resultMap[curso.curso_anio]?.push(curso);
    });

    return resultMap;
};

export const getAllListaCursosMock: ListaCursosFn = async() => {
    const arr5to: Array<InfoCurso> = [
        {
            id_curso: 0,
            nombre_curso: "Gestion de Sistemas y Tecnologias de Informacion",
            curso_anio: "5to",
            abreviado: "GSTI",
        },
        {
            id_curso: 1,
            nombre_curso: "Practicas Pre Profesionales",
            curso_anio: "5to",
            abreviado: "PPP",
        },
    ];
    const arr4to: Array<InfoCurso> = [
        {
            id_curso: 2,
            nombre_curso: "Diseño y Arquitectura de Software",
            curso_anio: "4to",
            abreviado: "DAS",
        },
        {
            id_curso: 3,
            nombre_curso: "Gestion de Proyectos de Software",
            curso_anio: "4to",
            abreviado: "GPS",
        },
    ];

    return {
        "5to": arr5to,
        "4to": arr4to,
    };
};
