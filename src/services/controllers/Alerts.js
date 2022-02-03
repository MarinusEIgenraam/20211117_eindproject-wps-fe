import axios from 'axios'

const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;
const source = axios.CancelToken.source();

export const postAlert = async (setIsLoading, setHasError, alert) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(REACT_APP_API_URL + 'alerts', alert, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
        return response.data
    } catch (err) {
        return err.response.data
    }
}

export const deleteAlert = async (setIsLoading, setHasError, alertId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.delete(REACT_APP_API_URL + `alerts/${ alertId }`, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
        return response.data
    } catch (err) {
        return err.response.data
    }
}

export const getAlertsFor = async (setIsLoading, setHasError, user, sortingFilter) => {
    const token = localStorage.getItem('token');

    try {
        const result = await axios.get(`${ REACT_APP_API_URL }alerts?username=${ user.username }${sortingFilter}`, {
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
