import { TopBar } from "./SistemasMovil/TopBar";
import { GrupoDia, Table, TableInput } from "./SistemasMovil/Table";
import { getHorarios, Horario, ListaCursosCompleto } from "../API/CargaHorarios";
import { createSignal } from "solid-js";
import { generarMapaCeldas } from "./SistemasMovil/mapaCeldas";
import { Button } from "../components/Button";
import { gruposSeleccionados, SERVER_PATH } from "../Store";

export function SistemasMovil() {
    const [rawData, setRawData] = createSignal<ListaCursosCompleto>([]);

    // Obtener cursos seleccionados del servidor
    (async() => {
        const cursos: Array<string> = JSON.parse(localStorage.getItem("cursos-seleccionados") ?? "[]");
        const data = await getHorarios({
            cursos: cursos.map((x) => parseInt(x, 10)),
        });
        setRawData(data);
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
            window.location.href = "#/ver-matricula/";
        } else {
            alert("No se pudo procesar la matricula");
        }
    };

    return (
        <div>
            <TopBar tituloBarra="Mi Horario" />
            <Table datos={transformar(rawData())} />
            <hr />
            <div style="text-align: center;">
                <Button texto={"Matricular"} onClick={matricular} />
            </div>
        </div>
    );
}


function transformar(input: ListaCursosCompleto): TableInput {
    const data: TableInput = {
        lunes: [],
        martes: [],
        miercoles: [],
        jueves: [],
        viernes: [],
    };

    // Organizar por dias
    for (const curso of input) {
        for (const lab of curso.laboratorios) {
            for (const horas of lab.horarios) {
                const dia = horas.dia;
                const [idx, nroHoras] = infoDiaAOffsets(horas.hora_inicio, horas.hora_fin);
                const datos = {
                    id_horario: horas.id_horario,
                    id_laboratorio: lab.id_laboratorio,
                    abreviado: curso.abreviado,
                    grupo: lab.grupo,
                    offsetVertical: idx,
                    nroHoras: nroHoras,
                    offsetHorizontal: 0,
                    fraccion: 0,
                };

                if (dia === "Lunes") {
                    data.lunes.push(datos);
                } else if (dia === "Martes") {
                    data.martes.push(datos);
                } else if (dia === "Miercoles") {
                    data.miercoles.push(datos);
                } else if (dia === "Jueves") {
                    data.jueves.push(datos);
                } else if (dia === "Viernes") {
                    data.viernes.push(datos);
                }
            }
        }
    }

    // Procesar cada dia y devolver
    return {
        lunes: generarMapaCeldas(data.lunes),
        martes: generarMapaCeldas(data.martes),
        miercoles: generarMapaCeldas(data.miercoles),
        jueves: generarMapaCeldas(data.jueves),
        viernes: generarMapaCeldas(data.viernes),
    };
}

const horasStr = ["0700","0750","0850","0940","1040","1130","1220","1310","1400",
    "1450","1550","1640","1740","1830","1920","2010","2100","2150"];

const horas = [
    700,
    750,
    850,
    940,
    1040,
    1130,
    1220,
    1310,
    1400,
    1450,
    1550,
    1640,
    1740,
    1830,
    1920,
    2010,
    2100,
    2150,
];

/**
 * Convierte horas en texto a offsets
 */
// Ejm: 0700, 0850 -> 0, 2
function infoDiaAOffsets(horaInicio: string, horaFinal: string): [number, number] {
    const inicio = parseInt(horaInicio, 10);
    const final = parseInt(horaFinal, 10);

    const idxInicio = horas.findIndex((x) => x === inicio);
    let nroHoras = 0;

    for (let i = idxInicio; i < horas.length; i += 1) {
        if (final > horas[i]) {
            nroHoras += 1;
        } else {
            break;
        }
    }

    return [idxInicio, nroHoras];
}

// inicio: 1740 fin 2010 -> 1740,1830,1920
export function infoDiaAListaHoras(horas: Array<Horario>): Array<string> {
    const horasFin: Array<string> = [];

    for (const grupoHoras of horas) {
        const [idx, cantidad] = infoDiaAOffsets(grupoHoras.hora_inicio, grupoHoras.hora_fin);
        const strDia = grupoHoras.dia.substring(0, 2);

        for (let i = 0; i < cantidad; i += 1) {
            horasFin.push(`${strDia}${horasStr[idx + i]}`);
        }
    }

    return horasFin;
}
