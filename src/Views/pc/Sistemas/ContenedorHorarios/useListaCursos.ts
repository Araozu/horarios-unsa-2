import {createStore, SetStoreFunction, Store} from "solid-js/store";
import { Curso, ListaCursosUsuario } from "../../../../types/DatosHorario";

interface ReturnType {
    listaCursos: Store<ListaCursosUsuario>,
    setListaCursos: SetStoreFunction<ListaCursosUsuario>,
    agregarCursoALista: (c: Curso) => Curso,
    eliminarCursosDeLista: () => void
}

export const useListaCursos = (): ReturnType => {
    const [listaCursos, setListaCursos] = createStore<ListaCursosUsuario>({
        sigIndice: 0,
        cursos: [],
    });

    const agregarCursoALista = (curso: Curso): Curso => {
        // Si el horario ya se habia agregado, ocultarlo
        const cursoActualIndex = listaCursos.cursos.findIndex((x) => x.nombre === curso.nombre);
        if (cursoActualIndex !== -1) {
            setListaCursos("cursos", cursoActualIndex, "oculto", (x) => !x);
            return listaCursos.cursos[cursoActualIndex];
        } else {
            setListaCursos("cursos", listaCursos.sigIndice, curso);
            setListaCursos("sigIndice", (x) => x + 1);
            return listaCursos.cursos[listaCursos.sigIndice - 1];
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
        eliminarCursosDeLista,
    };
};
