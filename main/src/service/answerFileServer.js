import axios from 'axios'

const baseURL = 'http://localhost:3001';

const fetchAnswers = async () => {
    try {
        const response = await axios.get(baseURL);
        console.log("fetchAnswers->response", response);
        console.log(response.data)
        return (response.data);
    }
    catch {
        console.log("cant find server")
        return [];
    }
}

const getFile = async (filename) => {
    console.log("getFile", filename)
    console.log("filename", `${baseURL}/${filename}`)
    try {
        const response = await axios.get(`${baseURL}/${filename}`)
        return response.data
    }
    catch {
        console.log("axios messed up")
        return []
    }
}

const deleteFile = async (filename) => {
    console.log("answerFileServer->deleteFile");
    try{
        const response = await axios.delete(`${baseURL}/${filename}`)
        console.log("response", response);
        return response
    }
    catch (e) {
        console.log("axios messed up", e.message)
         return {"status": 400}
    }
}

const answerFileServer = {fetchAnswers, deleteFile, getFile};

export default answerFileServer;