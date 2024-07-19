using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PhotoUrl { get; set; }
        public string ImageData { get; set; }
        public string Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Gender { get; set; }
        // public string Introduction { get; set; }
        // public string LookingFor { get; set; }
        // public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Breed { get; set; }
        public string Character { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
    }
}