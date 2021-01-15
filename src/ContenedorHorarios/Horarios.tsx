import { DatosHorario } from "../types/DatosHorario";
import { createEffect, Show, For } from "solid-js";
import { StyleSheet, css } from "aphrodite";
import { estilosGlobales } from "../Estilos";

export function Horarios(props: { data: DatosHorario }) {

    const elAnios = <For each={Object.entries(props.data.años)}>
        {([nombre]) =>
            <div className={css(
                estilosGlobales.contenedor,
                estilosGlobales.inlineBlock,
                estilosGlobales.contenedorCursor,
                estilosGlobales.contenedorCursorSoft
            )}>
                {nombre}
            </div>
        }
    </For>;

    return <div>
        {elAnios}
        <br/>
        <div className={css(estilosGlobales.contenedor, estilosGlobales.inlineBlock)}>
            Cargado :D
        </div>
    </div>;
}
