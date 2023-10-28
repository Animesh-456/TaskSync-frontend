import axios from "axios"
const URL = 'http://localhost:4000';
const login = async (user) => {
    let usrstatus;
    const response = await axios.post(`${URL}/login`, user).then(resp => {
        usrstatus = JSON.stringify(resp.data.resp);
        let data = JSON.stringify(resp.data.usr);
        if (resp.data.resp == true) {
            let obj = {
                id: `${String(resp.data.usr._id)}`,
                fname: `${String(resp.data.usr.fname)}`,
                lname: `${String(resp.data.usr.lname)}`,
                email: `${String(resp.data.usr.email)}`,
                account_type: `${String(resp.data.usr.account_type)}`,
                token: `${String(resp.data.token)}`
            }
            localStorage.setItem("empdetails", JSON.stringify(obj))
        }
    }).catch(error => {
        console.log(error)
    })
    return usrstatus
}

export default login