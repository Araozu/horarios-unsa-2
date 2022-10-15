import { Sistemas } from "./Views/pc/Sistemas";
import { Index } from "./Views/Index";
import { Editor } from "./Views/Editor";
import { useRouter } from "./Router";
import { Switch, Match, Show } from "solid-js";
import { Wallpaper } from "./Wallpaper";
import { SistemasMovil } from "./Views/SistemasMovil";
import { SeleccionCursos } from "./Views/SeleccionCursos";
import { VerMatricula } from "./Views/VerMatricula";
import {SeleccionCursos as SeleccionCursosPC} from "./Views/pc/SeleccionCursos";
import { VerMatricula as VerMatriculaPC } from "./Views/pc/VerMatricula";

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

                <Match when={route() === "/pc/seleccion-cursos/"}>
                    <SeleccionCursosPC />
                </Match>
                <Match when={route() === "/pc/sistemas/"}>
                    <Sistemas />
                </Match>
                <Match when={route() === "/pc/ver-matricula/"}>
                    <VerMatriculaPC />
                </Match>
            </Switch>
        </div>
    );
}

export default App;
