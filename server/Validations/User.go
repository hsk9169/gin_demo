package Validations

type UserCreate struct {
	Email		string `json:"email" binding:"required,email"`
	Name		string `json:"name" binding:"required,max=255`
	Password	string `json:"password" binding:"required,gte=8,max=255"`
}

type Login struct {
	Email		string `json:"email" binding:"required,email"`
	Password	string `json:"password" binding:"required,gte=8,max=255"`
}
