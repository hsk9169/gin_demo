package Middlewares

import (
	"github.com/gin-gonic/gin"
	"github.com/hsk9169/gin_demo/Services"
)

func TokenAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		err := Services.TokenValid(c.Request)
		if err != nil {
			Services.Unauthorized(c, "Token unauthorized")
			c.Abort()
			return
		}
		c.Next()
	}
}