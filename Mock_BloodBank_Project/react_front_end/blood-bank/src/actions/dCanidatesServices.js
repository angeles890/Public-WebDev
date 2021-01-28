import axios from 'axios';


const baseURL = "http://localhost:60692/api/";

export default {
    dCanidate(url = baseURL + 'donorcanidate/')
    { 
        return {
            fetchAll: () => axios.get(url), 
            fetchByID: id => axios.get(url + id), 
            create: newRecord => axios.post(url,newRecord), 
            update: (id, updateRecord) => axios.put(url + id, updateRecord), 
            delete: id => axios.delete(url + id)   
        }
    }
}