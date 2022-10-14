import { BarraSuperior } from "../../BarraSuperior";
import { ContenedorHorarios } from "./Sistemas/ContenedorHorarios";
import { Show, createSignal } from "solid-js";
import { css } from "aphrodite";
import { estilosGlobales } from "../../Estilos";
import { Creditos } from "../../Creditos";
import { Separador } from "../../Separador";

export function Sistemas() {
    return (
        <div>
            <BarraSuperior />
            <Separador />
            <ContenedorHorarios />
            <Creditos />
        </div>
    );
}
