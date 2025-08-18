package main

import (
	"ToDo-API/database"
	"ToDo-API/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	database.Connect()

	// Создаём роутер
	server := gin.New()

	// Логирование и recovery
	server.Use(gin.Logger())
	server.Use(gin.Recovery())

	// CORS middleware — добавь ЕЩЁ ДО роутов
	server.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type")

		// Обработка preflight-запросов (OPTIONS)
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Роуты
	server.GET("/tasks", handlers.GetTasks)
	server.POST("/tasks", handlers.CreateTask)

	// Запуск
	server.Run(":8080")
}