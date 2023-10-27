import { createSignal, JSX } from "solid-js"

export const useRouter = (): () => string => {
    let rutaPrevia = window.location.hash

    if (rutaPrevia === "") {
        window.history.pushState({}, "Horarios UNSA", "#/")
        rutaPrevia = "/"
    } else {
        rutaPrevia = rutaPrevia.substr(1)
    }

    const [rutaActual, setRutaActual] = createSignal(rutaPrevia)

    const fnEffect = () => {
        const nuevaRuta = window.location.hash.substr(1)
        setRutaActual(nuevaRuta)
    }

    window.addEventListener("hashchange", fnEffect)

    return rutaActual
}

export function RouterLink(props: { to: string, className?: string, children: JSX.Element }) {
    return (
        <a className={props.className} href={`/#${props.to}`}>
            {props.children}
        </a>
    )
}
