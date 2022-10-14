import { TopBar } from "./SistemasMovil/TopBar";
import { Card } from "../components/Card";
import { createSignal, For } from "solid-js";
import { getMatriculaMock, InfoMatricula } from "../API/VerMatricula";
import { gruposSeleccionados } from "../Store";

export function VerMatricula() {
    const [infoMatriculas, setInfoMatriculas] = createSignal<Array<InfoMatricula>>([]);

    (async() => {
        const laboratorios = Object.entries(gruposSeleccionados)
            .filter((x) => x[1] === true)
            .map((x) => parseInt(x[0], 10));
        setInfoMatriculas(await getMatriculaMock({matriculas: laboratorios}));
    })();

    return (
        <div>
            <TopBar tituloBarra={"Ver Matricula"} />
            <Card>
                <h2>Tu matrícula</h2>
                <For each={infoMatriculas()}>
                    {(matricula) => (
                        <div>
                            <h3>{matricula.nombre_curso}</h3>
                            <p>Grupo: {matricula.grupo}</p>
                            <p>Docente: {matricula.docente}</p>
                        </div>
                    )}
                </For>
            </Card>
        </div>
    );
}
