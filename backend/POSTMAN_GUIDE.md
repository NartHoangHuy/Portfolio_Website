# 📬 Postman Guide - Admin CRUD Operations

## 🎯 Tổng quan các API

Backend đã có đầy đủ các API CRUD để quản lý:
- ✅ **Projects** - Quản lý dự án
- ✅ **Blog Posts** - Quản lý bài viết blog
- ✅ **Contact Messages** - Quản lý tin nhắn liên hệ
- ✅ **Image Upload** - Upload hình ảnh lên Cloudinary
- ✅ **Authentication** - Đăng nhập/đăng ký admin

---

## 🚀 Bắt đầu nhanh

### Bước 1: Tạo tài khoản Admin

**POST** `http://localhost:8080/api/auth/register`

Headers:
```
Content-Type: application/json
```

Body (raw JSON):
```json
{
  "username": "admin",
  "email": "admin@portfolio.com",
  "password": "admin123"
}
```

### Bước 2: Đăng nhập

**POST** `http://localhost:8080/api/auth/login`

Headers:
```
Content-Type: application/json
```

Body (raw JSON):
```json
{
  "username": "admin",
  "password": "admin123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzAwNTc...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@portfolio.com",
    "role": "admin"
  }
}
```

**💾 QUAN TRỌNG: Copy token này!**

---

## 📁 CRUD Projects

### 1. Xem tất cả Projects (Public)

**GET** `http://localhost:8080/api/projects`

Không cần authentication.

---

### 2. Tạo Project mới (Admin)

**POST** `http://localhost:8080/api/admin/projects`

Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

Body (raw JSON):
```json
{
  "title": "E-commerce Website",
  "description": "Full-stack online shopping platform with payment integration",
  "image_url": "https://images.unsplash.com/photo-1557821552-17105176677c?w=800",
  "github_url": "https://github.com/yourname/ecommerce",
  "live_url": "https://myshop.com",
  "technologies": ["React", "Node.js", "MongoDB", "Stripe", "Redux"]
}
```

---

### 3. Cập nhật Project (Admin)

**PUT** `http://localhost:8080/api/admin/projects/1`

Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

Body (raw JSON):
```json
{
  "title": "E-commerce Platform (Updated)",
  "description": "Advanced e-commerce platform with AI recommendations",
  "image_url": "https://images.unsplash.com/photo-1557821552-17105176677c?w=800",
  "github_url": "https://github.com/yourname/ecommerce",
  "live_url": "https://myshop.com",
  "technologies": ["React", "Node.js", "PostgreSQL", "Stripe", "Redux", "TensorFlow"]
}
```

---

### 4. Xóa Project (Admin)

**DELETE** `http://localhost:8080/api/admin/projects/1`

Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 📝 CRUD Blog Posts

### 1. Xem tất cả Blog Posts (Public)

**GET** `http://localhost:8080/api/blog`

---

### 2. Tạo Blog Post mới (Admin)

**POST** `http://localhost:8080/api/admin/blog`

Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

Body (raw JSON):
```json
{
  "title": "Getting Started with React Hooks",
  "slug": "getting-started-react-hooks",
  "excerpt": "Learn how to use React Hooks effectively in your applications. A comprehensive guide for beginners.",
  "content": "# Introduction to React Hooks\n\nReact Hooks revolutionized functional components...\n\n## useState Hook\n\nThe useState hook lets you add state to functional components:\n\n```javascript\nconst [count, setCount] = useState(0);\n```\n\n## useEffect Hook\n\nThe useEffect hook handles side effects:\n\n```javascript\nuseEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);\n```\n\n## Best Practices\n\n1. Always call hooks at the top level\n2. Only call hooks from React functions\n3. Use multiple useEffect for different concerns\n\n## Conclusion\n\nHooks make React code cleaner and more reusable!",
  "cover_image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200",
  "tags": ["React", "JavaScript", "Web Development", "Hooks", "Tutorial"],
  "published": true
}
```

---

### 3. Cập nhật Blog Post (Admin)

**PUT** `http://localhost:8080/api/admin/blog/1`

Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json
```

Body (raw JSON):
```json
{
  "title": "Advanced React Hooks Guide",
  "slug": "advanced-react-hooks-guide",
  "excerpt": "Deep dive into React Hooks with real-world examples",
  "content": "Updated content here...",
  "cover_image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200",
  "tags": ["React", "JavaScript", "Advanced", "Hooks"],
  "published": true
}
```

---

### 4. Xóa Blog Post (Admin)

**DELETE** `http://localhost:8080/api/admin/blog/1`

Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 📧 Quản lý Contact Messages

### 1. Xem tất cả Messages (Admin)

**GET** `http://localhost:8080/api/admin/contacts`

Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### 2. Đánh dấu đã đọc (Admin)

**PUT** `http://localhost:8080/api/admin/contacts/1/read`

Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### 3. Xóa Message (Admin)

**DELETE** `http://localhost:8080/api/admin/contacts/1`

Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### 4. Gửi Contact Message (Public)

**POST** `http://localhost:8080/api/contact`

