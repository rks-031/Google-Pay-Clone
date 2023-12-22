_I have inculcated Postman to make HTTP requests to the server(http://localhost:4000) in order to interact with the G-Pay clone_

## Postman Working for Google-Pay-Clone:

# Create a New Request:

Open Postman and create a new request by clicking on the "New" button and selecting "Request."

# Set Request Details:

Enter a name for your request (e.g., "Google Pay Clone").
Choose the HTTP method (e.g., POST or GET) depending on the operation you want to perform (login, transfer, or display information).

# Enter Request URL:

Set the request URL to http://localhost:4000/login for login,
http://localhost:4000/transfer for a fund transfer,
or http://localhost:4000/user/{phoneNum} for displaying user information.

# Set Request Headers:

If needed, set the Content-Type header to application/json to indicate that you are sending JSON data in the request body.

# Enter Request Body (for POST requests):

_For login, use:_
{
"phoneNum": "1234567890",
"initialAmount": 1000
}

_For transfer, use:_
{
"from": "1234567890",
"to": "9876543210",
"amount": 500
}

_For display information, leave the body empty for GET requests._

# Send the Request:

Click on the "Send" button to make the request.

# View Response:

Postman will display the response received from your server.

_Repeat the process with different requests to test login, fund transfer, and display information functionalities._
