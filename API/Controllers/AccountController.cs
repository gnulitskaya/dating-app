using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly EmailService _emailService;
        // private readonly ISmsService _smsService;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, 
        ITokenService tokenService, IMapper mapper, EmailService emailService)
        {
            _emailService = emailService;
            // _smsService = smsService;
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto) {
            // if(await UserExists(registerDto.Username)) return BadRequest("Username is taken!");
            if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
            {
                return BadRequest("Email address is in use!");
                // return new BadRequestObjectResult(new ApiValidationErrorResponse{Errors = new []{"Email address is in use"}});
            }

            // var user = new AppUser
            // {
            //     Username = registerDto.Username,
            //     Email = registerDto.Email,
            //     UserName = registerDto.Email
            // };

            var user = _mapper.Map<AppUser>(registerDto);

            using var hmac = new HMACSHA512();

            int index = user.Email.IndexOf('@');
            string username = user.Email.Substring(0, index);
            user.UserName = username.ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if(!result.Succeeded) return BadRequest(result.Errors);

            var rolesResult = await _userManager.AddToRoleAsync(user, "Member");
            if(!rolesResult.Succeeded) return BadRequest(rolesResult.Errors);
        
            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto) {
            // var user = await _userManager.Users
            // .Include(x => x.Photos)
            // .SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized("Email address is in use!");

            // if(user == null) return Unauthorized("Invalid username!");

            var result = await _signInManager
                .CheckPasswordSignInAsync(user, loginDto.Password, false);
            if(!result.Succeeded) return Unauthorized("Invalid password!");
            
            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                // PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                // ImageData = user.Photos.FirstOrDefault(x => x.IsMain)?.ImageData,
                // KnownAs = user.KnownAs,
                // Gender = user.Gender,
            };
        }

        private async Task<bool> UserExists(string username) {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}