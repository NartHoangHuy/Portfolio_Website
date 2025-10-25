# Backend API Documentation

## Overview
REST API backend cho portfolio website với PostgreSQL database, JWT authentication, SendGrid email, và Cloudinary image hosting.

## Prerequisites
- Go 1.21+
- PostgreSQL 14+
- SendGrid Account (cho email service)
- Cloudinary Account (cho image hosting)

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
go mod download
```

Hoặc chạy script:
```powershell
.\install-deps.ps1
```

### 2. Create PostgreSQL Database
```sql
CREATE DATABASE portfolio_db;
```

### 3. Environment Variables
Copy `.env.example` to `.env` và cập nhật:

```bash
cp .env.example .env
```

Cấu hình các biến:
- **Database**: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
- **JWT**: JWT_SECRET (secret key mạnh)
- **SendGrid**: SENDGRID_API_KEY, FROM_EMAIL, TO_EMAIL
- **Cloudinary**: CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET
- **Server**: PORT, FRONTEND_URL

### 4. Run Server
```bash
go run main.go
```

Server sẽ:
- Tự động kết nối database
- Chạy migrations (tạo tables)
- Khởi động server tại port 8080

## API Endpoints

### Public Endpoints

#### Projects
```http
GET /api/projects
GET /api/projects/:id
```

#### Blog
```http
GET /api/blog
GET /api/blog/:id
GET /api/blog/slug/:slug
```

#### Contact
```http
POST /api/contact
Body: {
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

#### Authentication
```http
POST /api/auth/login
Body: {
  "username": "string",
  "password": "string"
}

POST /api/auth/register
Body: {
  "username": "string",
  "email": "string",
  "password": "string"
}
```

### Protected Admin Endpoints
*Requires JWT token in Authorization header: `Bearer <token>`*

#### Projects Management
```http
POST /api/admin/projects
PUT /api/admin/projects/:id
DELETE /api/admin/projects/:id
```

#### Blog Management
```http
POST /api/admin/blog
PUT /api/admin/blog/:id
DELETE /api/admin/blog/:id
```

#### Contact Messages
```http
GET /api/admin/contacts
PUT /api/admin/contacts/:id/read
DELETE /api/admin/contacts/:id
```

#### Image Upload
```http
POST /api/admin/upload
Content-Type: multipart/form-data
Body: {
  "image": file,
  "folder": "string" (optional)
}
```

## Database Schema

### Projects
- id (PK)
- title
- description
- image
- technologies (array)
- category
- github_url
- live_url
- featured (boolean)
- order (int)
- created_at, updated_at, deleted_at

### BlogPosts
- id (PK)
- title
- slug (unique)
- excerpt
- content
- image
- category
- tags (array)
- author
- read_time
- published (boolean)
- views (int)
- created_at, updated_at, deleted_at

### ContactMessages
- id (PK)
- name
- email
- subject
- message
- read (boolean)
- created_at, deleted_at

### Users
- id (PK)
- username (unique)
- email (unique)
- password (hashed)
- role
- created_at, updated_at, deleted_at

## Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Protected admin routes
- Password hashing với bcrypt

### 📧 Email Service
- SendGrid integration
- Automatic email notifications
- HTML email templates

### 🖼️ Image Management
- Cloudinary integration
- Automatic image optimization
- Secure upload endpoints

### 🗄️ Database
- PostgreSQL với GORM ORM
- Auto migrations
- Soft deletes
- Relationships

## Development

### Run in Development Mode
```bash
go run main.go
```

### Build for Production
```bash
go build -o portfolio-server main.go
```

### Run Production Build
```bash
./portfolio-server
```

## Deployment

### Environment Variables cho Production
Đảm bảo set đúng:
- `DB_SSLMODE=require` (cho production databases)
- `ENV=production`
- Strong `JWT_SECRET`
- Proper CORS `FRONTEND_URL`

### Recommended Platforms
- **Railway.app** (recommended, has PostgreSQL add-on)
- **Render.com**
- **Heroku**
- **DigitalOcean App Platform**
- **AWS EC2 + RDS**

## Security Best Practices

1. **Never commit .env file** - Đã thêm vào .gitignore
2. **Use strong JWT_SECRET** - Random string ít nhất 32 characters
3. **Enable HTTPS** - Mandatory cho production
4. **Database SSL** - Enable trong production
5. **Rate Limiting** - Consider thêm middleware
6. **Input Validation** - Đã implement với Gin binding

## Troubleshooting

### Database Connection Error
- Check PostgreSQL is running
- Verify credentials trong .env
- Ensure database exists

### Email Not Sending
- Verify SendGrid API key
- Check email addresses format
- Review SendGrid dashboard logs

### Image Upload Fails
- Verify Cloudinary credentials
- Check file size limits
- Ensure proper multipart/form-data

## Support
Nếu gặp vấn đề, check:
1. Console logs
2. Database logs
3. Network tab (browser)
4. API response messages
