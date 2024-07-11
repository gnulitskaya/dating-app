using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class Breeds : BaseEntity
    {
        // public int Id { get; set; }
        public string Name { get; set; }
    }
}