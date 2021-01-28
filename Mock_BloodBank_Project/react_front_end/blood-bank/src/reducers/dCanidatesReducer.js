import { ACTION_TYPES } from '../actions/dCanidatesActions'


const initialState = {
    donorsList:[]
}
export const dCanidate = (state = initialState,action) =>{
    switch (action.type){
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                donorsList:[...action.payload]
            }
        case ACTION_TYPES.CREATE:
            return {...state, donorsList: [...state.donorsList, action.payload]}
        case ACTION_TYPES.UPDATE:
            return {
                    ...state, 
                    donorsList: state.donorsList.map(x=> x.id == action.payload.id? action.payload:x)}
        case ACTION_TYPES.DELETE:
            return {
                ...state, 
                donorsList: state.donorsList.filter(x=> x.id != action.payload)
            }
        default:
            return state;
    }
}

export default dCanidate;