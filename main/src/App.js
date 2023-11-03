//import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"

import { useEffect, useState } from 'react';
import answerFileServer from './service/answerFileServer'
import ProcessFile from './components/processFile'

const Home = ({files, deleteFile}) => {
  console.log("home")

  return (
    <div>
      <h1>Current Surveys</h1>
      <ul>
        {files.map((file, index) => 
          <li key={index}>
            <Link to={`/${file}`}>{file.split(".")[0]}</Link>
            <a href="#" onClick={() => deleteFile(file)}>
              <img className='cancel' src="cancel.png" alt="delete file"/>
            </a>
          </li>)}
      </ul>
    </div>
  )
}

function App() {
   const [answerFiles, setAnswerFiles] = useState([])

  useEffect(() => {
    document.title = '3Q6S Processing';
  }, []);

  useEffect(() => {
    console.log("useEffect")
    const getAnswers = async () => {
      const response = await answerFileServer.fetchAnswers()
      setAnswerFiles(response);
    }
    getAnswers();
  }, [])

  const deleteFile = async (file) => {
    console.log("app->deleteFile", file)
    const response = await answerFileServer.deleteFile(file)
    console.log("deleteFile->response", response)
    if (response.status === 200) {
      setAnswerFiles((answerFiles) => answerFiles.filter((item) => {
        return item !== file
      }), file)
    }
  }

  return (
      <div className="App">
        <header className="App-header">
          <h1>3Q6S Results Processing</h1>
        </header>
        <div className='answers'>
          {answerFiles.length === 0 ?
            <h2>No Surveys Found</h2>
            : 
            <Router>
              <Routes>
                <Route path='/:filename' element={<ProcessFile deleteFile={deleteFile}/>} />
                <Route path="/" forceRefresh={true} element={<Home files={answerFiles} deleteFile={deleteFile} />}></Route>
              </Routes>
            </Router>
          }
        </div>
      </div>
  );
}

export default App;
