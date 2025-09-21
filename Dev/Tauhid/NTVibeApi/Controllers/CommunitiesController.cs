// NTVibeApi/Controllers/CommunitiesController.cs
using Microsoft.AspNetCore.Mvc;
using NTVibeApi.Models;

[Route("[controller]")]
[ApiController]
public class CommunitiesController : ControllerBase
{
    // In-memory lists to simulate a database for communities and categories.
    private static List<Community> _communities = new List<Community>
    {
        new Community { Id = Guid.NewGuid(), Name = "Bangladeshi Community" },
        new Community { Id = Guid.NewGuid(), Name = "Greek Community" },
        new Community { Id = Guid.NewGuid(), Name = "Filipino Community" }
    };

    private static List<Category> _categories = new List<Category>
    {
        new Category { Id = Guid.NewGuid(), Name = "Cultural" },
        new Category { Id = Guid.NewGuid(), Name = "Educational" },
        new Category { Id = Guid.NewGuid(), Name = "Social" }
    };

    // API to get all communities.
    // GET /Communities
    [HttpGet]
    public IActionResult GetCommunities()
    {
        return Ok(_communities);
    }

    // API to get all categories.
    // GET /Communities/categories
    [HttpGet("categories")]
    public IActionResult GetCategories()
    {
        return Ok(_categories);
    }

    // API to add a new community (Administrator only).
    // POST /Communities
    [HttpPost]
    public IActionResult AddCommunity([FromBody] Community newCommunity)
    {
        _communities.Add(newCommunity);
        return CreatedAtAction(nameof(GetCommunities), new { id = newCommunity.Id }, newCommunity);
    }

    // API to add a new category (Administrator only).
    // POST /Communities/categories
    [HttpPost("categories")]
    public IActionResult AddCategory([FromBody] Category newCategory)
    {
        _categories.Add(newCategory);
        return CreatedAtAction(nameof(GetCategories), new { id = newCategory.Id }, newCategory);
    }
}
