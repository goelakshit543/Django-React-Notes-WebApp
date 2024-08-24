from mailjet_rest import Client
from django.conf import settings

def send_bulk_emails(sender_email, recipient_emails, subject, body):
    mailjet = Client(auth=(settings.MJ_APIKEY_PUBLIC, settings.MJ_APIKEY_PRIVATE), version='v3.1')
    
    messages = []
    for recipient in recipient_emails:
        messages.append({
            "From": {
                "Email": sender_email,
                "Name": "Your Name"  # Modify as needed
            },
            "To": [
                {
                    "Email": recipient['email'],
                    "Name": recipient['name']
                }
            ],
            "Subject": subject,
            "TextPart": body,  # Plain text version of the email
            "HTMLPart": f"<p>{body}</p>"  # HTML version of the email, modify as needed
        })

    data = {
        'Messages': messages
    }

    result = mailjet.send.create(data=data)
    return result.status_code, result.json()
