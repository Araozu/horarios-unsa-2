import { estilosGlobales } from "../Estilos";
import { StyleSheet, css } from "aphrodite";

export function MiHorario() {
    const e = StyleSheet.create({
        horario: {
            height: "20rem"
        }
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
        )}/>
    </div>;
}
