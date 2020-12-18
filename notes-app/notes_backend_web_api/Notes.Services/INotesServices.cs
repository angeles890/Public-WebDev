using Notes.db;
using System;
using System.Collections.Generic;
using System.Text;


namespace Notes.Services
{
    public interface INotesServices
    {
        Note AddNote(Note note);
        Note GetNote(int id);

        List<Note> GetNotes();

        void DeleteNote(int id);

        void EditNote(Note note);
    }
}
