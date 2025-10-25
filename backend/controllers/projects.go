package controllers

import (
	"net/http"
	"portfolio-backend/database"

	"github.com/gin-gonic/gin"
)

func GetProjects(c *gin.Context) {
	var projects []database.Project

	category := c.Query("category")
	query := database.DB.Order("order DESC, created_at DESC")

	if category != "" && category != "all" {
		query = query.Where("category = ?", category)
	}

	if err := query.Find(&projects).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch projects"})
		return
	}

	c.JSON(http.StatusOK, projects)
}

func GetProjectByID(c *gin.Context) {
	id := c.Param("id")
	var project database.Project

	if err := database.DB.First(&project, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	c.JSON(http.StatusOK, project)
}

func CreateProject(c *gin.Context) {
	var project database.Project

	if err := c.ShouldBindJSON(&project); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Create(&project).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create project"})
		return
	}

	c.JSON(http.StatusCreated, project)
}

func UpdateProject(c *gin.Context) {
	id := c.Param("id")
	var project database.Project

	if err := database.DB.First(&project, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	if err := c.ShouldBindJSON(&project); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Save(&project).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update project"})
		return
	}

	c.JSON(http.StatusOK, project)
}

func DeleteProject(c *gin.Context) {
	id := c.Param("id")

	if err := database.DB.Delete(&database.Project{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete project"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Project deleted successfully"})
}
