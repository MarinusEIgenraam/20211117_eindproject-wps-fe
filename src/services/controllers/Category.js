import axios from 'axios'

const { REACT_APP_API_URL } = process.env;
const source = axios.CancelToken.source();


export const getCategories = async (utilityContext, pageable) => {
    const { setIsLoading, setHasError } = utilityContext;

    setHasError(false);
    setIsLoading(true)

    try {
        return await axios.get(`${ REACT_APP_API_URL }categories/all`, { cancelToken: source.token,
        }).then((response) => {
            setIsLoading(false)
            return response
        });
    } catch (err) {
        setIsLoading(false)
        setHasError(err);
        console.error(err);
    }
}
