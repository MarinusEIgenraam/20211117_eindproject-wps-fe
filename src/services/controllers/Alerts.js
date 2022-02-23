import axios from 'axios'

const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;
const source = axios.CancelToken.source();

export const postAlert = async (utilityContext, alert) => {
    const { setCreationCount, creationCount, setIsLoading, setHasError } = utilityContext;
    const token = localStorage.getItem('token');

    setHasError(false);
    setIsLoading(true);

    try {
        return await axios.post(REACT_APP_API_URL + 'alerts', alert, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        }).then(() => {
            setIsLoading(false)
            setCreationCount(creationCount +1)
        });
    } catch (err) {
        setIsLoading(false)
        setHasError(err);
        console.error(err);
    }
}

export const deleteAlert = async (utilityContext, alertId) => {
    const { setCreationCount, creationCount, setIsLoading, setHasError } = utilityContext;
    const token = localStorage.getItem('token');

    setHasError(false);
    setIsLoading(true);

    try {
        return await axios.delete(REACT_APP_API_URL + `alerts/${ alertId }`, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        }).then(() => {
            setIsLoading(false)
            setCreationCount(creationCount +1)
        });
    } catch (err) {
        setIsLoading(false)
        setHasError(err);
        console.error(err);
    }
}

export const getAlertsFor = async (utilityContext, user, sortingFilter) => {
    const token = localStorage.getItem('token');
    const { setIsLoading, setHasError } = utilityContext;

    setHasError(false);
    setIsLoading(true)

    try {
        return await axios.get(`${ REACT_APP_API_URL }alerts?username=${ user.username }${sortingFilter}`, {
            cancelToken: source.token,
            headers: {
                Authorization: `Bearer ${ token }`
            }
        }).then(() => {
            setIsLoading(false)
        });
    } catch (err) {
        setIsLoading(false)
        setHasError(err);
        console.error(err);
    }
}
