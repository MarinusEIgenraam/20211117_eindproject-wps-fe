import axios from 'axios'

const { REACT_APP_API_URL } = process.env;
const source = axios.CancelToken.source();

export const postProject = async (utilityContext, project) => {
    const { setCreationCount, creationCount, setIsLoading, setHasError } = utilityContext;
    const token = localStorage.getItem('token');

    setHasError(false);
    setIsLoading(true);

    try {
        return await axios.post(REACT_APP_API_URL + 'projects', project, {
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


export const getOneProject = async (utilityContext, id) => {
    const { setIsLoading, setHasError } = utilityContext;

    setHasError(false);
    setIsLoading(true)

    try {
        return await axios.get(`${ REACT_APP_API_URL }projects/${ id }`, {
            cancelToken: source.token
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


export const getProjectsFor = async (utilityContext, pageable) => {
    const { setIsLoading, setHasError } = utilityContext;

    setHasError(false);
    setIsLoading(true)

    try {
        return await axios.get(`${ REACT_APP_API_URL }projects${ pageable }`, {
            cancelToken: source.token
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


export const getProjectComments = async (utilityContext, pageable, id) => {
    const { setIsLoading, setHasError } = utilityContext;

    setHasError(false);
    setIsLoading(true);

    try {
        return await axios.get(`${ REACT_APP_API_URL }comments?projectId=${ id }`, {
            cancelToken: source.token
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
