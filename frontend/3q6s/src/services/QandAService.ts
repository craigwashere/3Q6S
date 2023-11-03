import axios from 'axios'
import { valuesInterface } from '../types'

//const baseUrl = 'http://3q6s-env-2.eba-dznkfz2a.us-east-2.elasticbeanstalk.com/questions'
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

export default { getQuestions, postAnswers }