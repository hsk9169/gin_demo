package Controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/hsk9169/gin_demo/Models"
	"github.com/hsk9169/gin_demo/Models/Schema"
	"github.com/hsk9169/gin_demo/Services"
	"github.com/hsk9169/gin_demo/Validations"
)

func LinkCreate(c *gin.Context) {
	var request Validations.LinkCreate
	if requestErr := c.ShouldBind(&request); requestErr != nil {
		Services.ValidationError(c, "Body parameter is missing!")
		return
	}

	request.ShortId = Services.AlphabetHash(request.OriginalId, 7)
	
	saveErr := Models.LinkCreate(&request)
	if saveErr != nil {
		Services.InternalError(c, "Internal error occurred!")
	} else {
		Services.Created(c, "Created", request)
	}
}

func LinkFetchWithShortId(c *gin.Context) {
	shortId := c.Param("short_id")

	var link Schema.Link
	err := Models.LinkFetchWithShortId(&link, shortId)
	if err != nil {
		Services.NoContent(c, "No Content Found!", nil)
	} else {
		Services.Success(c, nil, link)
	}
}