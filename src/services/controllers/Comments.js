import axios from 'axios'

const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;
const source = axios.CancelToken.source();


export const getProjectComments = async (setIsLoading, setHasError, id) => {
    setHasError(false);
    setIsLoading(true)
    try {
        const results = await axios.get(`${ REACT_APP_API_URL }comments?projectId=${ id }`, {
            cancelToken: source.token
        });
        setIsLoading(false);
        return results
    } catch (err) {
        setHasError(true);
        console.error(err);
    }
}

export const postComment = async (setIsLoading, setHasError, comment) => {
    const token = localStorage.getItem('token');
    setHasError(false);
    setIsLoading(true)
    try {
        const response = await axios.post(REACT_APP_API_URL + 'comments', comment, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
        setIsLoading(false);
        return response
    } catch (err) {
        setHasError(true);
        console.error(err);
    }
}