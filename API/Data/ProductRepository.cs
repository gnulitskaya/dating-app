using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;
        public ProductRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<Breeds>> GetProductTypesAsync()
        {
            return await _context.Breeds.ToListAsync();
        }
    }
}