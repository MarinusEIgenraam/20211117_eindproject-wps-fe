import axios from 'axios'
import { setRole } from "../helpers/filters";

const { REACT_APP_AUTH_REGISTER, REACT_APP_AUTH, REACT_APP_API_URL } = process.env;
const source = axios.CancelToken.source();

export const registerUser = async (navigate, setRegisterSucces, setHasError, setIsLoading, event) => {
    setHasError(false);
    setIsLoading(true)
    setRegisterSucces(false)

    try {
        const response = await axios.post(REACT_APP_AUTH_REGISTER, {
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

        });
        return response.data.data.link
    } catch (err) {
        setHasError(true);
        console.error(err);
    }
}

export const loginUser = async (login, setIsLoading, setHasError, event) => {
    setHasError(false);
    setIsLoading(true)

    try {
        const response = await axios.post(REACT_APP_AUTH, {
            username: event.username,
            password: event.password,
        }, {});
        login(response.data.jwt);
        setIsLoading(false)
    } catch (err) {
        setHasError(true);
        console.error(err);
    }
}

export const changePassword = async (setCreationCount, setRegisterSucces, setIsLoading, setHasError, event) => {
    const token = localStorage.getItem('token');
    setHasError(false);
    setIsLoading(true)

    try {
        const response = await axios.put(`${ REACT_APP_API_URL }users/password`, {
            oldPassword: event.oldPassword,
            newPassword: event.newPassword,
        }, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        });
        setIsLoading(false)
        setRegisterSucces(true)
        setCreationCount(+1)

        return response;
    } catch (err) {
        setHasError(true);
        console.error(err);
    }
}


export async function fetchUserData(navigate, setHasError, setIsLoading, toggleIsAuth, isAuth, username, token, redirectUrl) {
    setHasError(false);
    setIsLoading(true);

    try {
        const result = await axios.get(`${ REACT_APP_API_URL }users/${ username }`, {
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
        });

        if (redirectUrl) {
            navigate(redirectUrl);
        }
        setIsLoading(false);

    } catch (e) {
        console.error(e);
        setHasError(true);
        toggleIsAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });
    }
}
