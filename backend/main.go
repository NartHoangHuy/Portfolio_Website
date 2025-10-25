package main

import (
	"log"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"portfolio-backend/controllers"
	"portfolio-backend/database"
	"portfolio-backend/middleware"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Connect to database
	database.ConnectDB()
	database.MigrateDB()

	// Initialize Gin router
	router := gin.Default()

	// CORS configuration
	config := cors.Config{
		AllowOrigins:     []string{getEnv("FRONTEND_URL", "http://localhost:3000")},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}
	router.Use(cors.New(config))

	// Public routes
	public := router.Group("/api")
	{
		// Projects
		public.GET("/projects", controllers.GetProjects)
		public.GET("/projects/:id", controllers.GetProjectByID)

		// Blog
		public.GET("/blog", controllers.GetBlogPosts)
		public.GET("/blog/:id", controllers.GetBlogPostByID)
		public.GET("/blog/slug/:slug", controllers.GetBlogPostBySlug)

		// Contact
		public.POST("/contact", controllers.SendContactMessage)

		// Auth
		public.POST("/auth/login", controllers.Login)
		public.POST("/auth/register", controllers.Register)
	}

	// Protected admin routes
	admin := router.Group("/api/admin")
	admin.Use(middleware.AuthMiddleware())
	{
		// Profile
		admin.GET("/profile", controllers.GetProfile)

		// Projects management
		admin.POST("/projects", controllers.CreateProject)
		admin.PUT("/projects/:id", controllers.UpdateProject)
		admin.DELETE("/projects/:id", controllers.DeleteProject)

		// Blog management
		admin.POST("/blog", controllers.CreateBlogPost)
		admin.PUT("/blog/:id", controllers.UpdateBlogPost)
		admin.DELETE("/blog/:id", controllers.DeleteBlogPost)

		// Contact messages
		admin.GET("/contacts", controllers.GetContactMessages)
		admin.PUT("/contacts/:id/read", controllers.MarkMessageAsRead)
		admin.DELETE("/contacts/:id", controllers.DeleteContactMessage)

		// Image upload
		admin.POST("/upload", controllers.UploadImage)
	}

	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"message": "Server is running",
		})
	})

	// Start server
	port := getEnv("PORT", "8080")
	log.Printf("Server starting on port %s", port)
	router.Run(":" + port)
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
