package Schema

import "time"

type User struct {
	Email		string `gorm:"unique;not null"`
	Name   		string `gorm:"not null"`
	Password	string `gorm:"not null"`
	CreatedAt   time.Time `sql:"DEFAULT:current_timestamp"`
}

func (b *User) TableName() string {
	return "test_users"
}