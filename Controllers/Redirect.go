package Controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/hsk9169/gin_demo/Services"
	"github.com/hsk9169/gin_demo/Models"
	"github.com/hsk9169/gin_demo/Models/Schema"
)

func RedirectWithShortId(c *gin.Context) {
	shortId := c.Param("short_id")

	var link Schema.Link
	err := Models.LinkFetchWithShortId(&link, shortId)
	if err != nil {
		Services.InternalError(c, "Internal error occurred!")
	} else {
		Services.RedirectLink(c, link.OriginalId)
	}
}