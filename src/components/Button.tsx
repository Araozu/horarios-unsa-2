import { StyleSheet, css } from "aphrodite/no-important";

export function Button(props: {texto: string, onClick?: () => void}) {
    const s = StyleSheet.create({
        boton: {
            backgroundColor: "var(--color-primario)",
            color: "white",
            padding: "1rem 5rem",
            borderRadius: "25px",
            margin: "1.5rem 0",
            boxShadow: "2px 2px 2px 0 gray",
            cursor: "pointer",
        },
    });
    return (
        <button type="submit" className={css(s.boton)} onClick={() => props.onClick?.()}>
            {props.texto}
        </button>
    );
}
