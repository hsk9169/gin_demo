package Models

import (
	"github.com/hsk9169/gin_demo/Config"
	"github.com/hsk9169/gin_demo/Models/Schema"
	"github.com/hsk9169/gin_demo/Validations"
)

func UserCreate(request *Validations.UserCreate) (err error) {
	if err = Config.DB.Table("test_users").Create(request).Error; err != nil {
		return err
	}
	return nil
}

func UserFetchWithEmailAddr(user *Schema.User, email string) (err error) {
	if err = Config.DB.Where("email = ?", email).First(user).Error; err != nil {
		return err
	}
	return nil
}