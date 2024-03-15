using brandub.Server.DataAccess;
using brandub.Server.DataAccess.Entities.Repositories;
using brandub.Server.Services;
using Microsoft.EntityFrameworkCore;

namespace brandub.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            
            // подключаем базу данных
            builder.Services.AddDbContext<GameDbContext>(options =>
            {
                options.UseNpgsql(builder.Configuration.GetConnectionString(nameof(GameDbContext)) ?? string.Empty);
            });

            builder.Services.AddScoped<GamesService>();
            builder.Services.AddScoped<GamesRepository>();
            
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

            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
