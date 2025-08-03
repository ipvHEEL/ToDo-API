package main

import (
	"ToDo-API/database"
	"ToDo-API/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	database.Connect()

	server := gin.Default()

	server.GET("/tasks", handlers.GetTasks)
	server.POST("/tasks", handlers.CreateTask)
	server.Run(":8080")
}
