using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IProductRepository
    {
        Task<IReadOnlyList<Breeds>> GetProductTypesAsync();
    }
}