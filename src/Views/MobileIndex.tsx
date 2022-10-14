import { css, StyleSheet } from "aphrodite/no-important";
import { batch, createSignal } from "solid-js";
import { SERVER_PATH, setGruposSeleccionados } from "../Store";

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
});

type IdLaboratorio = number;
type LoginData = {correo_usuario: string};
type LoginResponse = Promise<{matriculas: Array<IdLaboratorio>} | null>;
type LoginFunction = (data: LoginData) => LoginResponse;

// Mock for a login without courses
const mockLoginEmpty: LoginFunction = async(data) => ({matriculas: []});

// Mock for a login with courses
const mockLoginNotEmpty: LoginFunction = async(_) => ({
    matriculas: [0, 1, 2, 3],
});

// Error login mock
const mockLoginWithError: LoginFunction = async(_) => null;

// Standard login
const loginFn: LoginFunction = async(data) => {
    const petition = await fetch(`${SERVER_PATH}/login`, {
        method: "POST",
        body: JSON.stringify({
            correo_usuario: data.correo_usuario,
        }),
    });
    if (!petition.ok) return null;
    return await petition.json() as {matriculas: Array<IdLaboratorio>};
};

export function MobileIndex() {
    const s = StyleSheet.create({
        boton: {
            backgroundColor: "var(--color-primario)",
            color: "white",
            padding: "1rem 5rem",
            borderRadius: "25px",
            margin: "1.5rem 0",
            boxShadow: "2px 2px 2px 0 gray",
            cursor: "pointer",
        },
        entrada: {
            borderTop: "none",
            borderRight: "none",
            borderLeft: "none",
            borderBottom: "solid 2px gray",
            padding: "0.75rem 1rem",
        },
    });
    const [msgErrorVisible, setMsgErrorVisible] = createSignal(false);

    const inputElement = <input required type="email" placeholder="Correo electronico" className={css(s.entrada)} />;

    const login = async(ev: Event) => {
        ev.preventDefault();
        const email = (inputElement as HTMLInputElement).value;
        const response = await mockLoginEmpty({correo_usuario: email});

        if (response === null) {
            setMsgErrorVisible(true);
            setTimeout(() => setMsgErrorVisible(false), 2500);
        } else if (response.matriculas.length === 0) {
            window.location.href = "#/seleccion-cursos/";
        } else if (response.matriculas.length > 0) {
            batch(() => {
                for (const id_lab of response.matriculas) {
                    setGruposSeleccionados(id_lab, true);
                }
            });
        }
    };

    return (
        <div className={css(e.contenedorGlobal)}>
            <div style="text-align: center;">
                <h1>Iniciar sesión</h1>
                <br />
                <br />
                <form onSubmit={(ev) => login(ev)}>
                    {inputElement}
                    <br />
                    <button type="submit" className={css(s.boton)}>Iniciar Sesion</button>
                </form>
                <span style={{opacity: msgErrorVisible() ? 1 : 0}}>El correo es invalido</span>
            </div>
        </div>
    );
}
