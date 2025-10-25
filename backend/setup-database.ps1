# Portfolio Website - Database Setup Script
# Run this script to setup PostgreSQL database

Write-Host "=== Portfolio Website Database Setup ===" -ForegroundColor Green
Write-Host ""

# Check if PostgreSQL is installed
$pgPath = Get-Command psql -ErrorAction SilentlyContinue
if (-not $pgPath) {
    Write-Host "ERROR: PostgreSQL is not installed or not in PATH!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install PostgreSQL first:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
    Write-Host "2. Or use Docker: docker run --name portfolio-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:14" -ForegroundColor Yellow
    exit 1
}

Write-Host "PostgreSQL found!" -ForegroundColor Green
Write-Host ""

# Get database credentials from .env file
$envFile = ".env"
if (Test-Path $envFile) {
    Write-Host "Reading .env file..." -ForegroundColor Cyan
    $env:PGPASSWORD = (Select-String -Path $envFile -Pattern "DB_PASSWORD=(.+)" | ForEach-Object { $_.Matches.Groups[1].Value })
    $dbUser = (Select-String -Path $envFile -Pattern "DB_USER=(.+)" | ForEach-Object { $_.Matches.Groups[1].Value })
    $dbName = (Select-String -Path $envFile -Pattern "DB_NAME=(.+)" | ForEach-Object { $_.Matches.Groups[1].Value })
    $dbHost = (Select-String -Path $envFile -Pattern "DB_HOST=(.+)" | ForEach-Object { $_.Matches.Groups[1].Value })
    $dbPort = (Select-String -Path $envFile -Pattern "DB_PORT=(.+)" | ForEach-Object { $_.Matches.Groups[1].Value })
}
else {
    Write-Host "ERROR: .env file not found!" -ForegroundColor Red
    Write-Host "Please copy .env.example to .env and configure it." -ForegroundColor Yellow
    exit 1
}

Write-Host "Database Host: $dbHost" -ForegroundColor Cyan
Write-Host "Database Port: $dbPort" -ForegroundColor Cyan
Write-Host "Database User: $dbUser" -ForegroundColor Cyan
Write-Host "Database Name: $dbName" -ForegroundColor Cyan
Write-Host ""

# Check if PostgreSQL is running
Write-Host "Checking if PostgreSQL is running..." -ForegroundColor Cyan
$pgRunning = Test-NetConnection -ComputerName $dbHost -Port $dbPort -WarningAction SilentlyContinue
if (-not $pgRunning.TcpTestSucceeded) {
    Write-Host "ERROR: Cannot connect to PostgreSQL on ${dbHost}:${dbPort}" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please ensure PostgreSQL is running:" -ForegroundColor Yellow
    Write-Host "- Windows: Check Services or pg_ctl start" -ForegroundColor Yellow
    Write-Host "- Docker: docker start portfolio-postgres" -ForegroundColor Yellow
    exit 1
}

Write-Host "PostgreSQL is running!" -ForegroundColor Green
Write-Host ""

# Check if database exists
Write-Host "Checking if database '$dbName' exists..." -ForegroundColor Cyan
$dbExists = psql -h $dbHost -p $dbPort -U $dbUser -lqt | Select-String -Pattern $dbName
if ($dbExists) {
    Write-Host "Database '$dbName' already exists!" -ForegroundColor Yellow
    $response = Read-Host "Do you want to drop and recreate it? (y/N)"
    if ($response -eq "y" -or $response -eq "Y") {
        Write-Host "Dropping database '$dbName'..." -ForegroundColor Yellow
        psql -h $dbHost -p $dbPort -U $dbUser -c "DROP DATABASE IF EXISTS $dbName;"
        Write-Host "Creating database '$dbName'..." -ForegroundColor Cyan
        psql -h $dbHost -p $dbPort -U $dbUser -c "CREATE DATABASE $dbName;"
        Write-Host "Database '$dbName' recreated successfully!" -ForegroundColor Green
    }
}
else {
    Write-Host "Creating database '$dbName'..." -ForegroundColor Cyan
    psql -h $dbHost -p $dbPort -U $dbUser -c "CREATE DATABASE $dbName;"
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Database '$dbName' created successfully!" -ForegroundColor Green
    }
    else {
        Write-Host "ERROR: Failed to create database!" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "=== Database Setup Complete! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Update .env file with correct DB_PASSWORD if needed" -ForegroundColor Yellow
Write-Host "2. Run: go run main.go" -ForegroundColor Yellow
Write-Host "3. The application will automatically migrate tables" -ForegroundColor Yellow
Write-Host ""
