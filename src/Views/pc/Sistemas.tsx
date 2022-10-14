import { BarraSuperior } from "../../BarraSuperior";
import { ContenedorHorarios } from "./Sistemas/ContenedorHorarios";
import { Creditos } from "../../Creditos";
import { Separador } from "../../Separador";

export function Sistemas() {
    return (
        <div>
            <BarraSuperior />
            <Separador />
            <Separador />
            <ContenedorHorarios />
            <Creditos />
        </div>
    );
}
