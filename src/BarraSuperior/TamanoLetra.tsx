import { css, StyleSheet } from "aphrodite"
import { estilosGlobales } from "../Estilos"
import { tamanoLetra, setTamanoLetra } from "../Store"
import { createEffect } from "solid-js"

const e = StyleSheet.create({
    boton: {
        cursor: "pointer",
        textDecoration: "underline",
        "::before": {
            fontSize: "1rem",
            transform: "translateY(0.2rem)",
        },
    },
    botonDesactivado: {
        cursor: "not-allowed",
        textDecoration: "none",
    },
    botonLeft: {
        paddingRight: "0.5rem",
        marginRight: "0.25rem",
    },
    botonRight: {
        paddingLeft: "0.5rem",
        marginRight: "0.25rem",
    },
})

function reducirLetra() {
    const v = tamanoLetra()
    if (v > 10) {
        setTamanoLetra(v - 2)
        localStorage.setItem("tamano-letra", (v - 2).toString())
    }
}

function aumentarLetra() {
    const v = tamanoLetra()
    if (v < 20) {
        setTamanoLetra(v + 2)
        localStorage.setItem("tamano-letra", (v + 2).toString())
    }
}

export function TamanoLetra() {
    createEffect(() => {
        const v = tamanoLetra()
        console.log("Letra:", v)
        document.documentElement.style.fontSize = v + "px"
        // document.body.style.fontSize = v + "px"
    })
    
    return (
        <div className={css(estilosGlobales.inlineBlock)} style={{"user-select": "none"}}>
            <span className={css(estilosGlobales.contenedor, estilosGlobales.inlineBlock)}>
                <i
                    className={`ph-minus ${css(e.boton, e.botonLeft, estilosGlobales.contenedorCursorSoft)}`}
                    onClick={reducirLetra}
                    title={"Disminuir tamaño de letra"}
                />
                Tamaño: {tamanoLetra()}
                <i
                    className={`ph-plus ${css(e.boton, e.botonRight, estilosGlobales.contenedorCursorSoft)}`}
                    onClick={aumentarLetra}
                    title={"Aumentar tamaño de letra"}
                />
            </span>
        </div>
    )
}
