# 🚀 Portfolio Website - Professional Full Stack Project

> Modern, feature-rich portfolio website built with **React** (Frontend) and **Go/Gin** (Backend)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Go Version](https://img.shields.io/badge/Go-1.21+-00ADD8?logo=go)](https://go.dev/)
[![React Version](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)

---

## ✨ Features

### 🎨 **Modern UI/UX**
- ✅ Responsive design (Mobile-first)
- ✅ Dark theme với gradient colors
- ✅ Smooth animations (Framer Motion)
- ✅ Interactive components
- ✅ SEO optimized

### � **Portfolio Sections**
- ✅ **Hero**: Eye-catching introduction
- ✅ **About**: Skills showcase với icon grid
- ✅ **Projects**: Filterable project gallery
- ✅ **Blog**: Full-featured blog với detail pages
- ✅ **Contact**: Working contact form với email notifications

### 🔐 **Admin Panel**
- ✅ Secure JWT authentication
- ✅ Dashboard để quản lý projects
- ✅ Blog post management
- ✅ Contact message inbox
- ✅ Image upload integration

### 🗄️ **Database**
- ✅ PostgreSQL với GORM ORM
- ✅ Auto migrations
- ✅ Relationships & constraints
- ✅ Soft deletes

### 📧 **Email Service**
- ✅ SendGrid integration
- ✅ Automated notifications
- ✅ HTML email templates

### 🖼️ **Image Management**
- ✅ Cloudinary integration
- ✅ Automatic image optimization
- ✅ Secure upload endpoints

---

## �️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Helmet** - SEO management
- **React Icons** - Icon library

### Backend
- **Go 1.21+** - Programming language
- **Gin** - Web framework
- **GORM** - ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **SendGrid** - Email service
- **Cloudinary** - Image hosting
- **bcrypt** - Password hashing

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
