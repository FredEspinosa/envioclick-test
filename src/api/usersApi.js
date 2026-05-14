import axios from "axios";

const BASE_URL = "https://randomuser.me/api";

export const getUsers = async () => {
    // HAcemos la solicitud de la api
    const response = await axios.get( `${BASE_URL}/?results=30`);

    return response.data.results;    //devolvemos la data de los usuarios
}