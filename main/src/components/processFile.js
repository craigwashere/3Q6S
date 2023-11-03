import answerFileServer from '../service/answerFileServer'

import {Grid, Segment} from 'semantic-ui-react'

import { useEffect, useState} from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const Section = ( {questions, index, addRT} ) => {
    const [average, setAverage] = useState(0);

    useEffect(() => {
        const a = () => {
            const valid_answers = questions.filter(({answer}) => answer !== 'N/A')
            let average2 = valid_answers.reduce((runningTotal, value) => {
                    return runningTotal + (Math.floor(parseInt(value.answer)/5))*5
            }, 0)
            setAverage(average2/valid_answers.length);
            addRT((average2/valid_answers.length));
        }
        a();
    }, [])

    return (
        <div key={index}>
            <Grid divided>
                <Grid.Row>
                    <Grid.Column width={13}>
                        Question
                    </Grid.Column>
                    <Grid.Column width={1}>
                        Answer
                    </Grid.Column>
                    <Grid.Column width={1}>
                        NIDEC Score
                    </Grid.Column>
                    <Grid.Column width={1}>
                        AVE
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row stretched>
                    <Grid.Column width={15}>
                            {questions.map((question, i) => {
                                let computed_answer
                                if (question.answer!=='N/A'){
                                    computed_answer = (Math.floor(parseInt(question.answer)/5))*5
                                }
                                else
                                    computed_answer = 'N/A'
                                    
                                return(
                                    <div key={computed_answer+i}>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column width={14}>
                                                    <Segment color='black'>{question.question}</Segment>
                                                </Grid.Column>
                                                <Grid.Column width={1}>
                                                    <Segment color='black'>{question.answer}</Segment>
                                                </Grid.Column>
                                                <Grid.Column width={1}>
                                                    <Segment inverted
                                                     color={computed_answer==='N/A'?'grey':
                                                     computed_answer===5?'green':'red'}>
                                                        {computed_answer}</Segment>
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Grid.Column width={16}>
                                                    <Segment color='black'>comment: {question.comment}</Segment>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                        <hr />
                                    </div>
                                )
                            })}
                    </Grid.Column>
                    <Grid.Column width={1}>
                        <Segment className='average' color='black'>
                            {average.toFixed(3)}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

function ProcessFile( props ) {
    let location = useLocation()
    const [answers, setAnswers] = useState({})
    const [runningTotal, setRunningTotal] = useState(0)
    const [file, setFile] = useState("")
    const navigate = useNavigate()

    const addToRunningTotal = (sectionAverage) => {
        setRunningTotal((runningTotal) => runningTotal+sectionAverage)
    }

    useEffect(() => {
        console.log("ProcessFile->useEffect", location.pathname.slice(1))
        const getAnswers = async () => {
            setFile(location.pathname.slice(1).replace(/%20/gi," "))
            const response = await answerFileServer.getFile(location.pathname.slice(1))
            setAnswers(response);
        }
        getAnswers();
        }, [])

    async function deleteFile2(file) {
        await props.deleteFile(file);
        navigate("/")
    }

    return (
        <div>
            <div>
                <h1>{location.pathname.slice(1).replace(/%20/gi," ")}</h1>
                {Object.values(answers).map((section, index) => {
                    return (
                        <fieldset key={section.header}>
                            <h2>{section.header}</h2>
                            <Section key={section.header+"section"} 
                                questions={section.questions} header={section.header} 
                                index={index} 
                                addRT={(sectionAverage) =>{addToRunningTotal(sectionAverage)}}
                                parentAverage={runningTotal}/>
                        </fieldset>
                    )
                })}
                </div>
                <div className='footer'>
                <Grid divided>
                    <Grid.Row>
                        <Grid.Column width={13}>
                            <Segment color='black' className='total-label'>Total</Segment>
                        </Grid.Column>
                        <Grid.Column width={2}>
                        <Segment color='black' className='total'>{runningTotal.toFixed(3)}</Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={6} verticalAlign='middle' className='home'>
                            <Link className='link' to="/">Home</Link>
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <img src='MCE-Enterprise.png' />
                        </Grid.Column>
                        <Grid.Column width={6} verticalAlign='middle'>
                            <a  className='link' href="#" onClick={() => deleteFile2(file)}>
                                Delete
                            </a>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </div>
    )
}

export default ProcessFile
