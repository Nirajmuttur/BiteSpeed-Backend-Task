
# BiteSpeed Backend Task


## Deployment

Link to deployed project

```bash
  https://bitespeed-backend-task-n27o.onrender.com/api-docs
```


## API Reference

#### Create New Identity

```http
  POST /api/identity
```

```http
Example Request:

{
    "email": "testuser@gmail.com",
    "phoneNumber": 789456
}
```

```http
Example Response:

{
    "statusCode": 200,
    "data": {
        "contact": {
            "primaryContactId": 40,
            "emails": [
                "testuser@gmail.com"
            ],
            "phoneNumbers": [
                "789456"
            ],
            "secondaryContactIds": []
        }
    },
    "message": "Success",
    "success": true
}
```




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`POSTGRES_USER`

`POSTGRES_PASSWORD`

`POSTGRES_DATABASE`

`POSTGRES_HOST`

`POSTGRES_PORT`


## Run Locally

Clone the project

```bash
  git clone https://github.com/Nirajmuttur/BiteSpeed-Backend-Task
```

Go to the project directory

```bash
  cd BiteSpeed-Backend-Task
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start-dev
```


## Tech Stack

**Server:** Node, Express, PostgreSQL

