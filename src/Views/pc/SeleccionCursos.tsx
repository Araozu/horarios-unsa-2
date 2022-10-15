import { css, StyleSheet } from "aphrodite/no-important";
import { estilosGlobales } from "../../Estilos";
import { createSignal, For } from "solid-js";
import { getAllListaCursos, RespuestaListaCursos } from "../../API/ListaCursos";

const e = StyleSheet.create({
    contenedorGlobal: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    cont: {
        width: "30rem",
    },
    parrafo: {
        textAlign: "justify",
        lineHeight: "1.4rem",
    },
    botonAccion: {
        width: "30rem",
        display: "inline-block",
        textAlign: "center",
    },
    iconoGitHub: {
        fontSize: "1.25rem",
        verticalAlign: "bottom",
        marginRight: "0.5rem",
    },
    inputCorreo: {
        width: "100%",
        backgroundColor: "rgba(159,159,159,0.44)",
        border: "none",
        borderBottom: "solid 2px var(--color-texto)",
        padding: "0.5rem 1rem",
        boxSizing: "border-box",
        marginTop: "1rem",
        borderRadius: "5px",
    },
    checkbox: {
        width: "1.25rem",
        height: "1.25rem",
        margin: "0 0.5rem",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "3rem auto",
        gridRowGap: "1rem",
    },
});

export function SeleccionCursos() {
    const [cursos, setCursos] = createSignal<RespuestaListaCursos>({});
    const [msgErr, setMsgError] = createSignal(false);

    // Recuperar cursos de back
    (async() => setCursos(await getAllListaCursos()))();

    const submit = (ev: Event) => {
        ev.preventDefault();
        const form = ev.target as HTMLFormElement;
        // Los checkboxes
        const elements = form.elements;
        const idsAEnviar: Array<string> = [];
        for (let i = 0; i < elements.length; i += 1) {
            const inputBox = elements[i] as HTMLInputElement;
            if (inputBox.checked) {
                idsAEnviar.push(inputBox.value);
            }
        }

        if (idsAEnviar.length === 0) {
            setMsgError(true);
            setTimeout(() => setMsgError(false), 2500);
            return;
        }

        // Almacenar en localStorage
        localStorage.setItem("cursos-seleccionados", JSON.stringify(idsAEnviar));
        // Ir a sig pantalla
        window.location.href = "#/pc/sistemas/";
    };

    return (
        <div class={css(e.contenedorGlobal)}>
            <div class={css(e.cont)}>
                <form onSubmit={submit}>
                    <div class={css(estilosGlobales.contenedor, estilosGlobales.inlineBlock, e.cont)}>
                        <h1 style={{
                            "text-align": "center",
                            "font-size": "1.75rem",
                        }}
                        >
                        Seleccion de cursos
                        </h1>
                        <p>Selecciona los cursos en los que matricularte</p>

                        <For each={Object.entries(cursos())}>
                            {([nombreAnio, infoCurso]) => (
                                <>
                                    <h2>{nombreAnio} año</h2>
                                    <div class={css(e.grid)}>
                                        <For each={infoCurso}>
                                            {(curso) => (
                                                <>
                                                    <input
                                                        type="checkbox"
                                                        value={curso.id_curso}
                                                        class={css(e.checkbox)}
                                                    />
                                                    <span>{curso.nombre_curso}</span>
                                                </>
                                            )}
                                        </For>
                                    </div>
                                </>
                            )}
                        </For>
                        <br />
                        <span style={msgErr() ? "opacity: 1; color: red;" : "opacity: 0;"}>
                            Selecciona al menos un curso
                        </span>
                    </div>
                    <button
                        type="submit"
                        class={css(estilosGlobales.contenedor, estilosGlobales.contenedorCursor, e.botonAccion)}
                    >
                        Continuar
                    </button>
                </form>
            </div>
        </div>
    );
}
