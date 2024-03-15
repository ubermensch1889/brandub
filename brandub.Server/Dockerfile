FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["brandub.Server/brandub.Server.csproj", "brandub.Server/"]
COPY ["brandub.client/brandub.client.esproj", "brandub.client/"]
RUN dotnet restore "brandub.Server/brandub.Server.csproj"
COPY . .
WORKDIR "/src/brandub.Server"
RUN dotnet build "brandub.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "brandub.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "brandub.Server.dll"]
