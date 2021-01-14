import { BarraSuperior } from "./BarraSuperior";
import { ContenedorHorarios } from "./ContenedorHorarios/";
import { Wallpaper } from "./Wallpaper";

function App() {
    return (
        <div class="App">
            <Wallpaper/>
            <BarraSuperior/>
            <br/>
            <ContenedorHorarios/>
        </div>
    );
}

export default App;
