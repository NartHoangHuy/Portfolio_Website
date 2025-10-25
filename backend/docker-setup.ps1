# Quick Docker PostgreSQL Setup
Write-Host "Setting up PostgreSQL with Docker..." -ForegroundColor Green

# Check if Docker is installed
$dockerPath = Get-Command docker -ErrorAction SilentlyContinue
if (-not $dockerPath) {
    Write-Host "ERROR: Docker is not installed!" -ForegroundColor Red
    Write-Host "Please install Docker Desktop from: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
    exit 1
}

# Stop and remove existing container if exists
docker stop portfolio-postgres 2>$null
docker rm portfolio-postgres 2>$null

# Run PostgreSQL container
Write-Host "Starting PostgreSQL container..." -ForegroundColor Cyan
docker run --name portfolio-postgres `
    -e POSTGRES_PASSWORD=postgres `
    -e POSTGRES_DB=portfolio_db `
    -p 5432:5432 `
    -d postgres:14

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "PostgreSQL is running!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Update your .env file with:" -ForegroundColor Yellow
    Write-Host "DB_PASSWORD=postgres" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Wait 5 seconds for PostgreSQL to initialize..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
    Write-Host "Ready! Run: go run main.go" -ForegroundColor Green
}
else {
    Write-Host "ERROR: Failed to start Docker container" -ForegroundColor Red
}
