import { StyleSheet, css } from "aphrodite";
import { estilosGlobales } from "../../Estilos";
import { For, createSignal, createMemo } from "solid-js";
import { Dia } from "../../Store";

const e = StyleSheet.create({
    celdaComun: {
        width: "20%",
        textAlign: "center",
        padding: "0 0.7rem",
        boxSizing: "border-box",
        userSelect: "none"
    },
    celdaCurso: {
        display: "inline-block",
        padding: "0.25rem 0.35rem",
        cursor: "pointer",
        borderRadius: "5px",
        // transition: "background-color 100ms, color 100ms"
    },
    celdaCursoActiva: {
        // color: "#151515"
    },
    celdaCursoTeoria: {
        fontWeight: "bold"
    },
    celdaCursoLab: {
        fontStyle: "italic"
    }
});

const eColores = StyleSheet.create({
    lunes: {
        backgroundColor: "rgba(33,150,243,1)"
    },
    martes: {
        backgroundColor: "rgba(255,214,0 ,1)",
        color: "#151515"
    },
    miercoles: {
        backgroundColor: "rgba(236,64,122 ,1)"
    },
    jueves: {
        backgroundColor: "rgba(29,233,182 ,1)",
        color: "#151515"
    },
    viernes: {
        backgroundColor: "rgba(244,67,54,1)"
    }
});

const clasesColores = {
    Lunes: css(eColores.lunes),
    Martes: css(eColores.martes),
    Miercoles: css(eColores.miercoles),
    Jueves: css(eColores.jueves),
    Viernes: css(eColores.viernes)
}

interface Props {
    /**
     * Informacion de los cursos a renderizar en la celda
     *
     * id - Identificador unico del grupo: 20200912_1er_PW1_T_A
     *
     * txt - El nombre a renderizar
     *
     * esLab - Boolean que indica si el grupo es de laboratorio
     */
    datos: {
        id: string,
        txt: string,
        esLab: boolean
    }[],
    idHover: () => string,
    setIdHover: (v: string) => string,
    fnResaltarFila: () => void,
    fnDesresaltarFila: () => void,
    dia: Dia
}

export function CeldaFila(props: Props) {
    const datos = props.datos;
    const idHover = props.idHover;
    const setIdHover = props.setIdHover;

    const fnOnMouseEnter = (id: string) => setIdHover(id);
    const fnOnMouseLeave = () => setIdHover("");

    return <div className={css(e.celdaComun, estilosGlobales.inlineBlock)}>
        <For each={datos}>
            {({id, txt, esLab}) => {
                const [estabaResaltado, setEstabaResaltado] = createSignal(false);

                const clases = createMemo(
                    () => {
                        const clases = [e.celdaCurso, esLab ? e.celdaCursoLab : e.celdaCursoTeoria];
                        let adicional = "";
                        const idHoverS = idHover();
                        if (idHoverS !== "" &&  id.search(idHoverS) !== -1) {
                            props.fnResaltarFila();
                            clases.push(e.celdaCursoActiva);
                            adicional = clasesColores[props.dia];

                            setEstabaResaltado(true);
                        } else if (estabaResaltado()) {
                            props.fnDesresaltarFila();
                            setEstabaResaltado(false);
                        }
                        return css(...clases) + " " + adicional;
                    },
                    undefined,
                    (x, y) => x === y
                );

                return <span className={clases()}
                             onMouseEnter={() => fnOnMouseEnter(id)}
                             onMouseLeave={fnOnMouseLeave}
                >
                    {txt}
                </span>;
            }}
        </For>
    </div>
}