import { valuesInterface } from "../types"
const fs = require('fs')

export const getFile = (filename:string) => {
    console.log("getFile")
    const folder = get_date(Date().toString());
    
    if (!fs.existsSync(folder)){
        fs.mkdirSync(folder);
    }
    console.log("filename", `${folder}/${filename}.`)
    try{
        const data = fs.readFileSync(`${folder}/${filename}`, 'utf8')
        // console.log("file", JSON.stringify(data, null, 4))
        return JSON.parse(data)
    }
    catch (e: any) {
        console.log(e.message)
        return e
    }
}

export const getAnswerFiles = () : string[] => {
    console.log("getAnswerFiles")
    const folder = get_date(Date().toString());

    let answerFiles : string[] = [];
    if (fs.existsSync(folder)){
        try {
            fs.readdirSync(folder).forEach((file:string) => {
                answerFiles.push(file);
            })
        }
        catch (e: any) {
            console.log(e.message)
            return e
        }
    }

    return answerFiles;
}

const get_date = (date: string) : string => {
    const date2 = new Date(date)
    
    const month =  Intl.DateTimeFormat("en-US", { month: "long" }).format(date2)
    const year = date2.getFullYear()
    return month + "_" + year;
}

const answerService = (answers: valuesInterface | any) => {
    const folder = get_date(answers.date)
    const filename = (answers.auditor + "-" + answers.area).replace(/\s/gi,"_")

    if (!fs.existsSync(folder)){
        fs.mkdirSync(folder);
    }

    try {
        fs.writeFile('./'+folder+'/'+filename+'.json', 
            JSON.stringify(answers.questions, null, 4), 
            function(err: any) {
                if(err) {
                    console.log(err);
                    return (err);
                } else {
                    console.log("JSON saved to " + filename);
                    return("JSON saved to " + filename);
                }
            }
        );
    }
    catch (e: any) {
        console.log("e:", e.message)
        return e;
    }
}

export const deleteFile = (filename:string) => {
    console.log("answerService->deleteFile", filename)
    const folder = get_date(Date().toString());

    try {
        fs.unlink(`${folder}/${filename}`, (err: any) => {
            if (err)
            {
                console.log("answerService->deleteFile->catch", err)
                throw err;
            }
        });
    }
    catch (e: any) {
        return e
    }
}

export default answerService