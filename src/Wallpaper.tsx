import { StyleSheet, css } from "aphrodite";
import { numWallpaper } from "./Store";
import { createEffect, createState } from "solid-js";

const duracionTransicion = 250;

export function Wallpaper() {
    /// @ts-ignore
    const soportaBackdropFilter = document.body.style.backdropFilter !== undefined;

    const estilos = StyleSheet.create({
        contenedorCover: {
            position: "fixed",
            width: "100vw",
            height: "100vh",
            top: "0",
            left: "0",
            backgroundColor: "#212121",
            zIndex: -1
        },
        cover: {
            width: "100vw",
            height: "100vh",
            backgroundPosition: "center",
            backgroundSize: "cover",
            zIndex: -1,
            transition: `opacity ${duracionTransicion}ms`,
            filter: soportaBackdropFilter? "": "blur(40px)"
        },
        coverTransicion: {
            opacity: 0
        }
    });

    const [estilosRaw, setEstilosRaw] = createState({
        "background-image": `none`,
        opacity: 1
    });

    createEffect(() => {
        const numImg = numWallpaper();
        setEstilosRaw("opacity", 0);

        const promesa250ms = new Promise(resolve => {
            setTimeout(resolve, duracionTransicion);
        });

        const url = `/img/wall${numImg}.webp`;
        const img = new Image();
        img.addEventListener("load", async () => {
            await promesa250ms;
            setEstilosRaw({
                "background-image": `url('${url}')`,
                opacity: 1
            });
        });
        img.src = url;
    });

    return <div className={css(estilos.contenedorCover)}>
        <div
            className={css(estilos.cover)}
            style={{"background-image": estilosRaw["background-image"], opacity: estilosRaw.opacity}}
        />
    </div>

}
