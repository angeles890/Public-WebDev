using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Notes.db;
using Notes.Services;

namespace notes_web_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotesController : ControllerBase
    {

        private readonly ILogger<NotesController> _logger;
        private INotesServices _notesServices;

        public NotesController(ILogger<NotesController> logger, INotesServices notesServices)
        {
            _logger = logger;
            _notesServices = notesServices;
        }

        [HttpGet]
        public IActionResult GetAction() 
        {
            return Ok(_notesServices.GetNotes());
        }


        [HttpGet("{id}", Name = "GetNote")]
        public IActionResult GetNote(int id)
        {
            Note note = _notesServices.GetNote(id);
            if (note == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(note);
            }
        }


        [HttpPost]
        public IActionResult AddNote(Note note)
        {
            var newNote = _notesServices.AddNote(note);
            return CreatedAtRoute("GetNote", new { newNote.id }, newNote);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteNote(int id)
        {
            _notesServices.DeleteNote(id);
            return Ok();
        }

        [HttpPut]
        public IActionResult EditNote([FromBody] Note note)
        {
            _notesServices.EditNote(note);
            return Ok();
        }
    }
}
