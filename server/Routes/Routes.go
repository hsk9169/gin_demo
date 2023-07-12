package Routes
import (
	_"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_"net/http"

	"github.com/hsk9169/gin_demo/Controllers"
	"github.com/hsk9169/gin_demo/Middlewares"
)

func SetupRouter() *gin.Engine {
	route := gin.Default()

	route.Use(corsMiddleware())

	route.POST("/register", Controllers.UserCreate)
	route.POST("/login", Controllers.UserLogin)
	route.GET("/userData", Middlewares.TokenAuthMiddleware(), Controllers.UserData)
	route.POST("/logout", Middlewares.TokenAuthMiddleware(), Controllers.UserLogout)
	route.POST("/token/refresh", Controllers.TokenRefresh)

	return route
}

func corsMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
        c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }

        c.Next()
    }
}