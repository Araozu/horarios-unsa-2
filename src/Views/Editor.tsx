import { BarraSuperior } from "../BarraSuperior";
import { estilosGlobales } from "../Estilos";
import { StyleSheet, css } from "aphrodite";
import { Separador } from "../Separador";
import { Tabla } from "./pc/Sistemas/ContenedorHorarios/Tabla";
import { TablaObserver } from "./pc/Sistemas/ContenedorHorarios/TablaObserver";
import { Curso, Cursos } from "../types/DatosHorario";
import { For, createMemo } from "solid-js";
import {createStore} from "solid-js/store";
import { CursoEditor } from "./Editor/CursoEditor";

const e = StyleSheet.create({
    contenedorGlobal: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
});

interface Data {
    indice: number,
    cursos: Curso[],
}

const [nuevaData, setNuevaData] = createStore<Data>({
    indice: 1,
    cursos: [{
        nombre: "Curso de Ejemplo",
        abreviado: "CE",
        oculto: false,
        Teoria: {
            A: {
                Docente: "Juan Perez",
                seleccionado: false,
                Horas: ["Mi0700", "Mi0750", "Ju1400", "Ju1450"],
            },
        },
    }],
});

type FormEvent = Event & { submitter: HTMLElement; } & { currentTarget: HTMLFormElement; target: HTMLFormElement; }
export function Editor() {
    const tablaObserver = new TablaObserver();
    const dataWrapper = createMemo(() => nuevaData);

    const agregarCurso = (ev: FormEvent) => {
        ev.preventDefault();

        /// @ts-ignore
        const nombreCurso: string = ev.target.elements.nombre_curso.value;
        /// @ts-ignore
        const nombreAbreviado: string = ev.target.elements.nombre_abreviado.value;

        const curso: Curso = {
            nombre: nombreCurso,
            abreviado: nombreAbreviado,
            oculto: false,
            Teoria: {},
        };

        setNuevaData("cursos", nuevaData.indice, curso);
        setNuevaData("indice", (i) => i + 1);
    };

    const data = createMemo<Cursos>(() => {
        const o: Cursos = {};
        nuevaData.cursos.forEach((c) => {
            o[c.nombre] = c;
        });
        return o;
    });

    return (
        <div>
            <BarraSuperior />
            <Separador />
            <div>
                <div className={css(estilosGlobales.contenedor, estilosGlobales.inlineBlock)}>
                    Editor de horarios
                </div>
                <div className={css(estilosGlobales.contenedor, estilosGlobales.inlineBlock)}>
                    Ingeniería de Sistemas
                </div>
                <div className={css(estilosGlobales.contenedor, estilosGlobales.inlineBlock)}>
                    2021-B
                </div>
            </div>
            <div className={css(estilosGlobales.contenedor)}>
                <Tabla
                    data={data()}
                    anio={"1er"}
                    version={1}
                    setCursosUsuarios={console.log}
                    tablaObserver={tablaObserver}
                />
            </div>
            <Separador />

            <div>
                <For each={nuevaData.cursos}>
                    {(c) => <CursoEditor curso={c} />}
                </For>
            </div>

            <div className={css(estilosGlobales.contenedor, estilosGlobales.inlineBlock)}>
                <span style={{margin: "1rem 0", display: "inline-block"}}>
                    Agregar curso nuevo:
                </span>
                <form onSubmit={(ev) => agregarCurso(ev as FormEvent)}>
                    <label htmlFor="nombre_curso">Nombre del curso:</label>
                    <input className={css(estilosGlobales.entradaTexto)} type="text" id="nombre_curso" name="nombre_curso" />
                    <br />
                    <label htmlFor="nombre_abreviado">Nombre abreviado</label>
                    <input className={css(estilosGlobales.entradaTexto)} type="text" id="nombre_abreviado" name="nombre_abreviado" />
                    <br />
                    <input
                        type="submit"
                        className={css(estilosGlobales.contenedorCursor, estilosGlobales.contenedorCursorSoft, estilosGlobales.botonTexto)}
                        style={{margin: "0.5rem 0", background: "inherit", color: "inherit", border: "inherit"}}
                        value="Agregar"
                    />
                </form>
            </div>

        </div>
    );
}
