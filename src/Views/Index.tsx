import { estilosGlobales } from "../Estilos"
import { StyleSheet, css } from "aphrodite"
import { RouterLink } from "../Router"

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
            <div className={css(e.cont)}>
                <div className={css(estilosGlobales.contenedor, estilosGlobales.inlineBlock, e.cont)}>
                    <h1 style={{
                        "text-align": "center",
                        "font-size": "1.75rem",
                    }}
                    >
                        Horarios UNSA
                    </h1>
                    <p className={css(e.parrafo)}>
                        Esta página te permite crear tu horario fácilmente, sin importar de que
                        año son los cursos.
                    </p>
                    <p className={css(e.parrafo)}>
                        Por ahora solo está disponible para ing. de sistemas. Proximamente se habilitarán
                        otras carreras.
                    </p>
                    <p className={css(e.parrafo)}>
                        Se recomienda usar un computador/laptop y un navegador actualizado (Firefox, Chrome,
                        Qutebrowser).
                    </p>
                </div>
                <RouterLink
                    to={"/sistemas/"}
                    className={css(estilosGlobales.contenedor, estilosGlobales.contenedorCursor, e.botonAccion)}
                >
                    Ing. de Sistemas
                </RouterLink>
                {/*
                <button disabled className={css(estilosGlobales.contenedor, estilosGlobales.contenedorCursor, e.botonAccion)}>
                    Otras carreras
                </button>
                */}
                <RouterLink
                    to={"/editor/"}
                    className={css(estilosGlobales.contenedor, estilosGlobales.contenedorCursor, e.botonAccion)}
                >
                    <i className={`${css(e.iconoGitHub)} ph-pencil`} />
                    Editor
                </RouterLink>
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
