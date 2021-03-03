import { createSignal, createEffect } from "solid-js";

enum ModoColor {
    Claro,
    Oscuro,
    Auto
}

export const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
export const horas = [
    "07:00 - 07:50",
    "07:50 - 08:40",
    "08:40 - 08:50",
    "08:50 - 09:40",
    "09:40 - 10:30",
    "10:30 - 10:40",
    "10:40 - 11:30",
    "11:30 - 12:20",
    "12:20 - 13:10",
    "13:10 - 14:00",
    "14:00 - 14:50",
    "14:50 - 15:40",
    "15:40 - 15:50",
    "15:50 - 16:40",
    "16:40 - 17:30",
    "17:30 - 17:40",
    "17:40 - 18:30",
    "18:30 - 19:20",
    "19:20 - 20:10",
    "20:10 - 21:00",
    "21:00 - 21:00"
];
export const horasDescanso = [
    "08:40 - 08:50",
    "10:30 - 10:40",
    "15:40 - 15:50",
    "17:30 - 17:40"
];

const numImgGuardado = parseInt(localStorage.getItem("num-img") ?? "3");

export const [modoColor, setModoColor] = createSignal(ModoColor.Oscuro);
export const [numWallpaper, setNumWallpaper] = createSignal(numImgGuardado);
export const [mostrarDescansos, setMostrarDescansos] = createSignal(true);
