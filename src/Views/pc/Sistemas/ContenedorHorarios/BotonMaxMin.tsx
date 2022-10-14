import { css } from "aphrodite";
import { estilosGlobales } from "../../../../Estilos";
import {EstadoLayout} from "../ContenedorHorarios";

interface BotonMaxMinProps {
    fnMaximizar: () => void,
    fnMinimizar: () => void,
    estadoActualLayout: () => EstadoLayout, // El nombre del estado actual del layout
    estadoLayoutMax: EstadoLayout // El nombre del estado en el cual el componente esta maximizado
}

export function BotonMaxMin(props: BotonMaxMinProps) {
    const horariosMax = () => props.estadoActualLayout() === props.estadoLayoutMax;

    const tituloBoton = () => (horariosMax() ? "Minimizar" : "Maximizar");
    const iconoBoton = () => (horariosMax() ? "ph-arrows-in" : "ph-arrows-out");

    const funcionBoton = () => {
        const estaMaximizado = horariosMax();
        if (estaMaximizado) {
            props.fnMinimizar();
        } else {
            props.fnMaximizar();
        }
    };

    return (
        <button
            title={tituloBoton()}
            onClick={funcionBoton}
            className={css(
                estilosGlobales.contenedor,
                estilosGlobales.inlineBlock,
                estilosGlobales.contenedorCursor,
                estilosGlobales.contenedorCursorSoft,
                estilosGlobales.contenedorPhospor,
            )}
        >
            <i className={`${css(estilosGlobales.botonPhospor)} ${iconoBoton()}`} />
        </button>
    );
}
