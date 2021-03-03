import { DatosHorario } from "../types/DatosHorario";
import { For, createSignal, createMemo } from "solid-js";
import { css } from "aphrodite";
import { estilosGlobales } from "../Estilos";
import { Tabla } from "./Tabla";
import { Cursos } from "./Cursos";

export function Horarios(props: { data: DatosHorario }) {

    const [anioActual, setAnioActual] = createSignal("1er año");

    const elAnios = <For each={Object.entries(props.data.años)}>
        {([nombre]) => {
            const clases = createMemo(() => {
                const vAnio = anioActual();
                return css(
                    estilosGlobales.contenedor,
                    estilosGlobales.inlineBlock,
                    estilosGlobales.contenedorCursor,
                    estilosGlobales.contenedorCursorSoft,
                    nombre === vAnio && estilosGlobales.contenedorCursorActivo
                );
            });

            return <div className={clases()} title={"Cambiar a " + nombre} onClick={() => setAnioActual(nombre)}>
                {nombre}
            </div>
        }}
    </For>;

    const dataTabla = createMemo(() => {
        return props.data.años[anioActual()];
    });

    return <div>
        {elAnios}
        <br/>
        <div className={css(estilosGlobales.contenedor)}>
            <Tabla data={dataTabla()} version={props.data.version} anio={anioActual()}/>
        </div>
        <div>
            <Cursos dataAnio={dataTabla()}/>
        </div>
    </div>;
}
