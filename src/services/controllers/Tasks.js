import axios from 'axios'

const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;
const source = axios.CancelToken.source();

export const postTask = async (task) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(REACT_APP_API_URL + 'tasks', task, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (err) {
        return err.response.data
    }
}

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

export const getTasksFor = async (token, user) => {
    try {
        const result = await axios.get(`${ REACT_APP_API_URL }tasks?taskOwner=${ user.username }`, {
            cancelToken: source.token,
            headers: {
                Authorization: `Bearer ${ token }`
            }
        });

        return result.data
    } catch (err) {
        console.error(err);
    }
}
