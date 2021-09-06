import { Main } from "./Views/Main"
import { Index } from "./Views/Index"
import { Editor } from "./Views/Editor"
import { useRouter } from "./Router"
import { Switch, Match } from "solid-js"
import { Wallpaper } from "./Wallpaper"

function App() {
    const route = useRouter()

    return (
        <div className="App">
            <Wallpaper />
            <Switch fallback={<p>404!</p>}>
                <Match when={route() === "/"}>
                    <Index />
                </Match>
                <Match when={route() === "/editor/"}>
                    <Editor />
                </Match>
                <Match when={route() === "/sistemas/"}>
                    <Main />
                </Match>
            </Switch>
        </div>
    )
}

export default App
