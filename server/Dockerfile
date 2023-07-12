FROM golang:alpine AS build

COPY . /go/src/demo
WORKDIR /go/src/demo

RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build  -o /app

FROM scratch
COPY --from=build /app .
COPY .env . 

EXPOSE 8080
CMD ["/app"]
