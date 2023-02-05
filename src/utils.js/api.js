import axios from 'axios'
const api = ( METHOD, URL, BODY, OPTIONS) => {
    try {
        const response = axios({
            method: METHOD,
            url: URL,
            data: BODY,
            withCredentials: true
        })
        return response
    } 
    catch (error) {
        return error
    } 
}

export default api