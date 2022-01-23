import axios from 'axios'

const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;

export const putTask = async (task, taskId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.put(REACT_APP_API_URL + `tasks/${taskId}`, task, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (err) {
        return err.response.data
    }
}