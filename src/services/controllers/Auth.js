import axios from 'axios'
import { setRole } from "../helpers/filters";

const { REACT_APP_AUTH_REGISTER, REACT_APP_AUTH, REACT_APP_API_URL } = process.env;
const source = axios.CancelToken.source();

export const registerUser = async (utilityContext, navigate, setRegisterSucces, event) => {
    const { setCreationCount, creationCount, setIsLoading, setHasError } = utilityContext;

    setHasError(false);
    setIsLoading(true)
    setRegisterSucces(false)

    try {
        return await axios.post(REACT_APP_AUTH_REGISTER, {
            username: event.username,
            password: event.password,
            email: event.email,
        }, {}).then(() => {
            setRegisterSucces(true)
            setIsLoading(false)
            setTimeout(() => {
                setRegisterSucces(false)
                navigate('/', { replace: false })
            }, 4000);
        }).then(() => {
            setIsLoading(false)
            setRegisterSucces(true)
            setCreationCount(creationCount +1)
        });
    } catch (err) {
        setIsLoading(false)
        setHasError(err);
        console.error(err);
    }
}


export const loginUser = async ( utilityContext, login, event) => {
    const { setIsLoading, setHasError } = utilityContext;

    setHasError(false);
    setIsLoading(true)

    try {
        const response =  await axios.post(REACT_APP_AUTH, {
            username: event.username,
            password: event.password,
        }, {

        }).then(() => {
            login(response.data.jwt);
            setIsLoading(false)
        });
    } catch (err) {
        setIsLoading(false)
        setHasError(err);
        console.error(err);
    }
}

export const changePassword = async (utilityContext, event) => {
    const { setCreationCount, creationCount, setIsLoading, setHasError } = utilityContext;
    const token = localStorage.getItem('token');

    setHasError(false);
    setIsLoading(true);

    try {
        return await axios.put(`${ REACT_APP_API_URL }users/password`, {
            oldPassword: event.oldPassword,
            newPassword: event.newPassword,
        }, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        }).then(() => {
            setIsLoading(false)
        });
    } catch (err) {
        setIsLoading(false)
        setHasError(err);
        console.error(err);
    }
}


export async function fetchUserData(utilityContext, navigate, toggleIsAuth, isAuth, username, token, redirectUrl) {
    const { setIsLoading, setHasError } = utilityContext;

    setHasError(false);
    setIsLoading(true);

    try {
        const result = await axios.get(`${ REACT_APP_API_URL }users/${ username }`, {
            cancelToken: source.token,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ token }`,
            },
        });

        toggleIsAuth({
            ...isAuth,
            isAuth: true,
            user: {
                username: result.data.username,
                email: result.data.email,
                authorities: setRole(result.data.authorities),
                enabled: result.data.enabled
            },
            status: 'done',
        }).then(() => {
            setIsLoading(false)
            if (redirectUrl) {
                navigate(redirectUrl);
            }
        });
    } catch (err) {
        setIsLoading(false)
        setHasError(err);
        console.error(err);
        toggleIsAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });
    }
}
