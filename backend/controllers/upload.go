package controllers

import (
	"net/http"

	"portfolio-backend/services"

	"github.com/gin-gonic/gin"
)

func UploadImage(c *gin.Context) {
	file, header, err := c.Request.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No file uploaded"})
		return
	}
	defer file.Close()

	folder := c.PostForm("folder")
	if folder == "" {
		folder = "portfolio"
	}

	cloudinaryService, err := services.NewCloudinaryService()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to initialize upload service"})
		return
	}

	url, err := cloudinaryService.UploadImage(file, folder)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload image"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"url":      url,
		"filename": header.Filename,
	})
}
