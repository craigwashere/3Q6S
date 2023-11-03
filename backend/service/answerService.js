"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.getAnswerFiles = exports.getFile = void 0;
const fs = require('fs');
const getFile = (filename) => {
    console.log("getFile");
    const folder = get_date(Date().toString());
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }
    console.log("filename", `${folder}/${filename}.`);
    try {
        const data = fs.readFileSync(`${folder}/${filename}`, 'utf8');
        // console.log("file", JSON.stringify(data, null, 4))
        return JSON.parse(data);
    }
    catch (e) {
        console.log(e.message);
        return e;
    }
};
exports.getFile = getFile;
const getAnswerFiles = () => {
    console.log("getAnswerFiles");
    const folder = get_date(Date().toString());
    let answerFiles = [];
    if (fs.existsSync(folder)) {
        try {
            fs.readdirSync(folder).forEach((file) => {
                answerFiles.push(file);
            });
        }
        catch (e) {
            console.log(e.message);
            return e;
        }
    }
    return answerFiles;
};
exports.getAnswerFiles = getAnswerFiles;
const get_date = (date) => {
    const date2 = new Date(date);
    const month = Intl.DateTimeFormat("en-US", { month: "long" }).format(date2);
    const year = date2.getFullYear();
    return month + "_" + year;
};
const answerService = (answers) => {
    const folder = get_date(answers.date);
    const filename = (answers.auditor + "-" + answers.area).replace(/\s/gi, "_");
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }
    try {
        fs.writeFile('./' + folder + '/' + filename + '.json', JSON.stringify(answers.questions, null, 4), function (err) {
            if (err) {
                console.log(err);
                return (err);
            }
            else {
                console.log("JSON saved to " + filename);
                return ("JSON saved to " + filename);
            }
        });
    }
    catch (e) {
        console.log("e:", e.message);
        return e;
    }
};
const deleteFile = (filename) => {
    console.log("answerService->deleteFile", filename);
    const folder = get_date(Date().toString());
    try {
        fs.unlink(`${folder}/${filename}`, (err) => {
            if (err) {
                console.log("answerService->deleteFile->catch", err);
                throw err;
            }
        });
    }
    catch (e) {
        return e;
    }
};
exports.deleteFile = deleteFile;
exports.default = answerService;
