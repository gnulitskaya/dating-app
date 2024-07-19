using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MemberUpdateDto
    {
        // public string Introduction { get; set; }
        // public string LookingFor { get; set; }
        // public string Interests { get; set; }
        public string KnownAs { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Age { get; set; }
        public string Gender { get; set; }
        public string Breed { get; set; }
        public string Character { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
    }
}