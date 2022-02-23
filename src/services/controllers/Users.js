import axios from 'axios'

const { REACT_APP_API_URL } = process.env;
const source = axios.CancelToken.source();

export const getOneUser = async (utilityContext, username) => {
    const { setIsLoading, setHasError } = utilityContext;

    setHasError(false);
    setIsLoading(true);

    try {
        return await axios.get(`${ REACT_APP_API_URL }users/${ username }`, {
            cancelToken: source.token
        }).then(() => {
            setIsLoading(false)
        });
    } catch (err) {
        setIsLoading(false)
        setHasError(err);
        console.error(err);
    }
}

export const getUsers = async (utilityContext) => {
    const { setIsLoading, setHasError } = utilityContext;

    setHasError(false);
    setIsLoading(true)

    try {
        return await axios.get(`${ REACT_APP_API_URL }users/`,
            {
                cancelToken: source.token,
            }).then(() => {
            setIsLoading(false)
        });
    } catch (err) {
        setIsLoading(false)
        setHasError(err);
        console.error(err);
    }
}

export const getAdmins = async (utilityContext) => {
    const { setIsLoading, setHasError } = utilityContext;

    setHasError(false);
    setIsLoading(true)
    try {
        return await axios.get(`${ REACT_APP_API_URL }users?authority=ROLE_ADMIN`,
            {
                cancelToken: source.token,
            }).then(() => {
            setIsLoading(false)
        });
    } catch (err) {
        setIsLoading(false)
        setHasError(err);
        console.error(err);
    }
}
