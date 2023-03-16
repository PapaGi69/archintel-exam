# Rest-api

By Reginald San Jose

Create a RESTful web service that provides CRUD (Create, Read, Update, Delete) operations for a user
resource and article resource. The user resource should have the following properties: id, name(text),
email(text), and phone(text). The article resource should have the following properties: id, title(text),
date(date), summary (long text), content (long text), and status(enum[“pending”,”published”]).

Tech Stack:
NestJs, MongoDB(Mongoose), JWT Guard

Installation

1. Run on terminal "npm install"

2. Run the program "npm run start"

3. The program is now running on http://localhost:4000/

The postman collection is within the repository titled "ARCHINTEL EXAM.postman_collection.json" import
the json to POSTMAN.

Testing

1. Create a user with the following input. Example:

POST:http://localhost:4000/users/

{
    "name": "ArchIntel",
    "email": "archintel@gmail.com",
    "phone": "09167238484",
    "password": "password"
}

2. Use the created email as username and password as password on Login to generate an access token

Post:http://localhost:4000/auth/login

{
    "username": "exam@gmail.com",
    "password": "password"
}

3. Use the generated access token as bearer token Authorization on all the APIs.
![image](https://user-images.githubusercontent.com/112599286/224545204-7531f374-b329-4509-9792-2ac73cd3f056.png)

Thank You! Please message me for any questions.
