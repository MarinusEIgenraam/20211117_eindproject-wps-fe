import axios from 'axios'

const { REACT_APP_API_URL } = process.env;
const source = axios.CancelToken.source();

export const postProject = async (setHasError, setIsLoading, project) => {
    const token = localStorage.getItem('token');
    setHasError(false);
    setIsLoading(true)
    try {
        return await axios.post(REACT_APP_API_URL + 'projects', project, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        }).then(() => {
            setIsLoading(false)
        });

    } catch (err) {
        setHasError(true);
        console.error(err);
    }
};


export const getOneProject = async (setHasError, setIsLoading, id) => {
    setHasError(false);
    setIsLoading(true)
    try {
        const results =  await axios.get(`${ REACT_APP_API_URL }projects/${ id }`, {
            cancelToken: source.token
        })
        setIsLoading(false);
        return results
    } catch (err) {
        setHasError(true);
        console.error(err);
    }
}

export const getProjectsFor = async (setHasError, setIsLoading, what) => {
    setHasError(false);
    setIsLoading(true)
    try {
        const results = await axios.get(`${ REACT_APP_API_URL }projects/${ what }`, {
            cancelToken: source.token
        });
        setIsLoading(false)
        return results
    } catch (err) {
        setHasError(true);
        console.error(err);
    }
}

export const getProjectComments = async (setHasError, setIsLoading, id) => {
    setHasError(false);
    setIsLoading(true)
    try {
        return await axios.get(`${ REACT_APP_API_URL }comments?projectId=${ id }`, {
            cancelToken: source.token
        }).then(() => {
            setIsLoading(false)
        });
    } catch (err) {
        setHasError(true);
        console.error(err);
    }
}