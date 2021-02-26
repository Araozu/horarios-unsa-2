import { StyleSheet, css } from "aphrodite";
import { estilosGlobales } from "../../Estilos";
import { For } from "solid-js";

const e = StyleSheet.create({
    celdaComun: {
        width: "20%",
        textAlign: "center",
        padding: "0 0.5rem",
        boxSizing: "border-box"
    },
    celdaCurso: {
        display: "inline-block",
        padding: "0.25rem 0.35rem",
        cursor: "pointer",
        borderRadius: "5px",
        transition: "background-color 100ms"
    },
    celdaCursoActiva: {
        backgroundColor: "rgba(200, 200, 200, 0.25)"
    },
    celdaCursoTeoria: {
        fontWeight: "bold"
    }
});

interface Props {
    datos: {id: string, txt: string, esLab: boolean}[],
    idHover: () => string,
    setIdHover: (v: string) => string
}

export function CeldaFila(props: Props) {

    const datos = props.datos;
    const idHover = props.idHover;
    const setIdHover = props.setIdHover;

    return <div className={css(e.celdaComun, estilosGlobales.inlineBlock)}>
        <For each={datos}>
            {({id, txt, esLab}) => {

                const clases = () => {
                    const clases = [e.celdaCurso, !esLab && e.celdaCursoTeoria];
                    if (id === idHover()) clases.push(e.celdaCursoActiva);
                    return css(...clases);
                };

                return <span className={clases()}
                             onMouseEnter={() => setIdHover(id)}
                             onMouseLeave={() => setIdHover("")}
                >
                    {txt}
                </span>;
            }}
        </For>
    </div>
}