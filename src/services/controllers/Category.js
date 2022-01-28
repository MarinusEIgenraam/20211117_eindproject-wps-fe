import axios from 'axios'

const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;
const source = axios.CancelToken.source();


export const getCategories = async (setHasError, setIsLoading) => {
    setHasError(false);
    setIsLoading(true)
    try {
        return await axios.get(`${ REACT_APP_API_URL }categories/all`, { cancelToken: source.token, })
    } catch (e) {
        console.error(e);
        setHasError(true);
    }
    setIsLoading(false)
};
