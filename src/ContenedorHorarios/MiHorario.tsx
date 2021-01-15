import { estilosGlobales } from "../Estilos";
import { StyleSheet, css } from "aphrodite";
import { Tabla } from "./Tabla";

export function MiHorario() {
    const e = StyleSheet.create({
        horario: {}
    });

    return <div>
        <div className={css(
            estilosGlobales.inlineBlock,
            estilosGlobales.contenedor
        )}>
            Mi horario
        </div>
        <div className={css(
            e.horario,
            estilosGlobales.contenedor
        )}>
            <Tabla/>
        </div>
    </div>;
}
