import { estilosGlobales } from "./Estilos"
import { StyleSheet, css } from "aphrodite"
import { numWallpaper, setNumWallpaper } from "./Store"

const ultimoIndiceWallpaper = 5

const e = StyleSheet.create({
    contCambiador: {
        userSelect: "none",
    },
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

const retrocederWallpaper = () => {
    const num = numWallpaper()
    if (num > 0) {
        setNumWallpaper(num - 1)
        localStorage.setItem("num-img", (num - 1).toString())
    } else {
        setNumWallpaper(ultimoIndiceWallpaper)
        localStorage.setItem("num-img", (ultimoIndiceWallpaper).toString())
    }
}

const avanzarWallpaper = () => {
    const num = numWallpaper()
    if (num < ultimoIndiceWallpaper) {
        setNumWallpaper(num + 1)
        localStorage.setItem("num-img", (num + 1).toString())
    } else {
        setNumWallpaper(0)
        localStorage.setItem("num-img", (0).toString())
    }
}

function CambiadorImg() {
    return (
        <div className={css(estilosGlobales.inlineBlock, e.contCambiador)}>
            <span className={css(estilosGlobales.contenedor, estilosGlobales.inlineBlock)}>
                <i
                    className={`ph-arrow-left ${css(e.boton, e.botonLeft, estilosGlobales.contenedorCursorSoft)}`}
                    onClick={retrocederWallpaper}
                    title={"Cambiar imagen de fondo"}
                />
                Img. {numWallpaper() + 1}
                <i
                    className={`ph-arrow-right ${css(e.boton, e.botonRight, estilosGlobales.contenedorCursorSoft)}`}
                    onClick={avanzarWallpaper}
                    title={"Cambiar imagen de fondo"}
                />
            </span>
        </div>
    )
}

const estilos = StyleSheet.create({
    tituloPrincipal: {
        fontWeight: "bold",
    },
})

export function BarraSuperior() {
    return (
        <header>
            <span className={css(
                estilosGlobales.contenedor,
                estilosGlobales.inlineBlock,
                estilos.tituloPrincipal,
            )}
            >
                Horarios Unsa
            </span>
            <a href="https://github.com/Araozu/horarios-unsa-2/" target="_blank" title={"Ver codigo fuente en GitHub"}
                className={css(
                    estilosGlobales.contenedor,
                    estilosGlobales.inlineBlock,
                    estilosGlobales.contenedorCursor,
                )}
            >
                GitHub
                <i class="ph-arrow-up-right" />
            </a>
            <CambiadorImg />
            <span className={css(estilosGlobales.contenedor, estilosGlobales.inlineBlock)}>2021-A</span>
            <span className={css(estilosGlobales.contenedor, estilosGlobales.inlineBlock)}>Ingeniería de Sistemas</span>
        </header>
    )
}
