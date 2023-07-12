package Services

import (
	"net/http"
	"strings"
	"fmt"
	"os"
	"time"
	"github.com/dgrijalva/jwt-go"
	"github.com/twinj/uuid"

	"github.com/hsk9169/gin_demo/Config"
)

type TokenDetails struct {
	AccessToken 	string
	RefreshToken 	string
	AccessUuid 		string
	RefreshUuid 	string
	AtExpires 		int64
	RtExpires 		int64
}

type AccessDetails struct {
	AccessUuid 	string
	UserEmail	string
}

func CreateToken(email string) (*TokenDetails, error) {
	td := &TokenDetails{}

  	td.AtExpires = time.Now().Add(time.Minute * 1).Unix()
  	td.AccessUuid = uuid.NewV4().String()
 
  	td.RtExpires = time.Now().Add(time.Hour * 24 * 7).Unix()
  	td.RefreshUuid = uuid.NewV4().String()
 
  	var err error
  	//Creating Access Token
  	atClaims := jwt.MapClaims{}
  	atClaims["authorized"] = true
  	atClaims["access_uuid"] = td.AccessUuid
  	atClaims["user_email"] = email
  	atClaims["exp"] = td.AtExpires
  	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
  	td.AccessToken, err = at.SignedString([]byte(os.Getenv("ACCESS_SECRET_KEY")))
  	if err != nil {
  	   return nil, err
  	}
  	//Creating Refresh Token
  	rtClaims := jwt.MapClaims{}
  	rtClaims["refresh_uuid"] = td.RefreshUuid
  	rtClaims["user_email"] = email
  	rtClaims["exp"] = td.RtExpires
  	rt := jwt.NewWithClaims(jwt.SigningMethodHS256, rtClaims)
  	td.RefreshToken, err = rt.SignedString([]byte(os.Getenv("REFRESH_SECRET_KEY")))
  	if err != nil {
  	   return nil, err
  	}
  	return td, nil
}

func CreateAuth(email string, td *TokenDetails) error {
    at := time.Unix(td.AtExpires, 0)
    rt := time.Unix(td.RtExpires, 0)
    now := time.Now()
 
    errAccess := Config.CACHE.Set(td.AccessUuid, email, at.Sub(now)).Err()
    if errAccess != nil {
        return errAccess
    }
    errRefresh := Config.CACHE.Set(td.RefreshUuid, email, rt.Sub(now)).Err()
    if errRefresh != nil {
        return errRefresh
    }
	fmt.Println(td.AccessUuid)
    return nil
}

func ExtractToken(r *http.Request) string {
	bearToken := r.Header.Get("Authorization")
	strArr := strings.Split(bearToken, " ")
	if len(strArr) == 2 {
		return strArr[1]
	}
	return ""
}

func VerifyToken(r *http.Request) (*jwt.Token, error) {

	tokenStr := ExtractToken(r)
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("ACCESS_SECRET_KEY")), nil
	})
	if err != nil {
		return nil, err
	}
	return token, nil
}

func TokenValid(r *http.Request) error {
	token, err := VerifyToken(r)
	if err != nil {
		return err
	}
	if _, ok := token.Claims.(jwt.Claims); !ok && !token.Valid {
		return err
	}
	return nil
}

func ExtractTokenMetadata(r *http.Request) (*AccessDetails, error) {
	token, err := VerifyToken(r)
	if err != nil {
		return nil, err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if ok && token.Valid {
		accessUuid, ok := claims["access_uuid"].(string)
		if !ok {
			return nil, err
		}
		return &AccessDetails {
			AccessUuid: accessUuid,
			UserEmail: claims["user_email"].(string),
		}, nil
	}
	return nil, err
}

func FetchAuth(authD *AccessDetails) (string, error) {
	email, err := Config.CACHE.Get(authD.AccessUuid).Result()
	if err != nil {
		return "", err
	}
	return email, nil
}

func DeleteAuth(uuid string) (int64, error) {
	deleted, err := Config.CACHE.Del(uuid).Result()
	if err != nil {
		return 0, err
	}
	return deleted, nil
}