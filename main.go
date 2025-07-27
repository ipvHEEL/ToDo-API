package main

import (
	"ToDo-API/database"
	"ToDo-API/server"
	"time"
)

func main() {
	database.Connect()
	go func() {
		server.RunServer()
	}()
	time.Sleep(100 * time.Millisecond)
	database.UserInput()

	select {}
}
