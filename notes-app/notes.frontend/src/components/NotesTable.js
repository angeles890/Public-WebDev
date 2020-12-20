//Will display table of notes
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetNotes, DeleteNote } from '../services/notesServices';
import { Button } from 'react-bootstrap';
import { EditNoteModal } from './NoteModal';


export const NotesTable = () => {
    //Access the state to grab what is needed
    const notes = useSelector(state => state.notesReducer.notes);
    const dispatch = useDispatch();

    //useEffect calls the dispatch made in notesServices, and is hooked to a BLANK array so that it does not run again.
    useEffect(() => {
        GetNotes(dispatch);
    }, []);
    return (
        <table className='table table-dark'>
            <tbody>
                {
                    notes.map(n=> 
                        <tr>
                            <td style={tdStyle}>
                                <EditNoteModal note={n}> </EditNoteModal>
                            </td>
                            <td style={tdStyle}>
                                <button className="btn btn-danger" onClick={()=> DeleteNote(dispatch,n)} >Delete</button>
                            </td>
                            <td style={itemTDStyle}>
                                {n.value}
                            </td>
 
                            
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

const tdStyle = {
    width: '3rem'
}

const itemTDStyle = {
    textAlign: 'left'
}