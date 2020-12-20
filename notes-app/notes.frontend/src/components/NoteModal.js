import { Button, Form, Modal, InputGroup, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {AddNote, EditNote} from '../services/notesServices';

//https://react-bootstrap.github.io/components/modal/

export const AddNoteModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Button onClick={handleShow} className='btn btn-success'>New Note</Button>
            <NoteModal note={null} handleFormSubmit={AddNote} show={show} handleClose={handleClose} />
        </div>
    )
}

export const EditNoteModal = ({ note }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Button onClick={handleShow} className='btn btn-warning'>Edit</Button>
            <NoteModal note={note} handleFormSubmit={EditNote} show={show} handleClose={handleClose} />
        </div>
    )
}

const NoteModal = ({ note, handleFormSubmit, show, handleClose }) => {
    const [modalNote, setModalNote] = useState({});
    const dispatch = useDispatch();

    //Set the note obj/state everytime note is modified
    useEffect(() => {
        setModalNote(note);
    }, [note]);

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Form onSubmit={event => {event.preventDefault(); handleFormSubmit(dispatch, modalNote);}}>
                    <Modal.Body>
                       <InputGroup>
                            <FormControl value={modalNote === null ? '': modalNote.value} onChange={event => setModalNote({...modalNote, value: event.target.value })}/>
                       </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type='submit' variant="primary" onClick={handleClose}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );

}

