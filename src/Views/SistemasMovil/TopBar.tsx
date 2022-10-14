import { StyleSheet, css } from "aphrodite/no-important";

const s = StyleSheet.create({
    bar: {
        backgroundColor: "var(--color-primario)",
        color: "white",
        height: "3.5rem",
        display: "flex",
        alignItems: "center",
    },
    icon: {
        display: "inline-block",
        color: "white",
        fontSize: "1.5rem",
        verticalAlign: "bottom",
        cursor: "pointer",
        height: "1.5rem",
        padding: "0 0.5rem",
    },
    barLabel: {
        color: "white",
        padding: "0 1rem",
        fontWeight: 500,
        fontSize: "1.25rem",
    },
});

export function TopBar(props: {tituloBarra: string}) {
    return (
        <nav className={css(s.bar)}>
            <button>
                <i
                    className={`ph-list ${css(s.icon)}`}
                    title={"Cambiar imagen de fondo"}
                />
            </button>
            <p className={css(s.barLabel)}>{props.tituloBarra}</p>
        </nav>
    );
}
