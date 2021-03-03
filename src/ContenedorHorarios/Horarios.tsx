import { DatosHorario } from "../types/DatosHorario";
import { For, createSignal, createMemo } from "solid-js";
import { css } from "aphrodite";
import { estilosGlobales } from "../Estilos";
import { Tabla } from "./Tabla";
import { Cursos } from "./Cursos";
import { EstadoLayout } from "./ContenedorHorarios";

const maximizarHorario = (setEstadoLayout: (v: EstadoLayout) => EstadoLayout) => {
    setEstadoLayout("MaxHorarios");
};

const minimizarHorario = (setEstadoLayout: (v: EstadoLayout) => EstadoLayout) => {
    setEstadoLayout("Normal");
};

function BotonExpandirOcultar(props: { setEstadoLayout: (v: EstadoLayout) => EstadoLayout }) {
    const [horariosMax, setHorariosMax] = createSignal(false);

    const tituloBoton = () => horariosMax() ? "Minimizar horario" : "Maximizar horario";
    const iconoBoton = () => horariosMax() ? "ph-arrows-in" : "ph-arrows-out";

    const funcionBoton = () => {
        const estaMaximizado = horariosMax();
        setHorariosMax(!estaMaximizado);
        if (estaMaximizado) {
            minimizarHorario(props.setEstadoLayout);
        } else {
            maximizarHorario(props.setEstadoLayout);
        }
    };

    return <div title={tituloBoton()}
                onClick={funcionBoton}
                className={css(
                    estilosGlobales.contenedor,
                    estilosGlobales.inlineBlock,
                    estilosGlobales.contenedorCursor,
                    estilosGlobales.contenedorCursorSoft,
                    estilosGlobales.contenedorPhospor
                )}
    >
        <i className={css(estilosGlobales.botonPhospor) + " " + iconoBoton()}/>
    </div>
}

export function Horarios(props: { data: DatosHorario, setEstadoLayout: (v: EstadoLayout) => EstadoLayout }) {

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
        |
        <BotonExpandirOcultar setEstadoLayout={props.setEstadoLayout}/>
        <br/>
        <div className={css(estilosGlobales.contenedor)}>
            <Tabla data={dataTabla()} version={props.data.version} anio={anioActual()}/>
        </div>
        <div>
            <Cursos dataAnio={dataTabla()}/>
        </div>
    </div>;
}
