package Validations

type LinkCreate struct {
	OriginalId   string `json:"url" binding:"required"`
	ShortId		 string
}