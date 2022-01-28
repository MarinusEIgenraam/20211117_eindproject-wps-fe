import axios from 'axios'

const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;
const source = axios.CancelToken.source();


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
