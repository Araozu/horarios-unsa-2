import YAML from "yaml";
import { StyleSheet, css } from "aphrodite";
import { MiHorario } from "./MiHorario";
import { Horarios } from "./Horarios";
import { DatosHorario } from "../types/DatosHorario";
import { estilosGlobales } from "../Estilos";
import { Show, createSignal, createEffect, createMemo, batch } from "solid-js";

const datosPromise = (async () => {
    const file = await fetch("/horarios/2020_1_fps_ingenieriadesistemas.yaml");
    const text = await file.text();
    return YAML.parse(text) as DatosHorario;
})();

const ElemCargando = () =>
    <div className={css(estilosGlobales.contenedor, estilosGlobales.inlineBlock)}>
        Recuperando horarios...
    </div>

export type EstadoLayout = "MaxPersonal" | "Normal" | "MaxHorarios";

export function ContenedorHorarios() {
    const [datosCargados, setDatosCargados] = createSignal(false);
    const [datos, setDatos] = createSignal<DatosHorario | null>(null);
    const [estadoLayout, setEstadoLayout] = createSignal<EstadoLayout>(
        localStorage.getItem("estadoLayout") as EstadoLayout || "Normal"
    );

    const e = createMemo(() => {
        let templateColumns = "";
        switch (estadoLayout()) {
            case "MaxHorarios": {
                templateColumns = "4rem auto";
                break;
            }
            case "MaxPersonal": {
                templateColumns = "auto 4rem";
                break;
            }
            case "Normal": {
                templateColumns = "50% 50%"
            }
        }

        localStorage.setItem("estadoLayout", estadoLayout());

        return StyleSheet.create({
            contenedor: {
                display: "grid",
                gridTemplateColumns: templateColumns
            }
        });
    });

    createEffect(async () => {
        const datos = await datosPromise;
        batch(() => {
            setDatos(datos);
            setDatosCargados(true);
        });
    });

    return <div className={css(e().contenedor)}>
        <div>
            <MiHorario estadoLayout={estadoLayout()} setEstadoLayout={setEstadoLayout}/>
        </div>
        <div>
            <Show when={datosCargados()}>
                <Horarios data={datos()!!} estadoLayout={estadoLayout()} setEstadoLayout={setEstadoLayout}/>
            </Show>
        </div>
    </div>;
}
