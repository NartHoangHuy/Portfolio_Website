package services

import (
	"bytes"
	"fmt"
	"html/template"
	"log"
	"os"

	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

type EmailData struct {
	Name    string
	Email   string
	Subject string
	Message string
}

func SendContactEmail(name, email, subject, message string) {
	apiKey := os.Getenv("SENDGRID_API_KEY")
	if apiKey == "" {
		log.Println("SendGrid API key not configured")
		return
	}

	from := mail.NewEmail("Portfolio Contact", os.Getenv("FROM_EMAIL"))
	to := mail.NewEmail("Admin", os.Getenv("TO_EMAIL"))

	data := EmailData{
		Name:    name,
		Email:   email,
		Subject: subject,
		Message: message,
	}

	htmlContent := generateEmailTemplate(data)
	plainContent := fmt.Sprintf(
		"New contact message from %s (%s)\n\nSubject: %s\n\nMessage:\n%s",
		name, email, subject, message,
	)

	msg := mail.NewSingleEmail(from, "New Contact Form Submission: "+subject, to, plainContent, htmlContent)
	client := sendgrid.NewSendClient(apiKey)

	response, err := client.Send(msg)
	if err != nil {
		log.Printf("Failed to send email: %v", err)
		return
	}

	if response.StatusCode >= 200 && response.StatusCode < 300 {
		log.Println("Email sent successfully")
	} else {
		log.Printf("Email send failed with status: %d", response.StatusCode)
	}
}

func generateEmailTemplate(data EmailData) string {
	tmpl := `
	<!DOCTYPE html>
	<html>
	<head>
		<style>
			body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
			.container { max-width: 600px; margin: 0 auto; padding: 20px; }
			.header { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
			.content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
			.info-row { margin: 15px 0; padding: 10px; background: white; border-radius: 4px; }
			.label { font-weight: bold; color: #6366f1; }
			.message-box { background: white; padding: 20px; border-left: 4px solid #6366f1; margin-top: 20px; }
		</style>
	</head>
	<body>
		<div class="container">
			<div class="header">
				<h2>New Contact Form Submission</h2>
			</div>
			<div class="content">
				<div class="info-row">
					<span class="label">Name:</span> {{.Name}}
				</div>
				<div class="info-row">
					<span class="label">Email:</span> {{.Email}}
				</div>
				<div class="info-row">
					<span class="label">Subject:</span> {{.Subject}}
				</div>
				<div class="message-box">
					<p class="label">Message:</p>
					<p>{{.Message}}</p>
				</div>
			</div>
		</div>
	</body>
	</html>
	`

	t, _ := template.New("email").Parse(tmpl)
	var buf bytes.Buffer
	t.Execute(&buf, data)
	return buf.String()
}
