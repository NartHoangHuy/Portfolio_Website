# Portfolio Website

Một trang web portfolio hiện đại được xây dựng với React (Frontend) và Go/Gin (Backend).

## Tính năng

✨ **Thiết kế hiện đại và responsive**
- Giao diện đẹp mắt với gradient colors và animations
- Hoạt động mượt mà trên mọi thiết bị
- Dark theme professional

🚀 **Các trang chính**
- **Hero Section**: Giới thiệu bản thân với animations
- **About**: Thông tin về kỹ năng và kinh nghiệm
- **Projects**: Showcase các dự án đã làm với filter
- **Blog**: Viết blog cá nhân với full-text articles
- **Contact**: Form liên hệ với validation

💻 **Stack công nghệ**

### Frontend
- React 18
- React Router DOM
- Framer Motion (animations)
- Axios (HTTP client)
- React Icons
- Vite (build tool)

### Backend
- Go 1.21
- Gin Framework
- CORS middleware

## Cài đặt

### Prerequisites
- Node.js 18+ và npm/yarn
- Go 1.21+
- Git

### Cài đặt Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend sẽ chạy tại `http://localhost:3000`

### Cài đặt Backend

```bash
cd backend
go mod download
go run main.go
```

Backend sẽ chạy tại `http://localhost:8080`

## Cấu trúc dự án

```
Portfolio_Website/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── BlogPost.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── backend/
    ├── main.go
    ├── go.mod
    └── README.md
```

## Tùy chỉnh

### Thông tin cá nhân
1. Mở `frontend/src/components/Hero.jsx` và thay đổi tên, title, social links
2. Cập nhật thông tin trong `frontend/src/components/About.jsx`
3. Sửa contact info trong `frontend/src/components/Contact.jsx`

### Projects và Blog
1. Mở `backend/main.go`
2. Cập nhật arrays `projects` và `blogPosts` với dữ liệu của bạn

### Colors và Theme
Sửa biến CSS trong `frontend/src/index.css`:
```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #ec4899;
  /* ... */
}
```

## Build Production

### Frontend
```bash
cd frontend
npm run build
```
Files được build sẽ nằm trong thư mục `dist/`

### Backend
```bash
cd backend
go build -o portfolio-server main.go
```

## Deploy

### Frontend
- Vercel: `vercel deploy`
- Netlify: Drag & drop thư mục `dist/`
- GitHub Pages: Push thư mục `dist/`

### Backend
- Heroku
- DigitalOcean
- AWS EC2
- Google Cloud Run

## API Endpoints

```
GET  /api/projects      - Lấy danh sách projects
GET  /api/projects/:id  - Chi tiết project
GET  /api/blog          - Lấy danh sách blog posts
GET  /api/blog/:id      - Chi tiết blog post
POST /api/contact       - Gửi message
GET  /health            - Health check
```

## Tính năng nâng cao có thể thêm

- [ ] Database (PostgreSQL/MongoDB)
- [ ] Authentication & Admin panel
- [ ] File upload cho images
- [ ] Email service cho contact form
- [ ] Analytics tracking
- [ ] SEO optimization
- [ ] Progressive Web App (PWA)
- [ ] Multi-language support

## License

MIT License - Feel free to use this for your own portfolio!

## Liên hệ

Nếu có câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ qua email hoặc tạo issue trên GitHub.

---

Made with ❤️ and ☕
