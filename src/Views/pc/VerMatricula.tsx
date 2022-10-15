import { css, StyleSheet } from "aphrodite/no-important";
import { estilosGlobales } from "../../Estilos";
import { createSignal, For } from "solid-js";
import { getMatricula, InfoMatricula } from "../../API/VerMatricula";
import { gruposSeleccionados } from "../../Store";

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

export function VerMatricula() {
    const [infoMatriculas, setInfoMatriculas] = createSignal<Array<InfoMatricula>>([]);

    (async() => {
        const laboratorios = Object.entries(gruposSeleccionados)
            .filter((x) => x[1] === true)
            .map((x) => parseInt(x[0], 10));
        setInfoMatriculas(await getMatricula({matriculas: laboratorios}));
    })();

    return (
        <div class={css(e.contenedorGlobal)}>
            <div class={css(e.cont)}>

                <div class={css(estilosGlobales.contenedor, estilosGlobales.inlineBlock, e.cont)}>
                    <h1 style={{
                        "text-align": "center",
                        "font-size": "1.75rem",
                    }}
                    >
                            Matricula realizada
                    </h1>
                    <For each={infoMatriculas()}>
                        {(matricula) => (
                            <div>
                                <h3>{matricula.nombre_curso}</h3>
                                <p>Grupo: {matricula.grupo}</p>
                                <p>Docente: {matricula.docente}</p>
                            </div>
                        )}
                    </For>

                </div>
            </div>
        </div>
    );
}
