package Controllers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/hsk9169/gin_demo/Models"
	"github.com/hsk9169/gin_demo/Models/Schema"
	"github.com/hsk9169/gin_demo/Services"
	"github.com/hsk9169/gin_demo/Validations"
)

func UserCreate(c *gin.Context) {
	body := Validations.UserCreate{}
	if requestErr := c.ShouldBindJSON(&body); requestErr != nil {
		Services.ValidationError(c, "Body parameter is wrong!")
		return
	}

	hash, err := Services.HashPassword(body.Password)
	if err != nil {
		Services.InternalError(c, "Internal error occurred!")
		return
	}
	body.Password = hash
	
	saveErr := Models.UserCreate(&body)
	if saveErr != nil {
		Services.BadRequest(c, "Email Duplicated")
	} else {
		Services.Created(c, "User created", body)
	}
}

func UserLogin(c *gin.Context) {
	body := Validations.Login{}
	if requestErr := c.ShouldBindJSON(&body); requestErr != nil {
		Services.ValidationError(c, "Body parameter is wrong!")
		return
	}

	var user Schema.User
	err := Models.UserFetchWithEmailAddr(&user, body.Email)
	if err != nil {
		Services.BadRequest(c, "No user found")
		return
	}

	check := Services.CheckPasswordHash(body.Password, user.Password)
	if (!check) {
		Services.BadRequest(c, "Password incorrect")
		return
	}
	
	token, err := Services.CreateToken(user.Email)
	if err != nil {
		Services.InternalError(c, "Token not created!")
		return
	}

	saveErr := Services.CreateAuth(user.Email, token)
	if saveErr != nil {
		Services.InternalError(c, "Auth not created!")
		return
	}

	tokens := map[string]string {
		"access_token": token.AccessToken,
		"refresh_token": token.RefreshToken,
	}
	
	Services.Success(c, "Login succeeded", tokens)
}

func UserData(c *gin.Context) {
	fmt.Println(c.Request.URL.Query())
	data := map[string]string {
		"data": "data",
	}
	Services.Success(c, "Data fetched", data)
}

func UserLogout(c *gin.Context) {
	auth, err := Services.ExtractTokenMetadata(c.Request)
	if err != nil {
		Services.Unauthorized(c, "Access-token unauthorized")
		return
	}

	deleted, err := Services.DeleteAuth(auth.AccessUuid)
	if err != nil || deleted == 0 {
		Services.Unauthorized(c, "Refresh-token unauthorized")
		return
	}

	Services.Success(c, "Logout succeeded", nil)
}