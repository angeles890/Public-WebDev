import { ActionCreators } from '../redux/notesReducer';
import * as axios from 'axios';

//The service file makes calls to the functions found in the reducer via dispatch call to action creator


const axiosInstance = axios.create({
    baseURL: 'https://localhost:44348/notes',
});

//Calls setNotes to populate table
export const GetNotes = async (dispatch) => {
    try {
        //Api HTTPGET call
        const { data } = await axiosInstance.get();
        dispatch(ActionCreators.setNotes(data));

    }
    catch (err) {
        console.log(err);
    }
}

//Calls deleteNote to remove note by ID
export const DeleteNote = async (dispatch, note) => {
    try {
        //Api call
        await axiosInstance.delete(`/${note.id}`);
        dispatch(ActionCreators.deleteNote(note));
    }
    catch (err) {
        console.log(err);
    }
}

//Add a note
export const AddNote = async (dispatch, note) => {
    try {
        //Will fetch response from API
        const { data } = await axiosInstance.post('',note);
        dispatch(ActionCreators.addNote(data));
    }
    catch (err) {
        console.log(err);
    }
}

//Edit a note
export const EditNote = async (dispatch, note) => {
    try {
        //Will fetch response from API
        const { data } = await axiosInstance.put('',note);
        dispatch(ActionCreators.editNote(note));
    } catch (err) {
        console.log(err);
    }
}





