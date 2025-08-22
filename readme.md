# To-Do API на Go

> REST API для управления списком задач — создано с использованием Go, Gin, GORM и SQLite.

[![Go](https://img.shields.io/badge/Go-1.22-blue)](https://golang.org)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

##  Описание
пет API для изучения Go, REST API и баз данных.

---

##  Функции
-  Добавление задачи (`POST /tasks`)
-  Получение всех задач (`GET /tasks`)
- Удаление задач (`DELETE /tasks`)
## Пример POST запроса
``` - curl -X POST http://localhost:8080/tasks ^     -H "Content-Type: application/json" ^     -d "{\"title\":\"Шапка\",\"description\":\"Описание\"}" ```
---

##  Технологии
- **Golang** — язык программирования
- **Gin** — веб-фреймворк
- **GORM** — ORM для работы с БД
- **SQLite** — локальная база данных
- **JSON** — формат обмена данными

---

## Установка и запуск

### 1. Клонируй репозиторий
```bash
git clone https://github.com/ipvHEEL/ToDo-API.git
cd ToDo-API
go mod tidy
go run main.go
```
