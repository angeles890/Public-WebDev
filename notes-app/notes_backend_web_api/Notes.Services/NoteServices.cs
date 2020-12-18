using Notes.db;
using System;
using System.Linq;
using System.Collections.Generic;

namespace Notes.Services
{
    public class NoteServices : INotesServices
    {
        private AppDBContext _context;

        public NoteServices(AppDBContext context)
        {
            _context = context;
        }

        public Note AddNote(Note note)
        {
            _context.Add(note);
            _context.SaveChanges();

            return note;
        }

        public Note GetNote(int id) {
            return _context.Notes.FirstOrDefault(n => n.id == id);
        }

        public List<Note> GetNotes()
        {
            return _context.Notes.ToList();
        }

        public void DeleteNote(int id) 
        {
            var note = _context.Notes.FirstOrDefault(n => n.id == id);
            if (note != null)
            {
                _context.Notes.Remove(note);
                _context.SaveChanges();
            }

        }


        public void EditNote(Note note)
        {
            var eNote = _context.Notes.FirstOrDefault(n => n.id == note.id);
            if (eNote != null)
            {
                eNote.value = note.value;
                _context.SaveChanges();
            }
        }
    }
}
