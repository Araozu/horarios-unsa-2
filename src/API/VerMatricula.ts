import {SERVER_PATH} from "../Store";

type Input = {
    matriculas: Array<number>
}
export type InfoMatricula = {
    nombre_curso: string,
    grupo: string,
    docente: string,
}
type VerMatriculaFn = (_: Input) => Promise<Array<InfoMatricula>>;

export const getMatricula: VerMatriculaFn = async(input) => {
    const response = await fetch(`${SERVER_PATH}/recuperacion`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
    });
    return await response.json();
};

export const getMatriculaMock: VerMatriculaFn = async(_) => [
    {
        nombre_curso: "Plataformas Emergentes",
        grupo: "LA",
        docente: "Diego Iquira",
    },
    {
        nombre_curso: "Gestión de Proyectos de Software",
        grupo: "LB",
        docente: "Luis Rocha",
    },
];

