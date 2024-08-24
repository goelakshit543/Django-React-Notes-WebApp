import React, { useState } from "react";

const EmailForm = () => {
  const [senderEmail, setSenderEmail] = useState("");
  const [recipientEmails, setRecipientEmails] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailData = {
      sender_email: senderEmail,
      recipient_emails: recipientEmails.split(",").map((email) => email.trim()), // Convert to array
      subject,
      body,
    };

    fetch("/send-emails/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Emails sent successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to send emails.");
      });
  };

  return (
    <div>
      <h2>Compose Email</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Sender Email:</label>
          <input
            type="email"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Recipient Emails (comma-separated):</label>
          <input
            type="text"
            value={recipientEmails}
            onChange={(e) => setRecipientEmails(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
};

export default EmailForm;
