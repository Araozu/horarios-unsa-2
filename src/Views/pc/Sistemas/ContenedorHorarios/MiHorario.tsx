import { estilosGlobales } from "../../../../Estilos";
import { StyleSheet, css } from "aphrodite";
import {Tabla} from "./Tabla";
import { EstadoLayout } from "../ContenedorHorarios";
import { Switch, Match, createMemo } from "solid-js";
import {SetStoreFunction} from "solid-js/store";
import { BotonMaxMin } from "./BotonMaxMin";
import { BotonIcono } from "./BotonIcono";
import { Curso, Cursos, ListaCursosUsuario } from "../../../../types/DatosHorario";
import { CursosElem } from "./CursosElem";
import { TablaObserver } from "./TablaObserver";

interface MiHorarioProps {
    cursosUsuario: ListaCursosUsuario,
    fnAgregarCurso: (c: Curso) => void,
    setCursosUsuarios: SetStoreFunction<ListaCursosUsuario>
}

const e = StyleSheet.create({
    horario: {},
    boton: {
        textDecoration: "none",
        // paddingRight: "0.5rem",
        "::before": {
            fontSize: "1rem",
            // transform: "translateY(0.2rem)",
            textDecoration: "none",
        },
    },
});

export function MiHorario(props: MiHorarioProps) {
    const tablaObserver = new TablaObserver();

    const datosMiHorario = createMemo(() => {
        const obj: Cursos = {};
        props.cursosUsuario.cursos.forEach((x, i) => {
            obj[i] = x;
        });
        return obj;
    });

    return (
        <div>
            <div className={css(
                estilosGlobales.inlineBlock,
                estilosGlobales.contenedor,
            )}
            >
                Mi horario
            </div>

            <div className={css(
                e.horario,
                estilosGlobales.contenedor,
            )}
            >
                <Tabla
                    data={datosMiHorario()}
                    anio={"Mi horario"}
                    version={1}
                    setCursosUsuarios={props.setCursosUsuarios}
                    tablaObserver={tablaObserver}
                />
            </div>

            <CursosElem
                version={Math.floor(Math.random() * 1_000_000)}
                anioActual={() => "Mi horario"}
                dataAnio={datosMiHorario()}
                fnAgregarCurso={props.fnAgregarCurso}
                listaCursosUsuario={props.cursosUsuario}
                esCursoMiHorario
                setCursosUsuarios={props.setCursosUsuarios}
                tablaObserver={tablaObserver}
            />
        </div>
    );
}
