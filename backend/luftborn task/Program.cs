using luftborn_task.Models;
using luftborn_task.Services;
using luftborn_task.Controllers;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:3000") // Specify the client app's origin
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

// Configure services
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDB"));
builder.Services.AddSingleton<MongoDBService>();
builder.Services.AddControllers(); // Add this line to add support for controllers

var app = builder.Build();

// Middleware to use controllers
app.UseRouting();
// Map controllers
app.MapControllers(); // Add this line to map controller routes
app.UseCors("AllowSpecificOrigin");
app.MapGet("/", () => "Hello World!");

app.Run();
