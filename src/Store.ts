import { createSignal, createEffect } from "solid-js";

enum ModoColor {
    Claro,
    Oscuro,
    Auto
}

const numImgGuardado = parseInt(localStorage.getItem("num-img") ?? "1");
console.log(numImgGuardado);

export const [modoColor, setModoColor] = createSignal(ModoColor.Oscuro);
export const [numWallpaper, setNumWallpaper] = createSignal(numImgGuardado);
createEffect(() => {
    const num = numWallpaper();
    localStorage.setItem("num-img", num.toString());
    console.log("Establecer item!");
});
