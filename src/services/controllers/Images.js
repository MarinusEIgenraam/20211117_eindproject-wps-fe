import axios from 'axios'

const { REACT_APP_API_URL } = process.env;
const source = axios.CancelToken.source();

export const uploadImage = async (setHasError, setIsLoading, image) => {
    setHasError(false);
    setIsLoading(true)

    const data = new FormData()
    data.append("image", image)
    try {
        const response = await axios.post('https://api.imgur.com/3/image', data, {
            headers: {
                Authorization: "Client-ID da0e55c817cb308"
            },
        }).then(() => {
            setIsLoading(false)
        });
        return response.data.data.link
    } catch (err) {
        setHasError(true);
        console.error(err);
    }
}

export const getProfileImage = async (setHasError, setIsLoading, username) => {
    setHasError(false);
    setIsLoading(true)

    try {
        const result = await axios.get(`${ REACT_APP_API_URL }files/profile/${ username }`, {
            cancelToken: source.token
        }).then(() => {
            setIsLoading(false)
        });
        return result
    } catch (err) {
        setHasError(true);
        console.error(err);
    }
}

export const uploadProfileImage = async (setHasError, setIsLoading, file) => {
    setHasError(false);
    setIsLoading(true)

    const formData = new FormData();
    formData.append('document', file)

    try {
        console.log(file)
        const response = await axios.post(`${ REACT_APP_API_URL }files`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }).then(() => {
            setIsLoading(false)
        });
        return response
    } catch (err) {
        setHasError(true);
        console.error(err);
    }
}