import {createStore, SetStoreFunction, Store} from "solid-js/store";
import { Curso, ListaCursosUsuario } from "../../../../types/DatosHorario";

interface ReturnType {
    listaCursos: Store<ListaCursosUsuario>,
    setListaCursos: SetStoreFunction<ListaCursosUsuario>,
    agregarCursoALista: (c: Curso) => Curso,
    eliminarCursosDeLista: () => void
}

export const useListaCursos = (): ReturnType => {
    const [listaCursos, setListaCursos] = createStore<ListaCursosUsuario>({});

    const agregarCursoALista = (curso: Curso): Curso => {
        // Si el horario ya se habia agregado, ocultarlo
        if (listaCursos[curso.nombre]) {
            setListaCursos(curso.nombre, "oculto", (x) => !x);
            return listaCursos[curso.nombre];
        } else {
            setListaCursos(curso.nombre, curso);
            return listaCursos[curso.nombre];
        }
    };

    const eliminarCursosDeLista = () => {
        setListaCursos({});
    };

    return {
        listaCursos,
        setListaCursos,
        agregarCursoALista,
        eliminarCursosDeLista,
    };
};
