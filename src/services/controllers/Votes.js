import axios from 'axios'

const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;
const source = axios.CancelToken.source();

export const projectVote = async (setIsLoading, setHasError, vote) => {
    const token = localStorage.getItem('token');
    setHasError(false);
    setIsLoading(true)
    try {
        const response = await axios.post(REACT_APP_API_URL + `votes`, vote, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
        return response.data
    } catch (e) {
        console.error(e);
        setHasError(true);
    }
    setIsLoading(false)
}