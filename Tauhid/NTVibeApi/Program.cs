// Program.cs
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add CORS to allow requests from the frontend.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            // Allow requests from our React frontend.
            // In a real-world app, you would specify the exact URL.
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();
app.MapControllers();
app.Run();
// Models/Event.cs