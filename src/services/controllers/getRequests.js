import axios from 'axios'

const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;
const source = axios.CancelToken.source();

export const getOneProject = async (id) => {
    try {
        const result = await axios.get(`${ REACT_APP_API_URL }projects/${ id }`, {
            cancelToken: source.token
        });
        return result.data
    } catch (err) {
        console.error(err);
    }
}

export const getProjectsFor = async (what) => {
    try {
        const result = await axios.get(`${ REACT_APP_API_URL }projects/${ what }`, {
            cancelToken: source.token
        });
        return result.data
    } catch (err) {
        console.error(err);
    }
}


export const getProjectComments = async (id) => {
    try {
        const result = await axios.get(`${ REACT_APP_API_URL }comments?projectId=${ id }`, {
            cancelToken: source.token
        });
        return result.data
    } catch (err) {
        console.error(err);
    }
}
