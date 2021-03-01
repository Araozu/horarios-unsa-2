import { BarraSuperior } from "./BarraSuperior";
import { ContenedorHorarios } from "./ContenedorHorarios/ContenedorHorarios";
import { Wallpaper } from "./Wallpaper";
import { Show } from "solid-js";
import { css } from "aphrodite";
import { estilosGlobales } from "./Estilos";

function App() {
    /// @ts-ignore
    const soportaBackdropFilter = document.body.style.backdropFilter !== undefined;

    return (
        <div class="App">
            <Wallpaper/>
            <BarraSuperior/>
            <Show when={!soportaBackdropFilter}>
                <div className={css(estilosGlobales.contenedor)}>
                    Tu navegador no soporta "backdrop-filter". Este es solo un efecto
                    visual, no afecta la funcionalidad de la página.&nbsp;
                    <span>No volver a mostrar.</span>
                </div>
            </Show>
            <br/>
            <ContenedorHorarios/>
        </div>
    );
}

export default App;
