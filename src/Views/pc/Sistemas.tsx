import { BarraSuperior } from "../../BarraSuperior";
import { ContenedorHorarios } from "./Sistemas/ContenedorHorarios";
import { Creditos } from "../../Creditos";
import { Separador } from "../../Separador";
import { createSignal } from "solid-js";
import { getHorariosMock, ListaCursosCompleto } from "../../API/CargaHorarios";
import { Cursos, DatosGrupo } from "../../types/DatosHorario";
import { infoDiaAListaHoras } from "../SistemasMovil";

export function Sistemas() {
    const [data, setData] = createSignal<Cursos>({});

    // Obtener cursos seleccionados del servidor
    (async() => {
        const cursos: Array<string> = JSON.parse(localStorage.getItem("cursos-seleccionados") ?? "[]");
        const data = await getHorariosMock({
            cursos: cursos.map((x) => parseInt(x, 10)),
        });
        setData(listaCursosADatos(data));
    })();

    return (
        <div>
            <BarraSuperior />
            <Separador />
            <Separador />
            <ContenedorHorarios datos={data()} />
            <Creditos />
        </div>
    );
}

function listaCursosADatos(cursosEntrada: ListaCursosCompleto): Cursos {
    const result: Cursos = {};

    for (const curso of cursosEntrada) {
        const gruposLab: {[grupo: string]: DatosGrupo} = {};
        for (const lab of curso.laboratorios) {
            gruposLab[lab.grupo] = {
                Docente: lab.docente,
                Horas: infoDiaAListaHoras(lab.horario),
                seleccionado: false,
            };
        }

        result[curso.nombre_curso] = {
            nombre: curso.nombre_curso,
            abreviado: curso.abreviado,
            oculto: false,
            Teoria: {},
            Laboratorio: gruposLab,
        };
    }

    return result;
}

