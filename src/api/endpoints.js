import axios from 'axios';
import axiosInstance from './auth';

export const getUser = async (userId) => {
    const userdata = localStorage.getItem('empdetails');
    const token = JSON.parse(userdata);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
    let resp = await axiosInstance.get(`/getempdetails`, { params: userId });

    console.log("response from endpoints:- ", resp?.status)
    if (resp?.status == 500) {
        localStorage.removeItem("empdetails")
        window.location.href = "/login"
    }
    return resp
};

export const viewTasks = async (userId, status) => {
    const userdata = localStorage.getItem('empdetails');
    const token = JSON.parse(userdata);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
    let resp = await axiosInstance.get(`/task/viewtasks`, { params: { id: userId, status: status } });
    if (resp?.status == 500) {
        localStorage.removeItem("empdetails")
        window.location.href = "/login"
    }
    return resp
};


export const viewTasksUnassigned = async (userId) => {
    const userdata = localStorage.getItem('empdetails');
    const token = JSON.parse(userdata);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
    let resp = await axiosInstance.get(`/task/viewtasks-unassigned`, { params: { id: userId } });
    if (resp?.status == 500) {
        localStorage.removeItem("empdetails")
        window.location.href = "/login"
    }
    return resp
};



export const viewTasksAssigned = async (userId) => {
    const userdata = localStorage.getItem('empdetails');
    const token = JSON.parse(userdata);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
    let resp = await axiosInstance.get(`/task//viewtasks-assigned`, { params: { id: userId } });
    if (resp?.status == 500) {
        localStorage.removeItem("empdetails")
        window.location.href = "/login"
    }
    return resp
};


export const recentTasks = async (userId) => {
    const userdata = localStorage.getItem('empdetails');
    const token = JSON.parse(userdata);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
    let resp = await axiosInstance.get(`/task/recent-tasks`, { params: { id: userId } });
    if (resp?.status == 500) {
        localStorage.removeItem("empdetails")
        window.location.href = "/login"
    }
    return resp
};



export const createdrecentTasks = async (userId) => {
    const userdata = localStorage.getItem('empdetails');
    const token = JSON.parse(userdata);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
    let resp = await axiosInstance.get(`/task/created-recent-tasks`, { params: { id: userId } });
    if (resp?.status == 500) {
        localStorage.removeItem("empdetails")
        window.location.href = "/login"
    }
    return resp
};



export const markdone = (id) => {
    let resp = axiosInstance.post(`/task/markdone`, { params: id });
    return resp
}

export const viewtaskID = async (id) => {
    const userdata = localStorage.getItem('empdetails');
    const token = JSON.parse(userdata);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
    let resp = await axiosInstance.get(`/task/viewtaskbyid`, { params: { id: id } });
    if (resp?.status == 500) {
        localStorage.removeItem("empdetails")
        window.location.href = "/login"
    }
    return resp
};


export const updateemployee = (user) => {
    let resp = axiosInstance.post(`/postemployeedetails`, user);
    return resp
}


export const addtask = (body) => {
    let resp = axiosInstance.post(`/task/addtask`, body);
    return resp
}


export const searchusers = async (user) => {

    console.log("frontend search querry", user)
    let resp = await axiosInstance.get(`/searchusers/?q=${user}`);
    return resp
}


export const assignTask = (a, b) => {
    let resp = axiosInstance.post(`/task/assigntask`, { id: b, assignedTo: a });
    return resp
}

