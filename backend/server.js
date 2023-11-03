"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
// const http = require('http')
const express = require('express');
// const { promises } = require('fs');
// const { rejects } = require('assert');
const app = express();
app.use(express.json());
const testFolder = './data/';
const fs = require('fs');
const cors = require('cors');
app.use(cors({ credentials: true }));
const answerService_1 = __importStar(require("./service/answerService"));
const requestLogger = (request, _response, next) => {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('---');
    next();
};
app.use(requestLogger);
app.delete('/:filename', (request, response) => {
    console.log("delete /:filename");
    try {
        console.log("filename", request.params.filename);
        const response2 = (0, answerService_1.deleteFile)(request.params.filename);
        console.log("craig was here", response2);
        response.status(200).send("craig was here");
    }
    catch (e) {
        response.status(500).send(e.message);
    }
});
app.get('/questions', (_request, response) => {
    console.log("get /questions");
    try {
        var output = [];
        var files = fs.readdirSync(testFolder).filter((file) => {
            return file.length > 9;
        });
        files.map((file) => {
            var section = file.split('.')[1].trim();
            var questions = fs.readFileSync(testFolder + file, 'utf8')
                .split('\r\n')
                .map((question) => question.trim())
                .filter((question) => question.length > 2);
            output.push({ 'header': section, 'questions': questions });
        });
        response.json(output);
    }
    catch (e) {
        console.log("e:", e.message);
        response.statusMessage = e.message;
        response.status(500).send(e.message);
    }
});
app.get('/:filename', (request, response) => {
    console.log("/:filename");
    try {
        console.log("filename", request.params.filename);
        response.status(200).send((0, answerService_1.getFile)(request.params.filename));
    }
    catch (e) {
        response.status(500).send(e.message);
    }
});
app.get('/', (_request, response) => {
    console.log("get /");
    try {
        const result = (0, answerService_1.getAnswerFiles)();
        response.json(result);
    }
    catch (e) {
        response.status(500).send(e.message);
    }
});
app.post('/questions', (request, response) => {
    console.log("app.post");
    console.log(request.body);
    try {
        response.status(200).send((0, answerService_1.default)(request.body));
    }
    catch (e) {
        console.log("e:", e.message);
        response.statusMessage = e.message;
        response.status(500).send(e.message);
    }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
