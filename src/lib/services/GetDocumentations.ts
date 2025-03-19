import GetToken from './auth/GetToken'

export const GetDocs = async () => {
    const token = await GetToken();
    try{
        const res = await fetch('http://localhost:8000/api/user_documentations', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json();
        return data.data.docs;
    } catch(error) {
        console.log(error)
    }
}
