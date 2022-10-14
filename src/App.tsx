import { Main } from "./Views/Main";
import { Index } from "./Views/Index";
import { Editor } from "./Views/Editor";
import { useRouter } from "./Router";
import { Switch, Match, Show } from "solid-js";
import { Wallpaper } from "./Wallpaper";
import { SistemasMovil } from "./Views/SistemasMovil";
import { SeleccionCursos } from "./Views/SeleccionCursos";
import { VerMatricula } from "./Views/VerMatricula";

function App() {
    const route = useRouter();
    const isMobile = screen.width <= 500;

    return (
        <div className="App" style={isMobile ? "--color-texto: #202020;" : ""}>
            <Show when={!isMobile}>
                <Wallpaper />
            </Show>
            <Switch fallback={<p>404!</p>}>
                <Match when={route() === "/"}>
                    <Index />
                </Match>
                <Match when={route() === "/editor/"}>
                    <Editor />
                </Match>
                <Match when={route() === "/seleccion-cursos/"}>
                    <SeleccionCursos />
                </Match>
                <Match when={route() === "/sistemas-movil/"}>
                    <SistemasMovil />
                </Match>
                <Match when={route() === "/ver-matricula/"}>
                    <VerMatricula />
                </Match>
                <Match when={route() === "/sistemas/"}>
                    <Main />
                </Match>
            </Switch>
        </div>
    );
}

export default App;
