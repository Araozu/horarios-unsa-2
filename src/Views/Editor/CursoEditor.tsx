import { Curso, DatosGrupo } from "../../types/DatosHorario"
import { estilosGlobales } from "../../Estilos"
import { StyleSheet, css } from "aphrodite"
import { For } from "solid-js"

const e = StyleSheet.create({
    entrada: {
        margin: "0.5rem 0",
        color: "inherit",
    },
    contenedorVariante: {
        // padding: "0.5rem 0.75rem 0.5rem 1rem",
        paddingLeft: "1rem",
        borderLeft: "solid 1px rgba(200, 200, 200, 0.5)",
        margin: "0.25rem",
    },
})

function EditorGrupo(props: { grupo: string, datosGrupo: DatosGrupo }) {
    return (
        <div>
            Grupo&nbsp;
            <input
                type="text"
                value={props.grupo}
                style={{width: "1rem"}}
                className={css(
                    estilosGlobales.entradaTexto,
                    e.entrada,
                )}
            />
            <div className={css(e.contenedorVariante)}>
                Docente:&nbsp;
                <input
                    type="text"
                    value={props.datosGrupo.Docente}
                    className={css(
                        estilosGlobales.entradaTexto,
                        e.entrada,
                    )}
                />
                <br />
                Horas:
                <br />
                <For each={props.datosGrupo.Horas}>
                    {(h) => <span>{h}, </span>}
                </For>
            </div>
        </div>
    )
}

export function CursoEditor(props: { curso: Curso }) {
    return (
        <div className={css(estilosGlobales.contenedor, estilosGlobales.inlineBlock)}>
            <input
                type="text"
                value={props.curso.nombre}
                className={css(
                    estilosGlobales.entradaTexto,
                    e.entrada,
                )}
            />
            &nbsp;-&nbsp;
            <input
                type="text"
                value={props.curso.abreviado}
                style={{width: "5rem"}}
                className={css(
                    estilosGlobales.entradaTexto,
                    e.entrada,
                )}
            />
            <br />
            Teoria:
            <div className={css(e.contenedorVariante)}>
                <For each={Object.entries(props.curso.Teoria)}>
                    {([grupo, datosGrupo]) => <EditorGrupo grupo={grupo} datosGrupo={datosGrupo} />}
                </For>
                <br />
                <button
                    className={css(
                        estilosGlobales.contenedorCursor,
                        estilosGlobales.contenedorCursorSoft,
                        estilosGlobales.botonTexto,
                    )}
                >
                    Agregar grupo de teoría
                </button>
            </div>
            Laboratorio:
            <div className={css(e.contenedorVariante)}>
                <button
                    className={css(
                        estilosGlobales.contenedorCursor,
                        estilosGlobales.contenedorCursorSoft,
                        estilosGlobales.botonTexto,
                    )}
                >
                    Agregar grupo de laboratorio
                </button>
            </div>
        </div>
    )
}
