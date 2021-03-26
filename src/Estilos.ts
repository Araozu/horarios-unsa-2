import {StyleSheet} from "aphrodite"

export const estilosGlobales = StyleSheet.create({
    contenedor: {
        margin: "0.5rem",
        padding: "0.75rem 0.75rem",
        borderRadius: "10px",
        backdropFilter: "blur(40px)",
        backgroundColor: "rgba(100, 100, 100, 0.25)",
        color: "var(--color-texto)",
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
})
