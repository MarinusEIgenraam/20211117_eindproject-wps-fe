import axios from 'axios'

const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;
const source = axios.CancelToken.source();

export const projectVote = async (utilityContext, vote) => {
    const { setCreationCount, creationCount, setIsLoading, setHasError } = utilityContext;
    const token = localStorage.getItem('token');

    setHasError(false);
    setIsLoading(true);

    try {
        return await axios.post(REACT_APP_API_URL + `votes`, vote, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        }).then((response) => {
            setIsLoading(false)
            setCreationCount(creationCount + 1)
            return response
        });
    } catch (err) {
        setIsLoading(false)
        setHasError(err);
        console.error(err);
    }
}
