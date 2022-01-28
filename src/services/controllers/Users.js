import axios from 'axios'

const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;
const source = axios.CancelToken.source();

export const getOneUser = async (setHasError, setIsLoading, username) => {
    setHasError(false);
    setIsLoading(true)
    try {
        return await axios.get(`${ REACT_APP_API_URL }users/${ username }`, {
            cancelToken: source.token
        })
    } catch (e) {
        console.error(e);
        setHasError(true);
    }
    setIsLoading(false)
}

export const getUsers = async (setHasError, setIsLoading) => {
    setHasError(false);
    setIsLoading(true)
    try {
        return await axios.get(`${ REACT_APP_API_URL }users/`, { cancelToken: source.token, })
    } catch (e) {
        console.error(e);
        setHasError(true);
    }
    setIsLoading(false)
};
