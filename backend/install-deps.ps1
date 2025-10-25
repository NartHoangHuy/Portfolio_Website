# Install Go dependencies
Write-Host "Installing Go dependencies..." -ForegroundColor Green

go get github.com/cloudinary/cloudinary-go/v2
go get github.com/golang-jwt/jwt/v5
go get github.com/gosimple/slug
go get github.com/joho/godotenv
go get github.com/sendgrid/sendgrid-go
go get golang.org/x/crypto
go get gorm.io/driver/postgres
go get gorm.io/gorm

Write-Host "Dependencies installed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Don't forget to:" -ForegroundColor Yellow
Write-Host "1. Copy .env.example to .env" -ForegroundColor Yellow
Write-Host "2. Update .env with your credentials" -ForegroundColor Yellow
Write-Host "3. Create PostgreSQL database" -ForegroundColor Yellow
