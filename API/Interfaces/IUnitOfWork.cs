using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository {get; }
        IMessageRepository MessageRepository {get; }
        ILikesRepository LikesRepository {get; }
        IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity;
        Task<bool> Complete();
        bool HasChanges();
    }
}