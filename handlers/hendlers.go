package handlers

import (
	"ToDo-API/database"
	"ToDo-API/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetTasks(c *gin.Context) {
	var tasks []models.Task
	database.DB.Find(&tasks)
	c.JSON(http.StatusOK, tasks)
}

func CreateTask(c *gin.Context) {
	var tasks models.Task
	if err := c.ShouldBindJSON(&tasks); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&tasks)
	c.JSON(http.StatusOK, tasks)
}

// func DeleteTask(c *gin.Connect) {
// 	var tasks models.tasks
// 	database.DB.DeleteTask(&tasks)
// 	c.JSON(http.StatusOK, tasks)
// }