Headers:
```
Content-Type: application/json
```

Body (raw JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Collaboration",
  "message": "Hi! I'm interested in collaborating on a project. Let's discuss!"
}
```

---

## 🖼️ Upload Images

**POST** `http://localhost:8080/api/admin/upload`

Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

Body (form-data):
- Key: `image`
- Type: `File`
- Value: Chọn file ảnh (JPG, PNG, etc.)

Response:
```json
{
  "url": "https://res.cloudinary.com/yourcloud/image/upload/v1234567890/abc123.jpg"
}
```

**⚠️ Lưu ý:** Cần cấu hình Cloudinary trong `.env` trước:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Đăng ký miễn phí tại: https://cloudinary.com

---

## 📦 Data mẫu để test

### Projects mẫu:

```json
{
  "title": "Task Management App",
  "description": "Collaborative task manager with real-time updates and team features",
  "image_url": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800",
  "github_url": "https://github.com/yourname/taskapp",
  "live_url": "https://taskmanager.app",
  "technologies": ["Vue.js", "Firebase", "Tailwind CSS", "Socket.io"]
}
```

```json
{
  "title": "Weather Dashboard",
  "description": "Beautiful weather visualization with forecasts and interactive maps",
  "image_url": "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800",
  "github_url": "https://github.com/yourname/weather",
  "live_url": "https://myweather.app",
  "technologies": ["React", "OpenWeather API", "Chart.js", "Leaflet"]
}
```

```json
{
  "title": "Social Media Dashboard",
  "description": "Analytics dashboard for multiple social media platforms",
  "image_url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  "github_url": "https://github.com/yourname/social-dashboard",
  "live_url": "https://socialdash.app",
  "technologies": ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind"]
}
```

### Blog Posts mẫu:

```json
{
  "title": "10 Tips for Clean Code",
  "slug": "10-tips-clean-code",
  "excerpt": "Write maintainable, readable, and professional code with these proven techniques",
  "content": "# 10 Essential Tips for Writing Clean Code\n\n## 1. Use Meaningful Names\n\nChoose descriptive names for variables and functions:\n\n```javascript\n// Bad\nconst d = new Date();\n\n// Good\nconst currentDate = new Date();\n```\n\n## 2. Keep Functions Small\n\nEach function should do one thing well...",
  "cover_image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200",
  "tags": ["Programming", "Best Practices", "Clean Code"],
  "published": true
}
```

```json
{
  "title": "Docker for Beginners",
  "slug": "docker-for-beginners",
  "excerpt": "Complete guide to containerization with Docker from scratch",
  "content": "# Getting Started with Docker\n\n## What is Docker?\n\nDocker is a platform for developing, shipping, and running applications in containers...",
  "cover_image": "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200",
  "tags": ["Docker", "DevOps", "Containers", "Tutorial"],
  "published": true
}
```

---

## 🔧 Cách sử dụng Postman

### 1. Thêm Authorization

**Cách 1 - Tab Authorization:**
1. Click tab **Authorization**
2. Type: Chọn **Bearer Token**
3. Token: Paste token từ login response

**Cách 2 - Tab Headers:**
1. Click tab **Headers**
2. Add header:
   - Key: `Authorization`
   - Value: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 2. Tạo Collection

1. New Collection → Tên: "Portfolio Admin API"
2. Thêm folder: "Auth", "Projects", "Blog", "Contact"
3. Thêm requests vào từng folder
4. Save để dùng lại

### 3. Sử dụng Variables

1. Collection Settings → Variables
2. Add variable:
   - `base_url`: `http://localhost:8080/api`
   - `token`: (paste token sau khi login)
3. Trong requests dùng: `{{base_url}}/projects`

---

## ✅ Workflow đầy đủ

1. **Register admin** → POST `/api/auth/register`
2. **Login** → POST `/api/auth/login` → Copy token
3. **Thêm token vào Authorization** trong Postman
4. **Tạo Projects** → POST `/api/admin/projects`
5. **Tạo Blog Posts** → POST `/api/admin/blog`
6. **Xem kết quả** → GET `/api/projects` và `/api/blog`
7. **Test trên Frontend** → http://localhost:3000

---

## 🐛 Xử lý lỗi

| Lỗi | Nguyên nhân | Giải pháp |
|-----|-------------|-----------|
| 400 Bad Request | JSON không hợp lệ | Kiểm tra format JSON |
| 401 Unauthorized | Token không đúng/hết hạn | Login lại |
| 409 Conflict | Dữ liệu đã tồn tại | Đổi username/email/slug |
| 500 Internal Server Error | Lỗi server | Kiểm tra backend logs |

---

## 📞 Test luồng hoàn chỉnh

```
1. Register → Get user created
2. Login → Get token
3. Create 3 projects
4. Create 2 blog posts
5. Send 1 contact message
6. Get all projects → See 3 projects
7. Get all blog posts → See 2 posts
8. Get contacts (admin) → See 1 message
9. Update project 1
10. Delete project 3
11. Mark contact as read
```

Chúc bạn test thành công! 🎉
