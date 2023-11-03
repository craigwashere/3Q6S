// import QandAService from '../services/QandAService'
import { State } from "../state";
import { QandA, Section } from '../types';

export type Action = 
    | {
        type: "CHANGE_RATING";
        payload: {id: string; rating: string};
      }
    | {
        type: "ADD_COMMENT";
        payload: string;
      }
    | {
        type: "INIT";
        payload: Section[]
      }

export const reducer = (state: State, action: Action): State => {
    console.log("questionReducer")
    console.log('state now: ', state)
	console.log('action', action)
    const id = 0 //action.data.id
    const qToChange = {} //state.find(q => q.id === id)
    let changedQuestion = { }
    let new_state: State
    switch (action.type)
    {
        case 'CHANGE_RATING': return state;
        // changedQuestion = { ...qToChange, rating: action.data.rating}
        //                       new_state = state.map(q => q.id !== id ? q : changedQuestion)
        //                       break;
        // case 'ADD_COMMENT': changedQuestion = { ...qToChange, rating: action.data.comment}
        //                     new_state = state.map(q => q.id !== id ? q : changedQuestion)
        //                     break;
        case 'INIT': new_state =  {
            ...state,
            Sections: {
                    ...action.payload.reduce((memo, section) => ({ ...memo, [section.header]: section }), {}),
                    ...state.Sections
                }
            };
            break;
        default: return  state
    }
    console.log("new_state", new_state)
    return new_state;
}

export const changeRating = (id: string, rating: string): Action => {
    console.log("changeRating", id, rating)
    return {
        type: "CHANGE_RATING",
        payload: {id: id, rating: rating}
    }
//     return ((dispatch) => {
//         dispatch({
//         type: 'CHANGE_RATING',
//         data: {id, rating}
//     })})
}

export const addComment = (id: string, comment: string) => {
//     return {
//         type: 'ADD_COMMENT',
//         data: {id, comment}
//     }
}

export const initialzeQsandAs = (QsandAs: Section[]): Action => {
    console.log("initialzeQsandAs")
    return {
        type: "INIT",
        payload: QsandAs
    }
    // return async dispatch => {
    //     const sections = await QandAService.getQuestions()
    //     console.log("sections", sections)
    //     QsandAs = []
    //     await sections.forEach(section => {
    //         QsandAs.push({'header': section.header,
    //             'questions': section.questions.map((question, i) => {
    //                 return {'id': section.header+i, 'question': question,
    //                         'answer': "N/A", 'comment': ""}
    //             })
    //         })
    //     })
    //     console.log("initialzeQsandAs", QsandAs)
    //     dispatch({
    //         type: 'INIT',
    //         data: QsandAs
    //     })
    // }
}

// export default reducer