import { BarraSuperior } from "../../BarraSuperior";
import { ContenedorHorarios } from "./Sistemas/ContenedorHorarios";
import { Creditos } from "../../Creditos";
import { Separador } from "../../Separador";
import { createSignal } from "solid-js";
import { getHorarios, ListaCursosCompleto } from "../../API/CargaHorarios";
import { Cursos, DatosGrupo } from "../../types/DatosHorario";
import { infoDiaAListaHoras } from "../SistemasMovil";
import { StyleSheet, css } from "aphrodite/no-important";
import { estilosGlobales } from "../../Estilos";
import { gruposSeleccionados, SERVER_PATH } from "../../Store";

const s = StyleSheet.create({
    botonAccion: {
        width: "50%",
        display: "inline-block",
        textAlign: "center",
        backgroundColor: "var(--color-primario)",
    },
});

export function Sistemas() {
    const [data, setData] = createSignal<Cursos>({});

    // Obtener cursos seleccionados del servidor
    (async() => {
        const cursos: Array<string> = JSON.parse(localStorage.getItem("cursos-seleccionados") ?? "[]");
        const data = await getHorarios({
            cursos: cursos.map((x) => parseInt(x, 10)),
        });
        setData(listaCursosADatos(data));
    })();

    const matricular = async() => {
        const laboratoriosAMatricular = Object.entries(gruposSeleccionados)
            .filter((x) => x[1] === true)
            .map((x) => x[0]);

        const response = await fetch(`${SERVER_PATH}/matricula`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                correo_usuario: localStorage.getItem("correo"),
                horarios: laboratoriosAMatricular,
            }),
        });
        if (response.ok) {
            window.location.href = "#/pc/ver-matricula/";
        } else {
            alert("No se pudo procesar la matricula");
        }
    };

    return (
        <div>
            <BarraSuperior />
            <Separador />
            <Separador />
            <ContenedorHorarios datos={data()} />
            <Separador />
            <div style="text-align: center;">
                <button
                    class={css(estilosGlobales.contenedor, estilosGlobales.contenedorCursor, s.botonAccion)}
                    onclick={matricular}
                >
                    Matricular
                </button>
            </div>
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
                id_laboratorio: lab.id_laboratorio,
                Docente: lab.docente,
                Horas: infoDiaAListaHoras(lab.horarios),
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

