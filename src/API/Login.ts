import { SERVER_PATH } from "../Store";

type IdLaboratorio = number;
type LoginData = {correo_usuario: string};
type LoginResponse = Promise<{matriculas: Array<IdLaboratorio>} | null>;
export type LoginFunction = (data: LoginData) => LoginResponse;

// Mock for a login without courses
export const mockLoginEmpty: LoginFunction = async(data) => ({matriculas: []});

// Mock for a login with courses
export const mockLoginNotEmpty: LoginFunction = async(_) => ({
    matriculas: [0, 1, 2, 3],
});

// Error login mock
export const mockLoginWithError: LoginFunction = async(_) => null;

// Standard login
export const loginFn: LoginFunction = async(data) => {
    const petition = await fetch(`${SERVER_PATH}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            correo_usuario: data.correo_usuario,
        }),
    });
    if (!petition.ok) return null;
    return await petition.json() as {matriculas: Array<IdLaboratorio>};
};

