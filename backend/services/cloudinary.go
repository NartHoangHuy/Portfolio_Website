package services

import (
	"context"
	"io"
	"log"
	"os"
	"time"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
)

type CloudinaryService struct {
	cld *cloudinary.Cloudinary
}

func NewCloudinaryService() (*CloudinaryService, error) {
	cld, err := cloudinary.NewFromParams(
		os.Getenv("CLOUDINARY_CLOUD_NAME"),
		os.Getenv("CLOUDINARY_API_KEY"),
		os.Getenv("CLOUDINARY_API_SECRET"),
	)

	if err != nil {
		return nil, err
	}

	return &CloudinaryService{cld: cld}, nil
}

func (s *CloudinaryService) UploadImage(file io.Reader, folder string) (string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	uploadResult, err := s.cld.Upload.Upload(ctx, file, uploader.UploadParams{
		Folder:         folder,
		Transformation: "q_auto,f_auto",
	})

	if err != nil {
		log.Printf("Failed to upload image: %v", err)
		return "", err
	}

	return uploadResult.SecureURL, nil
}

func (s *CloudinaryService) DeleteImage(publicID string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := s.cld.Upload.Destroy(ctx, uploader.DestroyParams{
		PublicID: publicID,
	})

	return err
}
