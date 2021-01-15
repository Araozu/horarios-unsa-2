import { createSignal, createEffect } from "solid-js";

enum ModoColor {
    Claro,
    Oscuro,
    Auto
}

const numImgGuardado = parseInt(localStorage.getItem("num-img") ?? "4");

export const [modoColor, setModoColor] = createSignal(ModoColor.Oscuro);
export const [numWallpaper, setNumWallpaper] = createSignal(numImgGuardado);
export const [mostrarDescansos, setMostrarDescansos] = createSignal(true);
