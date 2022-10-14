import { css, StyleSheet } from "aphrodite/no-important";
import { GrupoDia } from "./Table";
import { gruposSeleccionados, setGruposSeleccionados } from "../../Store";

const colores: Array<[string, string]> = [
    ["#FFEBEE", "#F44336"],
    ["#F3E5F5", "#9C27B0"],
    ["#E8EAF6", "#3F51B5"],
    ["#E1F5FE", "#03A9F4"],
    ["#E0F2F1", "#009688"],
    ["#F1F8E9", "#689F38"],
    ["#FFF9C4", "#FBC02D"],
    ["#FBE9E7", "#F4511E"],
    ["#EFEBE9", "#795548"],
];

export function Grupo(props: { data: GrupoDia }) {
    const [colorDesactivado, colorActivado] = colores[props.data.id_laboratorio % 9];
    const ss = StyleSheet.create({
        button: {
            display: "inline-block",
            padding: "0.2rem 1rem",
            textAlign: "left",
            borderRadius: "10px",
            border: `solid 2px ${colorActivado}`,
            position: "absolute",
        },
    });

    const estiloFondo = () => {
        if (gruposSeleccionados[props.data.id_laboratorio]) {
            return `background-color: ${colorActivado}; color: white; font-weight: 600;`;
        } else {
            return `background-color: ${colorDesactivado};`;
        }
    };

    const estilo = () => {
        const fraccion = props.data.fraccion;
        const offsetHorizontal = props.data.offsetHorizontal;
        const offsetVertical = props.data.offsetVertical;
        const nroHoras = props.data.nroHoras;

        return `left: calc((43vw / ${fraccion}) * ${offsetHorizontal}); top: ${offsetVertical * 3}rem;` +
            `height: ${nroHoras * 3}rem; width: calc(100% / ${fraccion});`;
    };

    const handleClick = () => {
        setGruposSeleccionados(props.data.id_laboratorio, (x) => !x);
    };

    return (
        <button
            type="button"
            className={css(ss.button)}
            style={`${estilo()}${estiloFondo()}`}
            onClick={handleClick}
        >
            {props.data.abreviado}
            <br />
            {props.data.grupo}
        </button>
    );
}
