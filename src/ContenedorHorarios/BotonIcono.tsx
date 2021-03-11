import { css } from "aphrodite";
import { estilosGlobales } from "../Estilos";

interface BotonMaxMinProps {
    icono: string,
    titulo: string,
    onClick: () => void
}

export function BotonIcono(props: BotonMaxMinProps) {
    return <div title={props.titulo}
                onClick={props.onClick}
                className={css(
                    estilosGlobales.contenedor,
                    estilosGlobales.inlineBlock,
                    estilosGlobales.contenedorCursor,
                    estilosGlobales.contenedorCursorSoft,
                    estilosGlobales.contenedorPhospor
                )}
    >
        <i className={css(estilosGlobales.botonPhospor) + " " + props.icono}/>
    </div>
}
