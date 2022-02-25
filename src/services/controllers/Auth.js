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
            setCreationCount(creationCount + 1)
        });
    } catch (err) {
        setIsLoading(false)
        setHasError(err);
        console.error(err);
    }
}


export const loginUser = async (utilityContext, login, event) => {
    const { setIsLoading, setHasError } = utilityContext;

    setHasError(false);
    setIsLoading(true)

    try {
        return await axios.post(REACT_APP_AUTH, {
            username: event.username,
            password: event.password,
        }, {}).then((response) => {
            setIsLoading(false)
            login(response.data.jwt)

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
        return await axios.patch(`${ REACT_APP_API_URL }users/password`, {
            oldPassword: event.oldPassword,
            newPassword: event.newPassword,
        }, {
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


export async function fetchUserData(utilityContext, navigate, toggleIsAuth, isAuth, username, token, redirectUrl) {
    const { setIsLoading, setHasError } = utilityContext;

    setHasError(false);
    setIsLoading(true);

    try {
        return await axios.get(`${ REACT_APP_API_URL }users/${ username }`, {
            cancelToken: source.token,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ token }`,
            },
        }).then((response) => {

            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    authorities: setRole(response.data.authorities),
                    enabled: response.data.enabled
                },
                status: 'done',
            })
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
