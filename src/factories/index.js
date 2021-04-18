import axios from 'axios'

const requester = async (method, url, data, signOut, history) => {
    try {
        const response = await axios({
            method,
            url,
            data,
            headers: { Authorization: JSON.parse(localStorage.getItem('tokens'))?.accessToken }
        })
        console.log(1);
        return response.data;
    } catch (e) {
        console.log(2);
        try {
            const tokens = await axios.post('http://localhost:3000/rtoken', {}, {
                headers: { Authorization: JSON.parse(localStorage.getItem('tokens'))?.refreshToken }
            })
            localStorage.setItem('tokens', JSON.stringify({
                accessToken: tokens.data.accessToken,
                refreshToken: tokens.data.refreshToken
            }));
            console.log(3);
        } catch (e) {
            signOut();
            return history.push('/login')
        }
    }
    try {
        const response = await axios({
            method,
            url,
            data,
            headers: { Authorization: JSON.parse(localStorage.getItem('tokens'))?.accessToken }
        })
        return response.data;
    } catch (e) {
        console.log(e)
    }
}

export default requester;