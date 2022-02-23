import axios from 'axios'

const { REACT_APP_API_URL } = process.env;
const source = axios.CancelToken.source();


export const getProjectComments = async (utilityContext, pageable, id) => {
    const { setIsLoading, setHasError } = utilityContext;

    setHasError(false);
    setIsLoading(true);

    try {
        return await axios.get(`${ REACT_APP_API_URL }comments?parentProjectId=${ id }${pageable}`, {
            cancelToken: source.token
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


export const getBlogComments = async (utilityContext,pageable, loadCount, id) => {
    const { setIsLoading, setHasError } = utilityContext;

    setHasError(false);
    setIsLoading(true);

    try {
        return await axios.get(`${ REACT_APP_API_URL }comments?parentBlogId=${ id }&page=0&size=${loadCount}`, {
            cancelToken: source.token
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


export const postComment = async (utilityContext, comment) => {
    const { setCreationCount, creationCount, setIsLoading, setHasError } = utilityContext;
    const token = localStorage.getItem('token');

    setHasError(false);
    setIsLoading(true);

    try {
        return await axios.post(REACT_APP_API_URL + 'comments', comment, {
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
