package server

import (
	"fmt"
	"net/http"
)

func Hendler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Server is already done"))
}

func RunServer() {
	http.HandleFunc("/", Hendler)
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println("Ошибка бинда сервера на порту 8080")
	}

}
