import axios from 'axios'

const requester = async (method, url, data, signOut, history) => {
    console.log('biba1')
    const response = await axios({
        method,
        url,
        data,
        headers: {Authorization: JSON.parse(localStorage.getItem('tokens'))?.accessToken}
    })
    console.log('biba')

    if (response.data === 'token is timed out') {
        const tokens = await axios.post('http://localhost:3000/rtoken', {}, {
            headers: {Authorization: JSON.parse(localStorage.getItem('tokens'))?.refreshToken}
        })

        if(tokens.data === 'bad token') {
            signOut();
            return history.push('/login')
        }
        localStorage.setItem('tokens', JSON.stringify({
                                 accessToken: tokens.data.accessToken,
                                 refreshToken: tokens.data.refreshToken
                             }));
        await requester(method, url, data);
    }
    console.log(response.data)
    if(response.data !== 'bad token' && response.data !== 'token is timed out') return response;
}

export default requester;