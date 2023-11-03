/* eslint-disable @typescript-eslint/no-explicit-any */
// const http = require('http')
const express = require('express');
// const { promises } = require('fs');
// const { rejects } = require('assert');
const app = express()
app.use(express.json());
const testFolder = './data/'
const fs = require('fs')
const cors = require('cors')
app.use(cors({ credentials: true }))

import answerService, { getAnswerFiles, getFile, deleteFile } from "./service/answerService"

const requestLogger = (request: any, _response: any, next: any) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)

interface Output {
    header: string;
    questions: string[]
}

app.delete('/:filename', (request: any, response: any) => {
    console.log("delete /:filename")
    try{
        console.log("filename", request.params.filename)
        const response2 = deleteFile(request.params.filename);
        console.log("craig was here", response2)
        response.status(200).send("craig was here")
    }
    catch (e: any) {
        response.status(500).send(e.message)
    }
})

app.get('/questions', (_request: Request, response: any) => {
    console.log("get /questions")
    try {
        var output: Array<Output> = []
        var files: Array<string> = fs.readdirSync(testFolder).filter((file: string) => {
            return file.length > 9
        })
        
        files.map((file: string) => {
            var section:string = file.split('.')[1].trim()
            var questions: string[] = fs.readFileSync(testFolder+file, 'utf8')
            .split('\r\n')
            .map((question: string) => question.trim())
            .filter((question: string) => question.length > 2)
            output.push({'header': section, 'questions': questions})
        })
        
        response.json(output)
    }
    catch (e: any) {
        console.log("e:", e.message)
        response.statusMessage = e.message;
        response.status(500).send(e.message);
    }
})

app.get('/:filename', (request: any, response: any) => {
    console.log("/:filename")
    try{
        console.log("filename", request.params.filename)
        response.status(200).send(getFile(request.params.filename))
    }
    catch (e: any) {
        response.status(500).send(e.message)
    }
})

app.get('/', (_request: Request, response: any) => {
    console.log("get /")
    try {
        const result = getAnswerFiles();
        response.json(result)
    }
    catch (e: any) {
        response.status(500).send(e.message)
    }
})



app.post('/questions', (request: Request, response: any) => {
    console.log("app.post")
    console.log(request.body)
    try {
        response.status(200).send(answerService(request.body))
    }
    catch (e: any)
    {
        console.log("e:", e.message)
        response.statusMessage = e.message;
        response.status(500).send(e.message);
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
