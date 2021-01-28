using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using bloodBank_WebAPI.Models;

namespace bloodBank_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonorCanidateController : ControllerBase
    {
        private readonly AppDBContext _context;

        public DonorCanidateController(AppDBContext context)
        {
            _context = context;
        }

        // GET: api/DonorCanidate
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DonorCanidate>>> GetdonorCanidate()
        {
            return await _context.donorCanidate.ToListAsync();
        }

        // GET: api/DonorCanidate/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DonorCanidate>> GetDonorCanidate(int id)
        {
            var donorCanidate = await _context.donorCanidate.FindAsync(id);

            if (donorCanidate == null)
            {
                return NotFound();
            }

            return donorCanidate;
        }

        // PUT: api/DonorCanidate/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDonorCanidate(int id, DonorCanidate donorCanidate)
        {
            donorCanidate.id = id;

            _context.Entry(donorCanidate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DonorCanidateExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DonorCanidate
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DonorCanidate>> PostDonorCanidate(DonorCanidate donorCanidate)
        {
            _context.donorCanidate.Add(donorCanidate);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDonorCanidate", new { id = donorCanidate.id }, donorCanidate);
        }

        // DELETE: api/DonorCanidate/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DonorCanidate>> DeleteDonorCanidate(int id)
        {
            var donorCanidate = await _context.donorCanidate.FindAsync(id);
            if (donorCanidate == null)
            {
                return NotFound();
            }

            _context.donorCanidate.Remove(donorCanidate);
            await _context.SaveChangesAsync();

            return donorCanidate;
        }

        private bool DonorCanidateExists(int id)
        {
            return _context.donorCanidate.Any(e => e.id == id);
        }
    }
}
