using FixMyCampus.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using FixMyCampus.Application.Services;
using FixMyCampus.Infrastructure.Persistence.Repositories;
using FixMyCampus.Application.Interfaces.Repositories;
using FixMyCampus.Infrastructure.Services;
using FixMyCampus.Application.Services;
using FixMyCampus.Infrastructure.Identity;
using FixMyCampus.Infrastructure.Services;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<FixMyCampusDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("FixMyCampusDatabase")));
builder.Services.AddScoped<IRoomRepository, RoomRepository>();
builder.Services.AddScoped<ICampusService, CampusService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITicketService, TicketService>();
builder.Services.AddScoped<ICampusService, CampusService>();
builder.Services
    .AddIdentity<FixMyCampusUser, IdentityRole>()
    .AddEntityFrameworkStores<FixMyCampusDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
