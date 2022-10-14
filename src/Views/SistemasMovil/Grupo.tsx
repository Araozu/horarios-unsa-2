import { css, StyleSheet } from "aphrodite/no-important";
import { GrupoDia } from "./Table";

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
    const ss = StyleSheet.create({
        button: {
            display: "inline-block",
            padding: "0.2rem 0.2rem",
            textAlign: "left",
            borderRadius: "10px",
            border: "solid 2px red",
            position: "absolute",
        },
    });

    const estilo = () => {
        const fraccion = props.data.fraccion;
        const offsetHorizontal = props.data.offsetHorizontal;
        const offsetVertical = props.data.offsetVertical;
        const nroHoras = props.data.nroHoras;

        const [colorDesactivado, colorActivado] = colores[props.data.id_laboratorio % 9];
        const estiloColor = `background-color: ${colorDesactivado};border-color: ${colorActivado}`;

        return `left: calc((43vw / ${fraccion}) * ${offsetHorizontal}); top: ${offsetVertical * 3}rem;` +
            `height: ${nroHoras * 3}rem; width: calc(100% / ${fraccion});${estiloColor}`;
    };

    return (
        <input
            type="button"
            className={css(ss.button)}
            style={estilo()}
            onClick={() => console.log(`:D ${props.data.id_laboratorio}`)}
            value={`${props.data.abreviado} ${props.data.grupo}`}
        >
            {props.data.abreviado}
            <br />
            {props.data.grupo}
        </input>
    );
}
