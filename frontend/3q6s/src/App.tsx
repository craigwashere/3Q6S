import React, { useState } from 'react';
import './App.css';

import QandAService from './services/QandAService';
import { Question, Rating, Section, Sections, valuesInterface } from './types';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Home from "./components/Home"
import Thanks from "./components/Thanks"

const App: React.FC = () => {
  console.log("App")
  const [Sections2, setSections]  = useState<Section[]>([])
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string>("")

  
  React.useEffect(() => {
    document.title = '3Q6S Survey';
  }, []);
  
  React.useEffect(() => {
    let tempSections:Sections = {};
    console.log("useEffect")
    const fetchQuestions = async () => {
      var QsandAs: Array<Section> = [];
      var questions:Question[] = [];
      try {
        const response = await QandAService.getQuestions();
        console.log("useEffect->response", response);
        if (response.status === 200)
          questions = response.data;
        else{
          setErrorMessage(response.text);
          return;
        }
      }
      catch (e: any) {
        setErrorMessage(e.message);
        console.error("useEffect", e);
        return;
      }
      await questions.forEach((question: Question) => {
          QsandAs.push({'header': question.header,
              'questions': question.questions.map((question2:string, i: number) => {
                  return {'id': question.header+i, 'question': question2,
                          'answer': Rating.n_a, "comment": ""}
              }, question.header)
          })
          
          tempSections[question.header] = QsandAs;
      })
      setSections(QsandAs)
    }
    fetchQuestions();
  }, [])

  const onSubmit = (values: valuesInterface) => {
    var message:string;

    try {
      const response = QandAService.postAnswers(values)
      console.log("onSubmit->response", response)
      message = "Thanks"
    }
    catch (e: any)
    {
      console.error(e.resonse.data)
      message = e.response.data
    }
    navigate("/thanks", {state: {messageToDisplay: message}})
  }

  return (
    <div>
    <Routes>
      <Route path="/thanks" element={<Thanks />} />
      <Route path="/" element={<Home questions={Sections2} onSubmit={onSubmit} errorMessage={errorMessage}/>} />
    </Routes>
    </div>
  )
}

export default App;
