import { BarraSuperior } from "../BarraSuperior";
import { ContenedorHorarios } from "../ContenedorHorarios/ContenedorHorarios";
import { Show, createSignal } from "solid-js";
import { css } from "aphrodite";
import { estilosGlobales } from "../Estilos";
import { Creditos } from "../Creditos";
import { Separador } from "../Separador";

export function Main() {
    /// @ts-ignore
    const soportaBackdropFilter = document.body.style.backdropFilter !== undefined;
    const mostrarMensajeBackdropFilterRaw = !localStorage.getItem("mensaje-backdrop-filter-oculto");

    const [mostrarMensajeBackdropFilter, setMostrarMensaje] = createSignal(mostrarMensajeBackdropFilterRaw);

    const ocultarMensajeBackdropFilter = () => {
        setMostrarMensaje(false);
        localStorage.setItem("mensaje-backdrop-filter-oculto", "true");
    };

    return (
        <div>
            <BarraSuperior />
            <Show when={!soportaBackdropFilter && mostrarMensajeBackdropFilter()}>
                <div className={css(estilosGlobales.contenedor)}>
                    Tu navegador no soporta "backdrop-filter". Este es solo un efecto
                    visual, no afecta la funcionalidad de la página.&nbsp;
                    <span
                        className={css(estilosGlobales.contenedorCursor, estilosGlobales.contenedorCursorSoft)}
                        onClick={ocultarMensajeBackdropFilter}
                    >
                        No volver a mostrar.
                    </span>
                </div>
            </Show>
            {/*
            <div className={css(estilosGlobales.contenedor)}>
                Solo teoria por ahora. Actualizado el 2021/03/28. Fuente:&nbsp;
                <a className={css(estilosGlobales.linkGenerico)} target="_blank" href="https://www.facebook.com/Escuela-Profesional-de-Ingenieria-de-Sistemas-171720913528/photos/pcb.10159175240878529/10159175239403529">
                    Página de Facebook de la escuela.
                </a>
            </div>
            */}
            <Separador />
            <ContenedorHorarios />
            <Creditos />
        </div>
    );
}
