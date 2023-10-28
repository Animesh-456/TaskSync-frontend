import axios from "axios"
const URL = 'http://localhost:4000';
const updateemployee = async (user) => {
  let usrstatus;
  const response = await axios.post(`${URL}/postemployeedetails`, user).then(resp => {
    usrstatus = resp
  }).catch(error => {
    console.log(error)
  })
  return usrstatus
}

export default updateemployee