import axios from "axios";
import Auth from "./Auth";

export default {
  login: userData =>
    axios.post("/auth/login", userData),

  signUp: userData =>
    axios.post('/auth/signup', userData),
  dashboard: token =>
    axios.get('/api/dashboard', { headers: { Authorization: `bearer ${token}` } }),

  getUser: function () {
    const token = Auth.getToken();
    return axios.get('/api/getUser', { headers: { Authorization: `bearer ${token}` } })
  },

  getTasks: function () {
    const token = Auth.getToken();
    return axios.get("/api/task", { headers: { Authorization: `bearer ${token}` } });
  },
  getSubscriptions: function () {
    const token = Auth.getToken();
    return axios.get("/api/subscriptions", { headers: { Authorization: `bearer ${token}` } });

  },

  getTimers: function () {
    const token = Auth.getToken();
    return axios.get("/api/timers", { headers: { Authorization: `bearer ${token}` } });

  },

  // Gets the task with the given id
  getTask: function (id) {
    
    const token = Auth.getToken();
    const options = {
      method: 'GET',
      headers: { 'Authorization': `bearer ${token}` },
      url: '/api/task/' + id
    };
    
    return axios(options);
  },

  updateTask: function (id, count) {
    const token = Auth.getToken();
    const options = {
      method: 'PUT',
      headers: { 'Authorization': `bearer ${token}` },
      url: '/api/task/' + id + "/" + count
    };
    return axios(options);
  },

  // Deletes the task with the given id
  deleteTask: function (id) {
    console.log(id);
    const token = Auth.getToken();
    return axios.delete("/api/task/" + id, { headers: { Authorization: `bearer ${token}` } });
  },

  unsubscribe: function (id) {
    // console.log(id);
    const token = Auth.getToken();
    return axios.delete("/api/subscriptions/" + id, { headers: { Authorization: `bearer ${token}` } });
  },
  
  // Saves a task to the database
  saveTask: function (taskData) {
    // console.log(taskData);
    const token = Auth.getToken();
    return axios.post("/api/task", taskData, { headers: { Authorization: `bearer ${token}` } });
  },

  subscribe: function (taskData) {
    // console.log(taskData);
    const token = Auth.getToken();
    return axios.post("/api/subscriptions", taskData, { headers: { Authorization: `bearer ${token}` } });
  },
};
