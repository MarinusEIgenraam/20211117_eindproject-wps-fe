import axios from 'axios'

const { REACT_APP_API_URL, REACT_APP_AUTH } = process.env;

export const uploadImage = async (image) => {
    const data = new FormData()

    data.append("image", image)
    try {
        console.log(image)
        const response = await axios.post('https://api.imgur.com/3/image', data, {
            headers: {
                Authorization: "Client-ID da0e55c817cb308"
            },
        })
        console.log(response.data);
        return response.data.data.link
    } catch (err) {
        console.log(err);
    }
}

export const postProject = async (project) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(REACT_APP_API_URL + 'projects', project, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (err) {
        return err.response.data
    }
}