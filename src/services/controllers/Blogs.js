import axios from 'axios'

const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;
const source = axios.CancelToken.source();

export const postBlog = async (setIsLoading, setHasError, blog) => {
    const token = localStorage.getItem('token');
    setHasError(false);
    setIsLoading(true)

    try {
        const response = await axios.post(REACT_APP_API_URL + 'blogs', blog, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
        setIsLoading(false)
        return response.data
    } catch (err) {
        console.error(err);
        setHasError(true);
    }
}

export const getOneBlog = async (setHasError, setIsLoading, id) => {
    setHasError(false);
    setIsLoading(true)
    try {
        const results =  await axios.get(`${ REACT_APP_API_URL }blogs/${ id }`, {
            cancelToken: source.token
        })
        setIsLoading(false);
        return results
    } catch (err) {
        setHasError(true);
        console.error(err);
    }
}

export const getBlogsFor = async (setIsLoading, setHasError, user) => {
    setHasError(false);
    setIsLoading(true)
    try {
        const response = await axios.get(`${ REACT_APP_API_URL }blogs?blogOwner=${ user.username }`, {
            cancelToken: source.token
        });
        setIsLoading(false)
        return response
    } catch (err) {
        console.error(err);
        setHasError(true);
    }
}

export const getBlogs = async (setIsLoading, setHasError, pageable) => {
    setHasError(false);
    setIsLoading(true)
    try {
        const response = await axios.get(`${ REACT_APP_API_URL }blogs${pageable}`, {
            cancelToken: source.token
        });
        setIsLoading(false)
        return response
    } catch (err) {
        console.error(err);
        setHasError(true);
    }
}