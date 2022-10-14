import { TopBar } from "./SistemasMovil/TopBar";
import { GrupoDia, Table, TableInput } from "./SistemasMovil/Table";
import { getHorariosMock, ListaCursosCompleto } from "../API/CargaHorarios";
import { createSignal } from "solid-js";
import { generarMapaCeldas } from "./SistemasMovil/mapaCeldas";

export function SistemasMovil() {
    const [rawData, setRawData] = createSignal<ListaCursosCompleto>([]);

    // Obtener cursos seleccionados del servidor
    (async() => {
        const cursos: Array<string> = JSON.parse(localStorage.getItem("cursos-seleccionados") ?? "[]");
        const data = await getHorariosMock({
            cursos: cursos.map((x) => parseInt(x, 10)),
        });
        setRawData(data);
    })();

    return (
        <div>
            <TopBar tituloBarra="Mi Horario" />
            <Table datos={transformar(rawData())} />
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
            for (const horas of lab.horario) {
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


