import axios from 'axios'

const { REACT_APP_API_URL } = process.env;
const source = axios.CancelToken.source();

///////////////////////
//// Create

export const uploadImage = async (utilityContext, image) => {
    const { setCreationCount, creationCount, setIsLoading, setHasError } = utilityContext;

    setHasError(false);
    setIsLoading(true);

    const data = new FormData()
    data.append("image", image)
    try {
        return await axios.post('https://api.imgur.com/3/image', data, {
            headers: {
                Authorization: "Client-ID da0e55c817cb308"
            },
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

export const uploadProfileImage = async (utilityContext, file) => {
    const { setCreationCount, creationCount, setIsLoading, setHasError } = utilityContext;
    const token = localStorage.getItem('token');

    setHasError(false);
    setIsLoading(true);

    const formData = new FormData();
    formData.append('document', file)

    try {
        return await axios.post(`${ REACT_APP_API_URL }files`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${ token }`
            },
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


export const getProfileImage = async (utilityContext, username) => {
    const { setIsLoading, setHasError } = utilityContext;

    setHasError(false);
    setIsLoading(true)

    try {
        return await axios.get(`${ REACT_APP_API_URL }files/${username}/download`, {
            cancelToken: source.token,
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
