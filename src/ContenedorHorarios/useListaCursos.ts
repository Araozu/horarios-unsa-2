import { createState, SetStateFunction, State } from "solid-js";
import { Curso, ListaCursosUsuario } from "../types/DatosHorario";

interface ReturnType {
    listaCursos: State<ListaCursosUsuario>,
    setListaCursos: SetStateFunction<ListaCursosUsuario>,
    agregarCursoALista: (c: Curso) => void,
    eliminarCursosDeLista: () => void
}

export const useListaCursos = (): ReturnType => {
    const [listaCursos, setListaCursos] = createState<ListaCursosUsuario>({
        sigIndice: 0,
        cursos: []
    });

    const agregarCursoALista = (curso: Curso) => {
        // Si el horario ya se habia agregado, ocultarlo
        const cursoActualIndex = listaCursos.cursos.findIndex(x => x.nombre === curso.nombre);
        if (cursoActualIndex !== -1) {
            setListaCursos("cursos", cursoActualIndex, "oculto", x => !x);
        } else {
            setListaCursos("cursos", listaCursos.sigIndice, curso);
            setListaCursos("sigIndice", x => x + 1);
        }
    };

    const eliminarCursosDeLista = () => {
        setListaCursos("cursos", []);
        setListaCursos("sigIndice", 0);
    };

    return {
        listaCursos,
        setListaCursos,
        agregarCursoALista,
        eliminarCursosDeLista
    };
};
