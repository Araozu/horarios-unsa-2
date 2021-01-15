import { estilosGlobales } from "./Estilos";
import { StyleSheet, css } from "aphrodite";
import { numWallpaper, setNumWallpaper } from "./Store";

const totalWallpapers = 21;

function CambiadorImg() {
    const e = StyleSheet.create({
        contCambiador: {
            userSelect: "none"
        },
        boton: {
            cursor: "pointer",
            textDecoration: "underline",
            "::before": {
                fontSize: "1rem",
                transform: "translateY(0.2rem)"
            }
        },
        botonDesactivado: {
            cursor: "not-allowed",
            textDecoration: "none"
        },
        botonLeft: {
            paddingRight: "0.5rem",
            marginRight: "0.25rem"
        },
        botonRight: {
            paddingLeft: "0.5rem",
            marginRight: "0.25rem"
        }
    });

    const retrocederWallpaper = () => {
        const num = numWallpaper();
        if (num > 0) {
            setNumWallpaper(num - 1);
            localStorage.setItem("num-img", (num - 1).toString());
        } else {
            setNumWallpaper(totalWallpapers);
            localStorage.setItem("num-img", (totalWallpapers).toString());
        }
    };

    const avanzarWallpaper = () => {
        const num = numWallpaper();
        if (num < totalWallpapers) {
            setNumWallpaper(num + 1);
            localStorage.setItem("num-img", (num + 1).toString());
        } else {
            setNumWallpaper(0);
            localStorage.setItem("num-img", (0).toString());
        }
    };

    return <div className={css(estilosGlobales.inlineBlock, e.contCambiador)}>
        <span className={css(estilosGlobales.contenedor, estilosGlobales.inlineBlock)}>
            <i
                className={"ph-arrow-left " + css(e.boton, e.botonLeft)}
                onClick={retrocederWallpaper}
            />
            Img. {numWallpaper() + 1}
            <i
                className={"ph-arrow-right " + css(e.boton, e.botonRight)}
                onClick={avanzarWallpaper}
            />
        </span>
    </div>;
}

export function BarraSuperior() {
    const estilos = StyleSheet.create({
        tituloPrincipal: {
            fontWeight: "bold",
            fontFamily: "'SF Pro Display', sans-serif"
        }
    });

    return <header>
        <a href="/" className={css(
            estilosGlobales.contenedor,
            estilosGlobales.inlineBlock,
            estilosGlobales.contenedorCursor,
            estilos.tituloPrincipal
        )}>
            Horarios Unsa
        </a>
        <a href="https://github.com" target="_blank" className={css(
            estilosGlobales.contenedor,
            estilosGlobales.inlineBlock,
            estilosGlobales.contenedorCursor
        )}>
            GitHub
            <i class="ph-arrow-up-right"/>
        </a>
        <CambiadorImg/>
        <span className={css(estilosGlobales.contenedor, estilosGlobales.inlineBlock)}>2021-A</span>
        <span className={css(estilosGlobales.contenedor, estilosGlobales.inlineBlock)}>Ingeniería de Sistemas</span>
    </header>;
}
