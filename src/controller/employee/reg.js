import axios from "axios"
const URL = 'http://localhost:4000';
const add = async (user) => {
    let resp = 500
    const response = await axios.post(`${URL}/register`, user).then(response => {
        if (response.status == 201) {
            resp = 201
            let usr = JSON.stringify(user);
            localStorage.setItem("empdetails", usr)
        }
    }).catch(error => {
        console.log(error)
    })
    return resp
}

export default add