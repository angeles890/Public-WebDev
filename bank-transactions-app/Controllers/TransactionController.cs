using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using jQueryAjaxCRUDinASPNET.Models;
using static jQueryAjaxCRUDinASPNET.Helper;



namespace jQueryAjaxCRUDinASPNET.Controllers
{
    public class TransactionController : Controller
    {
        private readonly TransactionDbContext _context;

        public TransactionController(TransactionDbContext context)
        {
            _context = context;
        }

        // GET: Transaction
        public async Task<IActionResult> Index()
        {
            return View(await _context.Transactions.ToListAsync());
        }


        // GET: Transaction/AddOrEdit
        // GET: Transaction/AddOrEdit/5
        public async Task<IActionResult> AddOrEdit(int id=0)
        {
            if (id == 0)
            {
                return View(new TransactionModel());
            }
            else 
            {

                var transactionModel = await _context.Transactions.FindAsync(id);
                if (transactionModel == null)
                {
                    return NotFound();
                }
                return View(transactionModel);
            }
             
        }

        // POST: Transaction/AddOrEdit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddorEdit(int id, [Bind("TransactionID,AcountNumber,BeneficiaryName,BankName,SWIFTCode,Ammount,Date")] TransactionModel transactionModel)
        {

            if (ModelState.IsValid)
            {
                if (id == 0) 
                {

                    transactionModel.Date = DateTime.Now;
                    _context.Add(transactionModel);
                    await _context.SaveChangesAsync();
 
                } 
                else
                {
                    try
                    {
                        _context.Update(transactionModel);
                        await _context.SaveChangesAsync();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        if (!TransactionModelExists(transactionModel.TransactionID))
                        {
                            return NotFound();
                        }
                        else
                        {
                            throw;
                        }
                    }
                    

                }
                return Json(new { isValid = true, html = Helper.RenderRazerViewToString(this,"_ViewAll",_context.Transactions.ToList()) });
            }
            return Json(new { isValid = false, html = Helper.RenderRazerViewToString(this,"AddOrEdit", transactionModel)});
        }


        // POST: Transaction/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var transactionModel = await _context.Transactions.FindAsync(id);
            _context.Transactions.Remove(transactionModel);
            await _context.SaveChangesAsync();
            return Json(new { html = Helper.RenderRazerViewToString(this, "_ViewAll", _context.Transactions.ToList()) });
        }

        private bool TransactionModelExists(int id)
        {
            return _context.Transactions.Any(e => e.TransactionID == id);
        }
    }
}
