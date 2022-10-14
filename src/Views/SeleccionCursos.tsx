import { TopBar } from "./SistemasMovil/TopBar";
import { StyleSheet, css } from "aphrodite/no-important";
import { Card } from "../components/Card";
import { createSignal, For } from "solid-js";
import { getAllListaCursosMock, RespuestaListaCursos } from "../API/ListaCursos";
import { Button } from "../components/Button";

const s = StyleSheet.create({
    checkbox: {
        width: "1.25rem",
        height: "1.25rem",
        margin: "0 0.5rem",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "3rem auto",
        gridRowGap: "1rem",
    },
});

export function SeleccionCursos() {
    const [cursos, setCursos] = createSignal<RespuestaListaCursos>({});
    const [msjErr, setMsjError] = createSignal(false);

    // Recuperar cursos de back
    (async() => setCursos(await getAllListaCursosMock()))();

    const submit = (ev: Event) => {
        ev.preventDefault();
        const form = ev.target as HTMLFormElement;
        // Los checkboxes
        const elements = form.elements;
        const idsAEnviar: Array<string> = [];
        for (let i = 0; i < elements.length; i += 1) {
            const inputBox = elements[i] as HTMLInputElement;
            if (inputBox.checked) {
                idsAEnviar.push(inputBox.value);
            }
        }

        if (idsAEnviar.length === 0) {
            setMsjError(true);
            setTimeout(() => setMsjError(false), 2500);
            return;
        }

        // Almacenar en localStorage
        localStorage.setItem("cursos-seleccionados", JSON.stringify(idsAEnviar));
        // Ir a sig pantalla
        window.location.href = "#/sistemas-movil/";
    };

    return (
        <div>
            <TopBar tituloBarra="Selección de Cursos" />

            <Card>
                <p>Escoge los cursos en los que matricularte</p>
            </Card>
            <form onSubmit={(ev) => submit(ev)}>
                <For each={Object.entries(cursos())}>
                    {([nombreAnio, infoCurso]) => (
                        <Card>
                            <h2>{nombreAnio} año</h2>
                            <div className={css(s.grid)}>
                                <For each={infoCurso}>
                                    {(curso) => (
                                        <>
                                            <input
                                                type="checkbox"
                                                value={curso.id_curso}
                                                className={css(s.checkbox)}
                                            />
                                            <span>{curso.nombre_curso}</span>
                                        </>
                                    )}
                                </For>
                            </div>
                        </Card>
                    )}
                </For>
                <div style="text-align: center">
                    <span style={msjErr() ? "opacity: 1; color: red" : "opacity: 0"}>Selecciona al menos 1 curso</span>
                    <br />
                    <Button texto={"Continuar"} />
                </div>
            </form>
        </div>
    );
}


