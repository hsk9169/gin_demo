package Routes
import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"net/http"

	"github.com/hsk9169/gin_demo/Controllers"
)

func SetupRouter() *gin.Engine {
	route := gin.Default()

	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowCredentials = true
	route.Use(cors.New(config))

	route.GET("/", func(context *gin.Context) {
		context.JSON(http.StatusOK, gin.H{"data": "Hello World"})
	})

	route.POST("short-links", Controllers.LinkCreate)
	route.GET("short-links/:short_id", Controllers.LinkFetchWithShortId)
	route.GET("r/:short_id", Controllers.RedirectWithShortId)

	return route
}