using Microsoft.EntityFrameworkCore;
using NTVibeEventApp.Server.BLL.Interfaces;
using NTVibeEventApp.Server.BLL.Services;
using NTVibeEventApp.Server.DAL.Context;
using NTVibeEventApp.Server.DAL.Interfaces;
using NTVibeEventApp.Server.DAL.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container.
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                        policy =>
                        {
                            policy.WithOrigins("https://localhost:5173", "https://localhost:5175", "https://localhost:5178") // your frontend ports
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                        });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

// **THIS IS THE CORRECT PLACE FOR THE CORS POLICY.**
// It must be placed after UseRouting and before UseAuthorization.
app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();