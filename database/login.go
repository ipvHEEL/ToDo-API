package database

import (
	"fmt"
	"log"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

func UserInput() {
	var n, p string
	fmt.Println("Введите логин")
	fmt.Scanf("%s", &n)
	fmt.Println("Введите пароль")
	fmt.Scanf("%s", &p)
	p, _ = HashPassword(p)
	UserInit(n, p)
}

func UserInit(name string, pass string) {
	user := User{
		UserName:     name,
		PasswordHash: pass,
	}
	DB.Create(&user)
	var users []User
	DB.Find(&users)

	for _, user := range users {
		log.Printf("ID: %d, Имя: %s", user.ID, user.UserName)
	}
}
