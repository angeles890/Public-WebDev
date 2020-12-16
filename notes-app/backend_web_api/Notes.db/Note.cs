using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Notes.db
{
    public class Note
    {
        [Key]
        public int id { get; set; }
        [Column(TypeName = "nvarchar(max)")]
        public string value { get; set; }
    }
}
