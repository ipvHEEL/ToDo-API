FROM golang 1.24

WORKDIR /app

copy . .

RUN go build main.go -o main
CMD ["./main"]
