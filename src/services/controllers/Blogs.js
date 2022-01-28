import axios from 'axios'

const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;
const source = axios.CancelToken.source();

export const postBlog = async (blog) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(REACT_APP_API_URL + 'blogs', blog, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (err) {
        return err.response.data
    }
}
