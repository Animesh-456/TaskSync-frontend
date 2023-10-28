// import axios from 'axios';
// const URL = 'http://localhost:4000';
// const auth = async (user) => {

//     let res;

//     const userdata = localStorage.getItem('empdetails');
//     const token = JSON.parse(userdata);
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
//     await axios.get(`${URL}/getempdetails`, { params: user })
//         .then(response => {
//             console.log("The stat is ", response.status)
//             if (response.status == 500) {
//                 localStorage.removeItem("empdetails")
//                 window.location.href = "/login"
//             }
//             res = response
//         })
//         .catch(error => {
//             return error
//         });
//     return res.data
// }

// export default auth


import axios from 'axios';
//Create an instance of Axios with custom configurations
const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000', // Replace with your API base URL
    timeout: 5000, // Set a timeout for API requests (optional)
});

export default axiosInstance;