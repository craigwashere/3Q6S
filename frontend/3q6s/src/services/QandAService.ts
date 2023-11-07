import axios from 'axios'
import { valuesInterface } from '../types'

const baseUrl = 'http://localhost:3001/questions'

const getQuestions = async () => {
	try{
		console.log("getQuestions");
		const response = await axios.get(baseUrl);
		return {'status': response.status, 'data': response.data };
	}
	catch (e: any) {
		return {'status': e.response.status, 'text': e.response.statusText};
	}
}

const postAnswers = async (answers: valuesInterface) => {
	console.log("postAnswers")
	try {
		const response = await axios.post<valuesInterface>(baseUrl, answers)
		console.log("postAnswers", response)
		return {'status': response.status, 'data': response.data };
	}
	catch (e: any) {
		return {'status': e.response.status, 'text': e.response.statusText};
	}
}

const QandAService = { getQuestions, postAnswers };

export default QandAService;