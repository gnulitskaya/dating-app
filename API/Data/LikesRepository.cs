using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LikesRepository : ILikesRepository
    {
        private readonly DataContext _context;
        public LikesRepository(DataContext context) {
            _context = context;
        }
        public async Task<UserLike> GetUserLike(int sourceUserId, int LikedUserId)
        {
            return await _context.Likes.FindAsync(sourceUserId, LikedUserId);
        }

        public async Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams)
        {
            var users = _context.Users.OrderBy(x => x.UserName).AsQueryable();
            var likes = _context.Likes.AsQueryable();

            if(likesParams.Predicate == "liked") {
                likes = likes.Where(x => x.SourceUserId == likesParams.UserId);
                users = likes.Select(x => x.LikedUser);
            }

            if(likesParams.Predicate == "likedBy") {
                likes = likes.Where(x => x.LikedUserId == likesParams.UserId);
                users = likes.Select(x => x.SourceUser);
            }

            var likedUsers = users.Select(user => new LikeDto {
                Username = user.UserName,
                Id = user.Id,
                // KnownAs = user.KnownAs,
                // Age = user.DateOfBirth.CalculateAge(),
                PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain).Url,
                // City = user.City
            });

            return await PagedList<LikeDto>
                .CreateAsync(likedUsers, likesParams.PageNumber, likesParams.PageSize);
        }

        public async Task<AppUser> GetUserWithLikes(int userId)
        {
            return await _context.Users
                .Include(x => x.LikedUsers)
                .FirstOrDefaultAsync(x => x.Id == userId);
        }
    }
}