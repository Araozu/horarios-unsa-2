import {StyleSheet} from "aphrodite";

export const estilosGlobales = StyleSheet.create({
    contenedor: {
        margin: "0.5rem",
        padding: "0.75rem 0.75rem",
        borderRadius: "10px",
        backdropFilter: "blur(40px)",
        backgroundColor: "rgba(100, 100, 100, 0.25)",
        color: "white"
    },
    contenedorCursor: {
        cursor: "pointer",
        userSelect: "none",
        transition: "background-color 200ms",
        textDecoration: "underline solid white 2px",
        ":hover": {
            backgroundColor: "rgba(200, 200, 200, 0.3)"
        }
    },
    contenedorCursorSoft: {
        textDecoration: "underline rgba(255, 255, 255, 0.4)"
    },
    contenedorCursorActivo: {
        backgroundColor: "rgba(200, 200, 200, 0.3)"
    },
    inlineBlock: {
        display: "inline-block"
    }
});
