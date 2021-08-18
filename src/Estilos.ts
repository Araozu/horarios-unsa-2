import { StyleSheet } from "aphrodite"

export const estilosGlobales = StyleSheet.create({
    contenedor: {
        margin: "0.3rem",
        padding: "0.5rem 0.5rem",
        borderRadius: "0.4rem",
        backdropFilter: "blur(40px)",
        backgroundColor: "rgba(125, 125, 125, 0.3)",
        color: "var(--color-texto)",
        border: "solid 1px transparent",
    },
    contenedorCursor: {
        cursor: "pointer",
        userSelect: "none",
        transition: "background-color 200ms",
        textDecoration: "underline solid white 2px",
        ":hover": {
            backgroundColor: "rgba(200, 200, 200, 0.3)",
        },
    },
    contenedorCursorSoft: {
        textDecoration: "underline rgba(255, 255, 255, 0.4)",
    },
    contenedorCursorActivo: {
        backgroundColor: "rgba(200, 200, 200, 0.3)",
        border: "solid 1px rgba(255, 255, 255, 0.75)",
    },
    contenedorPhospor: {
        padding: "0.5rem 0.65rem",
        transform: "translateY(0.2rem)",
    },
    inlineBlock: {
        display: "inline-block",
    },
    botonPhospor: {
        "::before": {
            fontSize: "1.25rem",
            // transform: "translateY(0.2rem)",
            textDecoration: "underline rgba(255, 255, 255, 0.4)",
        },
    },
    linkGenerico: {
        color: "var(--color-texto)"
    },
})
