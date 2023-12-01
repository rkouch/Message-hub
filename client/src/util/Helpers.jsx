export async function fetchApi(method, url, body) {
    try {
        const requestOptions = {
            method: method,
            headers: {
                "Content-Type": "application/json"
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