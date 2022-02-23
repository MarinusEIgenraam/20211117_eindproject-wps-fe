import axios from 'axios'


const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;
const source = axios.CancelToken.source();

export const postTask = async (utilityContext, task) => {
    const { setCreationCount, creationCount, setIsLoading, setHasError } = utilityContext;
    const token = localStorage.getItem('token');
    
    setHasError(false);
    setIsLoading(true);
    
    try {
        setIsLoading(true)
        return await axios.post(REACT_APP_API_URL + 'tasks', task, {
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

export const putTask = async (utilityContext, task, taskId) => {
    const { setCreationCount, creationCount, setIsLoading, setHasError } = utilityContext;
    const token = localStorage.getItem('token');
    
    setHasError(false);
    setIsLoading(true);
    
    try {
        setIsLoading(true)
        return await axios.put(REACT_APP_API_URL + `tasks/${ taskId }`, task, {
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

export const getTasksFor = async (utilityContext, pageable, user) => {
    const { setIsLoading, setHasError } = utilityContext;
    const token = localStorage.getItem('token');

    setHasError(false);
    setIsLoading(true);

    try {
        setIsLoading(true)
        return await axios.get(`${ REACT_APP_API_URL }tasks?taskOwner=${ user.username }`, {
            cancelToken: source.token,
            headers: {
                Authorization: `Bearer ${ token }`
            }
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
