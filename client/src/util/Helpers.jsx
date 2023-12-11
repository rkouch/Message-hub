import { getAccessToken } from "../accessToken";

export async function fetchApi(method, url, body) {
    try {
        const accessToken = getAccessToken();
        const requestOptions = {
            method: method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: body === null ? null : JSON.stringify(body)
        }
    
        const response = await fetch(url, requestOptions);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}