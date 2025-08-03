package database

import (
	"ToDo-API/models"
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type User struct {
	ID           int    `gorm:"primaryKey"`
	UserName     string `gorm:"size64"`
	PasswordHash string `json:"-" gorm:"size:255"`
}

var DB *gorm.DB

func Connect() {
	var err error
	DB, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Не удалось подключиться к базе данных:", err)
	}

	DB.AutoMigrate(&models.Task{})
}
