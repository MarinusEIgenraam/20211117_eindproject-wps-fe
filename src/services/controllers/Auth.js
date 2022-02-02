import axios from 'axios'

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

export const changePassword = async (setRegisterSucces, setIsLoading, setHasError, event) => {
    const token = localStorage.getItem('token');
    setHasError(false);
    setIsLoading(true)

    try {
        const response = await axios.put(`${REACT_APP_API_URL}users/password`,{
            oldPassword: event.oldPassword,
            newPassword: event.newPassword,
        }, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        });
        setIsLoading(false)
        setRegisterSucces(true)
        return response;
    } catch (err) {
        setHasError(true);
        console.error(err);
    }
}


