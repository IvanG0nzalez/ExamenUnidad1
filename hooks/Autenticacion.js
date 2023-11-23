import { enviar, enviar_censo } from "./Conexion";
import { getToken, save, saveToken } from "./SessionUtil";
export async function inicio_sesion(data) {
    const sesion = await enviar('examen.php', data);
    console.log("en auth", sesion);
    if (sesion && sesion && sesion.code === 200 && sesion.info.code) {
        saveToken(sesion.info.code);
        save('dni', sesion.info.dni);
        save('userExternal', sesion.info.external);
    }
    return sesion;
}

export async function registrar_censo(data){
    const token = getToken();
    const response = await enviar_censo('examen.php', data, token);
    return response;
}