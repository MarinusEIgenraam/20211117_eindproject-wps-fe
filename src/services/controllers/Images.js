import axios from 'axios'

const { REACT_APP_API_URL } = process.env;
const source = axios.CancelToken.source();

export const uploadImage = async (setCreationCount, creationCount, setHasError, setIsLoading, image) => {
    setHasError(false);
    setIsLoading(true)

    const data = new FormData()
    data.append("image", image)
    try {
        const response = await axios.post('https://api.imgur.com/3/image', data, {
            headers: {
                Authorization: "Client-ID da0e55c817cb308"
            },
        })
        setIsLoading(false)
        setCreationCount(creationCount+1)
        return response.data.data.link
    } catch (e) {
        setIsLoading(false)
        setHasError(e);
        console.error(e);
    }
}

export const getProfileImage = async (setCreationCount, creationCount, setHasError, setIsLoading, username) => {
    setHasError(false);
    setIsLoading(true)

    try {
        const result = await axios.get(`${ REACT_APP_API_URL }files/${username}/download`, {
            cancelToken: source.token,
        })
        setIsLoading(false)
        return result
    } catch (e) {
        setIsLoading(false)
        setHasError(e);
        console.error(e);
    }
}

export const uploadProfileImage = async (setCreationCount, creationCount, setHasError, setIsLoading, file) => {
    const token = localStorage.getItem('token');
    setHasError(false);
    setIsLoading(true)

    const formData = new FormData();
    formData.append('document', file)

    try {
        const response = await axios.post(`${ REACT_APP_API_URL }files`, formData, {
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${ token }` },

        })
        setIsLoading(false)
        setCreationCount(creationCount+1)
        return response
    } catch (e) {
        setIsLoading(false)
        setHasError(e);
        console.error(e);
    }
}