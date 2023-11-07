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
}

export const addComment = (id: string, comment: string) => { }

export const initialzeQsandAs = (QsandAs: Section[]): Action => {
    console.log("initialzeQsandAs")
    return {
        type: "INIT",
        payload: QsandAs
    }
}