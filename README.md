# Chat-App-Task
## Getting Started

To run this project on your local machine, follow the steps below:

### Prerequisites

- Node.js (v12 or above)
- MongoDB (Make sure MongoDB is installed and running locally or provide a remote MongoDB URI)

### Installation

1. Clone the repository to your local machine:

```bash
git clone 
cd Backend

Install the required dependencies:
npm install

Start the server:
npm start

The server will start running at http://localhost:3000.

API Endpoints
User Registration: POST /users/register
User Login: POST /users/login
Send Message: POST /messages/send
Get Messages between Users: GET /messages/messages
Update Message: PUT /messages/:messageId
Delete Message: DELETE /messages/:messageId


Usage
Register a new user by sending a POST request to /users/register with the following JSON body:

{
  "username": "your_username",
  "email": "your_email@example.com",
  "password": "your_password"
}
Log in with the registered user by sending a POST request to /users/login with the following JSON body:

{
  "username": "your_username",
  "password": "your_password"
}
Send a message from one user to another by sending a POST request to /messages/send with the following JSON body:

{
  "senderUsername": "sender_username",
  "receiverUsername": "receiver_username",
  "content": "Hello, this is a test message!"
}
Update a message by sending a PUT request to /messages/:messageId with the new message content in the JSON body:

{
  "content": "Updated message content"
}
