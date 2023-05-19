package Models

import (
	"github.com/hsk9169/gin_demo/Config"
	"github.com/hsk9169/gin_demo/Models/Schema"
	"github.com/hsk9169/gin_demo/Validations"
)

func LinkCreate(request *Validations.LinkCreate) (err error) {
	if err = Config.DB.Table("links").Create(request).Error; err != nil {
		return err
	}
	return nil
}

func LinkFetchWithShortId(link *Schema.Link, shortId string) (err error) {
	if err = Config.DB.Where("short_id = ?", shortId).First(link).Error; err != nil {
		return err
	}
	return nil
}