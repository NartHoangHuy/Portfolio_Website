package database

import (
	"time"

	"gorm.io/gorm"
)

type Project struct {
	ID           uint           `gorm:"primaryKey" json:"id"`
	Title        string         `gorm:"not null" json:"title"`
	Description  string         `gorm:"type:text" json:"description"`
	Image        string         `json:"image"`
	Technologies []string       `gorm:"type:text[];serializer:json" json:"technologies"`
	Category     string         `gorm:"not null" json:"category"`
	GithubURL    string         `json:"githubUrl"`
	LiveURL      string         `json:"liveUrl,omitempty"`
	Featured     bool           `gorm:"default:false" json:"featured"`
	Order        int            `gorm:"default:0" json:"order"`
	CreatedAt    time.Time      `json:"createdAt"`
	UpdatedAt    time.Time      `json:"updatedAt"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

type BlogPost struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	Title     string         `gorm:"not null" json:"title"`
	Slug      string         `gorm:"uniqueIndex;not null" json:"slug"`
	Excerpt   string         `gorm:"type:text" json:"excerpt"`
	Content   string         `gorm:"type:text" json:"content"`
	Image     string         `json:"image"`
	Category  string         `gorm:"not null" json:"category"`
	Tags      []string       `gorm:"type:text[];serializer:json" json:"tags"`
	Author    string         `gorm:"not null" json:"author"`
	ReadTime  string         `json:"readTime"`
	Published bool           `gorm:"default:false" json:"published"`
	Views     int            `gorm:"default:0" json:"views"`
	CreatedAt time.Time      `json:"date"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type ContactMessage struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	Name      string         `gorm:"not null" json:"name"`
	Email     string         `gorm:"not null" json:"email"`
	Subject   string         `gorm:"not null" json:"subject"`
	Message   string         `gorm:"type:text;not null" json:"message"`
	Read      bool           `gorm:"default:false" json:"read"`
	CreatedAt time.Time      `json:"createdAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type User struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	Username  string         `gorm:"uniqueIndex;not null" json:"username"`
	Email     string         `gorm:"uniqueIndex;not null" json:"email"`
	Password  string         `gorm:"not null" json:"-"`
	Role      string         `gorm:"default:'admin'" json:"role"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}
