package controllers

import (
	"net/http"
	"portfolio-backend/database"
	"portfolio-backend/services"

	"github.com/gin-gonic/gin"
)

type ContactRequest struct {
	Name    string `json:"name" binding:"required"`
	Email   string `json:"email" binding:"required,email"`
	Subject string `json:"subject" binding:"required"`
	Message string `json:"message" binding:"required"`
}

func SendContactMessage(c *gin.Context) {
	var req ContactRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Save to database
	contactMsg := database.ContactMessage{
		Name:    req.Name,
		Email:   req.Email,
		Subject: req.Subject,
		Message: req.Message,
	}

	if err := database.DB.Create(&contactMsg).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save message"})
		return
	}

	// Send email notification
	go services.SendContactEmail(req.Name, req.Email, req.Subject, req.Message)

	c.JSON(http.StatusOK, gin.H{
		"message": "Thank you for your message! We'll get back to you soon.",
	})
}

func GetContactMessages(c *gin.Context) {
	var messages []database.ContactMessage

	if err := database.DB.Order("created_at DESC").Find(&messages).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch messages"})
		return
	}

	c.JSON(http.StatusOK, messages)
}

func MarkMessageAsRead(c *gin.Context) {
	id := c.Param("id")

	if err := database.DB.Model(&database.ContactMessage{}).Where("id = ?", id).Update("read", true).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update message"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Message marked as read"})
}

func DeleteContactMessage(c *gin.Context) {
	id := c.Param("id")

	if err := database.DB.Delete(&database.ContactMessage{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete message"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Message deleted successfully"})
}
