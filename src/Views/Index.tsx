import { BarraSuperior } from "../BarraSuperior"
import { Wallpaper } from "../Wallpaper"
import { estilosGlobales } from "../Estilos"
import { StyleSheet, css } from "aphrodite"

const e = StyleSheet.create({
    contenedorGlobal: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    cont: {
        width: "30rem",
    },
    parrafo: {
        textAlign: "justify",
        lineHeight: "1.4rem",
    },
    botonAccion: {
        width: "30rem",
        display: "inline-block",
        textAlign: "center",
    },
    iconoGitHub: {
        fontSize: "1.25rem",
        verticalAlign: "bottom",
        marginRight: "0.5rem",
    },
})

export function Index() {
    return (
        <div className={css(e.contenedorGlobal)}>
            <Wallpaper />
            <div className={css(e.cont)}>
                <div className={css(estilosGlobales.contenedor, estilosGlobales.inlineBlock, e.cont)}>
                    <h1 style={{"text-align": "center", "font-size": "1.75rem"}}>Horarios UNSA</h1>
                    <p className={css(e.parrafo)}>
                        Esta página te permite crear tu horario fácilmente, sin importar de que
                        año son los cursos.
                    </p>
                    <p className={css(e.parrafo)}>
                        Ingeniería de Sistemas cuenta con horarios de teoria y laboratorio automáticos,
                        el resto de carreras solo cuenta con teoria y necesitan que el alumno inicie
                        sesión.
                    </p>
                    <p className={css(e.parrafo)}>
                        Se recomienda usar un computador/laptop y un navegador actualizado (Firefox, Chrome, Qutebrowser).
                    </p>
                </div>
                <button className={css(estilosGlobales.contenedor, estilosGlobales.contenedorCursor, e.botonAccion)}>
                    Ing. de Sistemas
                </button>
                <button className={css(estilosGlobales.contenedor, estilosGlobales.contenedorCursor, e.botonAccion)}>
                    Otras carreras
                </button>
                <a
                    className={css(estilosGlobales.contenedor, estilosGlobales.contenedorCursor, e.botonAccion)}
                    href="https://github.com/Araozu/horarios-unsa-2/"
                    target="_blank"
                >
                    <i className={`${css(e.iconoGitHub)} ph-code`} />
                    Código fuente en GitHub
                </a>
            </div>
        </div>
    )
}
