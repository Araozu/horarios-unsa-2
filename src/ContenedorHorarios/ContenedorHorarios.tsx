import YAML from "yaml";
import { StyleSheet, css } from "aphrodite";
import { MiHorario } from "./MiHorario";
import { Horarios } from "./Horarios";
import { DatosHorario } from "../types/DatosHorario";
import { estilosGlobales } from "../Estilos";
import { Show, createSignal, createEffect, batch } from "solid-js";

const datosPromise = (async () => {
    const file = await fetch("/horarios/2020_1_fps_ingenieriadesistemas.yaml");
    const text = await file.text();
    return YAML.parse(text) as DatosHorario;
})();

const ElemCargando = () =>
    <div className={css(estilosGlobales.contenedor, estilosGlobales.inlineBlock)}>
        Recuperando horarios...
    </div>

export function ContenedorHorarios() {
    const e = StyleSheet.create({
        contenedor: {
            display: "grid",
            gridTemplateColumns: "50% 50%"
        }
    });

    const [datosCargados, setDatosCargados] = createSignal(false);
    const [datos, setDatos] = createSignal<DatosHorario | null>(null);

    createEffect(async () => {
        const datos = await datosPromise;
        batch(() => {
            setDatos(datos);
            setDatosCargados(true);
        });
    });

    return <div className={css(e.contenedor)}>
        <MiHorario/>
        <Show when={datosCargados()}>
            <Horarios data={datos()!!}/>
        </Show>
    </div>;
}
