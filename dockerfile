FROM golang 1.24

WORKDIR /app

copy . .

RUN go build -o main
CMD ["./main"]