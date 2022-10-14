import { JSX } from "solid-js";
import { StyleSheet, css } from "aphrodite/no-important";

const s = StyleSheet.create({
    card: {
        padding: "0.5rem",
        border: "solid 2px var(--color-borde)",
        borderRadius: "10px",
        margin: "0.5rem",
    },
});

export function Card(props: {children?: JSX.Element}) {
    return (
        <div className={css(s.card)}>
            {props.children}
        </div>
    );
}
