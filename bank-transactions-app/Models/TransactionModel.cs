using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace jQueryAjaxCRUDinASPNET.Models
{
    public class TransactionModel
    {
        //https://www.youtube.com/watch?v=3r6RfShv8m8&t=931s
        [Key]
        public int TransactionID { get; set; }
        [Column(TypeName = "nvarchar(12)")]
        [DisplayName("Acount Number")]
        [Required(ErrorMessage ="Account Number is Required")]
        [MaxLength(12)]
        public string AcountNumber { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        [DisplayName("Beneficiary Name")]
        [Required(ErrorMessage = "Beneficiary Name is Required")]
        public string BeneficiaryName { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        [DisplayName("Bank Name")]
        [Required(ErrorMessage = "Bank Name is Required")]
        public string BankName { get; set; }
        [Column(TypeName = "nvarchar(11)")]
        [DisplayName("SWIFT Code")]
        [Required(ErrorMessage = "SWIFT Code is Required")]
        [MaxLength(11)]
        public string SWIFTCode { get; set; }

        [Required(ErrorMessage = "Amount is Required")]
        public int Ammount { get; set; }
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime Date { get; set; }
    }
}
