package main

import (
  "log"
  _"net/http"
  "fmt"

  _"github.com/gin-gonic/gin"
  "github.com/joho/godotenv"
  "gorm.io/gorm"
  "gorm.io/driver/mysql"
  "github.com/go-redis/redis/v7"

  "github.com/hsk9169/gin_demo/Config"
  "github.com/hsk9169/gin_demo/Models/Schema"
  "github.com/hsk9169/gin_demo/Routes"
)

func main() {
  err := godotenv.Load(".env")
  if err != nil {
    log.Fatal("Error .env")
  }

  Config.CACHE = redis.NewClient(Config.CacheOptions())
  if _, err := Config.CACHE.Ping().Result(); err != nil {
    errMsg := fmt.Sprintf("Failed to connect to cache : %s", err)
    panic(errMsg)
  }
  fmt.Println("Cache connection established")

  Config.DB, err = gorm.Open(mysql.Open(Config.DbURL()))
  if err != nil {
    errMsg := fmt.Sprintf("Failed to connect to database : %s", err)
    panic(errMsg)
  } 
  fmt.Println("Database connection established")

  Config.DB.AutoMigrate(
    &Schema.User{},
  )

  r := Routes.SetupRouter()
  _ = r.Run()  
}
