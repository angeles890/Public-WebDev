//Specifies how application state changes in response to actions being dispatch
//State is analagous to global variables that can be used by different components
//action types and action creators are combined here

const initialState = {
    notes: [],
}

export const ActionTypes = {
    //READ Notes
    SET_NOTES: 'SET_NOTES',
    DELETE_NOTE: 'DELETE_NOTE', 
    ADD_NOTE: 'ADD_NOTE', 
    EDIT_NOTE: 'EDIT_NOTE'
}

export const ActionCreators = {
    setNotes: payload => ({ type: ActionTypes.SET_NOTES, payload }),
    deleteNote: payload => ({ type: ActionTypes.DELETE_NOTE, payload}),
    addNote: payload => ({type:ActionTypes.ADD_NOTE,payload}), 
    editNote: payload => ({type:ActionTypes.EDIT_NOTE,payload})
}

export default function NotesReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_NOTES:
            //creating a new array and assigning it to the state [from initialState] atribute of 'notes'
            return { ...state, notes: [...action.payload] };
        case ActionTypes.DELETE_NOTE:
            //Must make copy of state.notes as state atributes cannot be edited
            var nNotes = [...state.notes];
            nNotes = nNotes.filter(note => note.id !== action.payload.id);
            return {...state,notes:[...nNotes]};
        case ActionTypes.ADD_NOTE:           
            return {...state, notes: [...state.notes, action.payload]};
        case ActionTypes.EDIT_NOTE:            
            var uNotes = state.notes.map( n=>{
                if(n.id !== action.payload.id)
                {
                    return n;
                }
                return action.payload;
              
            });            
            return {...state, notes:[...uNotes]};
        default:
            return state;
    }
}
