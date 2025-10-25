package controllers

import (
	"net/http"
	"portfolio-backend/database"

	"github.com/gin-gonic/gin"
	"github.com/gosimple/slug"
)

func GetBlogPosts(c *gin.Context) {
	var posts []database.BlogPost

	query := database.DB.Order("created_at DESC")

	// Only show published posts for public
	if c.GetHeader("X-Admin-Access") == "" {
		query = query.Where("published = ?", true)
	}

	if err := query.Find(&posts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch blog posts"})
		return
	}

	c.JSON(http.StatusOK, posts)
}

func GetBlogPostByID(c *gin.Context) {
	id := c.Param("id")
	var post database.BlogPost

	if err := database.DB.First(&post, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Blog post not found"})
		return
	}

	// Increment views
	database.DB.Model(&post).Update("views", post.Views+1)

	c.JSON(http.StatusOK, post)
}

func GetBlogPostBySlug(c *gin.Context) {
	slugParam := c.Param("slug")
	var post database.BlogPost

	if err := database.DB.Where("slug = ?", slugParam).First(&post).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Blog post not found"})
		return
	}

	// Increment views
	database.DB.Model(&post).Update("views", post.Views+1)

	c.JSON(http.StatusOK, post)
}

func CreateBlogPost(c *gin.Context) {
	var post database.BlogPost

	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Generate slug from title
	if post.Slug == "" {
		post.Slug = slug.Make(post.Title)
	}

	if err := database.DB.Create(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create blog post"})
		return
	}

	c.JSON(http.StatusCreated, post)
}

func UpdateBlogPost(c *gin.Context) {
	id := c.Param("id")
	var post database.BlogPost

	if err := database.DB.First(&post, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Blog post not found"})
		return
	}

	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update slug if title changed
	if post.Slug == "" {
		post.Slug = slug.Make(post.Title)
	}

	if err := database.DB.Save(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update blog post"})
		return
	}

	c.JSON(http.StatusOK, post)
}

func DeleteBlogPost(c *gin.Context) {
	id := c.Param("id")

	if err := database.DB.Delete(&database.BlogPost{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete blog post"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Blog post deleted successfully"})
}
