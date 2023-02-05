import axios from "axios"

export const authMiddleware = async (userId, accessToken) => {
    try {
        const user = await axios.get(`http://localhost:5000/api/v1/users/${userId}`, {withCredentials: true})
    } catch (error) {
        console.log(error);
    }
    if(true) {

        return true
    }
    else {
        return false
    }
}

