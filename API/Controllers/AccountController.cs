using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenServices _tokenServices;
        public AccountController(UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager,
        TokenServices tokenServices)
        {
            _tokenServices = tokenServices;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {

            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Image = null,
                    Token = _tokenServices.CreateToken(user),
                    UserName = user.UserName

                };
            }

            return Unauthorized();

        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x=> x.Email == registerDto.Email))
            {
                return BadRequest("Email Taken");
            }
            if (await _userManager.Users.AnyAsync(x=> x.UserName == registerDto.UserName))
            {
                return BadRequest("UserName Taken");
            }

            var user = new AppUser {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.UserName
            };

            var result = await _userManager.CreateAsync(user,registerDto.Password);
            if (result.Succeeded)
            {
                return new UserDto{
                    DisplayName = user.DisplayName,
                    Image = null,
                    Token = _tokenServices.CreateToken(user),
                    UserName = user.UserName

                };
                
            }

            return BadRequest("Problem registering problem");
        }


        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            return new UserDto{
                    DisplayName = user.DisplayName,
                    Image = null,
                    Token = _tokenServices.CreateToken(user),
                    UserName = user.UserName

                };
        }
    }
}