package database

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func ConnectDB() {
	var err error

	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		getEnv("DB_HOST", "localhost"),
		getEnv("DB_USER", "postgres"),
		getEnv("DB_PASSWORD", "postgres"),
		getEnv("DB_NAME", "portfolio_db"),
		getEnv("DB_PORT", "5432"),
		getEnv("DB_SSLMODE", "disable"),
	)

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	log.Println("Database connected successfully!")
}

func MigrateDB() {
	err := DB.AutoMigrate(
		&Project{},
		&BlogPost{},
		&ContactMessage{},
		&User{},
	)

	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	log.Println("Database migrated successfully!")
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
