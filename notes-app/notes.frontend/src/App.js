import React from 'react';
//import logo from './logo.svg';
//import { Counter } from './features/counter/Counter';
import { NotesTable } from './components/NotesTable';
import { AddNoteModal } from './components/NoteModal';
import './App.css';

function App() {
  return (
    <div className="App">
      <h3>My Notes</h3>
     
      <div className="container-fluid">
        <div style={{ textAlign: 'right'}}>
          <AddNoteModal />
        </div>
        <NotesTable />
      </div>
    </div>
  );
}

export default App;
