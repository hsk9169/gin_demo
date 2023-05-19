package Schema

import "time"

type Link struct {
	Id 			uint
	ShortId   	string `gorm:"unique;not null"`
	OriginalId 	string `gorm:"not null"`
	FetchCount	uint
	CreatedAt   time.Time `sql:"DEFAULT:current_timestamp"`
}

func (b *Link) TableName() string {
	return "links"
}