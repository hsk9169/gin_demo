package Controllers

import (
	"os"
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/dgrijalva/jwt-go"
	"github.com/hsk9169/gin_demo/Services"
)

func TokenRefresh(c *gin.Context) {
	mapToken := map[string]string{}
	if err := c.ShouldBindJSON(&mapToken); err != nil {
	   	c.JSON(http.StatusUnprocessableEntity, err.Error())
	   	return
	}
	refreshToken := mapToken["refresh_token"]
   
	token, err := jwt.Parse(refreshToken, func(token *jwt.Token) (interface{}, error) {
	   	if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
	   	}
	   	return []byte(os.Getenv("REFRESH_SECRET_KEY")), nil
	})
	if err != nil {
		Services.Unauthorized(c, "Refresh-token expired")
	   	return
	}
	if _, ok := token.Claims.(jwt.Claims); !ok && !token.Valid {
		Services.Unauthorized(c, err)
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if ok && token.Valid {
	   	refreshUuid, ok := claims["refresh_uuid"].(string)
	   	if !ok {
			Services.ValidationError(c, "Body parameter is wrong!")
			return
	   	}
	   	deleted, delErr := Services.DeleteAuth(refreshUuid)
	   	if delErr != nil || deleted == 0 { 
			Services.Unauthorized(c, "unauthorized")
		  	return
	   	}
	   	ts, createErr := Services.CreateToken(claims["user_email"].(string))
	   	if  createErr != nil {
		  	c.JSON(http.StatusForbidden, createErr.Error())
		  	return
	   	}
   		saveErr := Services.CreateAuth(claims["user_email"].(string), ts)
   		if saveErr != nil {
			c.JSON(http.StatusForbidden, saveErr.Error())
			return
   		}
   		tokens := map[string]string{
			"access_token":  ts.AccessToken,
			"refresh_token": ts.RefreshToken,
   		}
		Services.Success(c, "Token created", tokens)
	} else {
		Services.Unauthorized(c, "refresh expired")
	}
  }