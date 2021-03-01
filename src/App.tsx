import { BarraSuperior } from "./BarraSuperior";
import { ContenedorHorarios } from "./ContenedorHorarios/ContenedorHorarios";
import { Wallpaper } from "./Wallpaper";
import { Show, createSignal } from "solid-js";
import { css } from "aphrodite";
import { estilosGlobales } from "./Estilos";

function App() {
    /// @ts-ignore
    const soportaBackdropFilter = document.body.style.backdropFilter !== undefined;
    const mostrarMensajeBackdropFilterRaw = localStorage.getItem("mensaje-backdrop-filter-oculto") !== undefined;

    const [mostrarMensajeBackdropFilter, setMostrarMensaje] = createSignal(mostrarMensajeBackdropFilterRaw);

    const ocultarMensajeBackdropFilter = () => {
        setMostrarMensaje(false);
        localStorage.setItem("mensaje-backdrop-filter-oculto", "true");
    };

    return (
        <div class="App">
            <Wallpaper/>
            <BarraSuperior/>
            <Show when={!soportaBackdropFilter && mostrarMensajeBackdropFilter()}>
                <div className={css(estilosGlobales.contenedor)}>
                    Tu navegador no soporta "backdrop-filter". Este es solo un efecto
                    visual, no afecta la funcionalidad de la página.&nbsp;
                    <span className={css(estilosGlobales.contenedorCursor, estilosGlobales.contenedorCursorSoft)}
                          onClick={ocultarMensajeBackdropFilter}
                    >
                        No volver a mostrar.
                    </span>
                </div>
            </Show>
            <br/>
            <ContenedorHorarios/>
        </div>
    );
}

export default App;
