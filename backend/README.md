# Portfolio Backend

Backend API server cho portfolio website được xây dựng với Go và Gin framework.

## Yêu cầu

- Go 1.21 hoặc cao hơn
- Git

## Cài đặt

1. Clone repository và di chuyển đến thư mục backend:
```bash
cd backend
```

2. Cài đặt dependencies:
```bash
go mod download
```

## Chạy server

```bash
go run main.go
```

Server sẽ chạy tại `http://localhost:8080`

## API Endpoints

### Projects
- `GET /api/projects` - Lấy danh sách tất cả projects
- `GET /api/projects/:id` - Lấy chi tiết một project

### Blog
- `GET /api/blog` - Lấy danh sách tất cả blog posts
- `GET /api/blog/:id` - Lấy chi tiết một blog post

### Contact
- `POST /api/contact` - Gửi contact message

### Health Check
- `GET /health` - Kiểm tra trạng thái server

## Build production

```bash
go build -o portfolio-server main.go
```

## Cấu trúc dữ liệu

### Project
```json
{
  "id": 1,
  "title": "Project Name",
  "description": "Project description",
  "image": "image_url",
  "technologies": ["React", "Go"],
  "category": "fullstack",
  "githubUrl": "github_url",
  "liveUrl": "live_url"
}
```

### BlogPost
```json
{
  "id": 1,
  "title": "Post Title",
  "excerpt": "Short excerpt",
  "content": "Full content",
  "date": "2024-01-15",
  "readTime": "8 min read",
  "category": "Backend",
  "image": "image_url",
  "author": "Author Name"
}
```

### ContactMessage
```json
{
  "name": "Your Name",
  "email": "your.email@example.com",
  "subject": "Subject",
  "message": "Your message"
}
```
