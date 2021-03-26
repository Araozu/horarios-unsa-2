import { StyleSheet, css } from "aphrodite"

const e = StyleSheet.create({
    creditos: {
        textAlign: "center",
        paddingTop: "7.5rem",
        paddingBottom: "1rem",
    },
})

export function Creditos() {
    return (
        <div className={css(e.creditos)}>
            Desarrollado por Fernando Araoz con TypeScript, JSX y Solid.js.
        </div>
    )
}
