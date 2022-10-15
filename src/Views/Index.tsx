import { estilosGlobales } from "../Estilos";
import { StyleSheet, css } from "aphrodite/no-important";
import { RouterLink } from "../Router";
import { batch, createSignal, Show } from "solid-js";
import { isMobile, setGruposSeleccionados } from "../Store";
import { MobileIndex } from "./MobileIndex";
import { loginFn } from "../API/Login";

const e = StyleSheet.create({
    contenedorGlobal: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    cont: {
        width: "30rem",
    },
    parrafo: {
        textAlign: "justify",
        lineHeight: "1.4rem",
    },
    botonAccion: {
        width: "30rem",
        display: "inline-block",
        textAlign: "center",
    },
    iconoGitHub: {
        fontSize: "1.25rem",
        verticalAlign: "bottom",
        marginRight: "0.5rem",
    },
    inputCorreo: {
        width: "100%",
        backgroundColor: "rgba(159,159,159,0.44)",
        border: "none",
        borderBottom: "solid 2px var(--color-texto)",
        padding: "0.5rem 1rem",
        boxSizing: "border-box",
        marginTop: "1rem",
        borderRadius: "5px",
    },
});


export function Index() {
    const [msgErrorVisible, setMsgErrorVisible] = createSignal(false);
    const inputElement = <input class={css(e.inputCorreo)} type="email" required placeholder="correo@unsa.edu.pe" />;

    const login = async(ev: Event) => {
        ev.preventDefault();
        const email = (inputElement as HTMLInputElement).value;
        const response = await loginFn({correo_usuario: email});

        if (response === null) {
            setMsgErrorVisible(true);
            setTimeout(() => setMsgErrorVisible(false), 2500);
        } else if (!response.matriculas || response.matriculas.length === 0) {
            localStorage.setItem("correo", email);
            window.location.href = "#/pc/seleccion-cursos/";
        } else if (response.matriculas.length > 0) {
            localStorage.setItem("correo", email);
            batch(() => {
                for (const id_lab of response.matriculas) {
                    setGruposSeleccionados(id_lab, true);
                }
            });
            window.location.href = "#/pc/ver-matricula/";
        }
    };

    return (
        <>
            <Show when={!isMobile()}>
                <div class={css(e.contenedorGlobal)}>
                    <div class={css(e.cont)}>
                        <div class={css(estilosGlobales.contenedor, estilosGlobales.inlineBlock, e.cont)}>
                            <h1 style={{
                                "text-align": "center",
                                "font-size": "1.75rem",
                            }}
                            >
                                Horarios UNSA
                            </h1>
                            <p class={css(e.parrafo)}>
                                Inicia sesión con tu correo institucional.
                                <br />
                                {inputElement}
                            </p>
                            <span style={msgErrorVisible() ? "opacity: 1; color: red;" : "opacity: 0;"}>
                                El correo es invalido
                            </span>
                        </div>
                        <button onClick={login} class={css(estilosGlobales.contenedor, estilosGlobales.contenedorCursor, e.botonAccion)}>
                            Iniciar sesion
                        </button>
                        <br />
                        <br />
                        <a
                            class={css(estilosGlobales.contenedor, estilosGlobales.contenedorCursor, e.botonAccion)}
                            href="https://github.com/Araozu/horarios-unsa-2/"
                            target="_blank"
                        >
                            <i class={`${css(e.iconoGitHub)} ph-code`} />
                            Código fuente en GitHub
                        </a>
                    </div>
                </div>
            </Show>
            <Show when={isMobile()}>
                <MobileIndex />
            </Show>
        </>
    );
}
