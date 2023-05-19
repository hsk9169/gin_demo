package Services

import (
	"math/rand"
)

const alphabets = "abcdefghijklmnopqrstuvwxyz"
func AlphabetHash(text string, n int) string {
	b := make([]byte, n)
    for i := range b {
        b[i] = alphabets[rand.Intn(len(alphabets))]
    }
    return string(b)
}