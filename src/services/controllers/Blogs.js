import axios from 'axios'

const { REACT_APP_API_URL } = process.env;
const source = axios.CancelToken.source();

export const postBlog = async (utilityContext, blog) => {
    const { setCreationCount, creationCount, setIsLoading, setHasError } = utilityContext;
    const token = localStorage.getItem('token');

    setHasError(false);
    setIsLoading(true);

    try {
        return await axios.post(REACT_APP_API_URL + 'blogs', blog, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        }).then((response) => {
            setIsLoading(false)
            setCreationCount(creationCount + 1)
            return response
        });
    } catch (err) {
        console.error(err);
        setHasError(true);
    }
}

export const getOneBlog = async (utilityContext, id) => {
    const { setIsLoading, setHasError } = utilityContext;

    setHasError(false);
    setIsLoading(true);

    try {
        return await axios.get(`${ REACT_APP_API_URL }blogs/${ id }`,
            {
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

export const getBlogsFor = async (utilityContext, username) => {
    const { setIsLoading, setHasError } = utilityContext;

    setHasError(false);
    setIsLoading(true);

    try {
        return await axios.get(`${ REACT_APP_API_URL }blogs?blogOwner=${username}`, {
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


export const getBlogs = async (utilityContext, pageable) => {
    const { setIsLoading, setHasError } = utilityContext;

    setHasError(false);
    setIsLoading(true);

    try {
        return await axios.get(`${ REACT_APP_API_URL }blogs${ pageable }`, {
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