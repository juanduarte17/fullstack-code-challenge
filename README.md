# How to Run Application

## Requirements

- Docker
    - [Docker for Windows](https://docs.docker.com/docker-for-windows/install/)
    - [Docker for Mac](https://docs.docker.com/docker-for-mac/install/)

## Start the application

:grey_exclamation: *Note*: `sudo` might not be need on Windows

```bash
# Build Docker images
sudo docker-compose build

# Start Docker services
sudo docker-compose up

# Stop Docker services
sudo docker-compose down
```

# Code Challenge
You have 48 hours to build a simple RESTful API. The API must be written in Node.js, and you may use any tools that you would like (frameworks, packages, etc.).

- All responses should be JSON
- All requests should be JSON

Additionally, you will design a React frontend to display data from the API.

## Description of Application

The application consists of **users** and **products**.

### Users

Each user must have, but is not limited to:

- ID
- First Name
- Last Name
- Email (unique)

**Please note:**

- These users are the only users that are able to make requests via the API.
- User creation/maintenance is not done through the API (see Database section below).
- Users can own many products

### Products

Each product must have, but is not limited to:

- ID
- Name
- Description
- Price
- Image

### Database

- Postgres
- All tables in the database must be created programatically
- The user table should be seeded with five (5) users

### Authentication

You must implement an authentication system so that the API knows which of the users is making the request. All requests should ensure that an authorized user is making the request. In the event of an unauthorized user, an error should be thrown.

### Requests

The following requests should be implemented:

- Add product
    - All fields required except ID and image
- Update product
    - All fields required except image
- Delete product
- Get product
- Upload product image
- Get list of all products
- Attach product to requesting user
- Remove product from requesting user
- List products attached to requesting user

### Frontend

Display a list of users with pagination. Additionally display the products a user owns in anyway you see fit.

Please note: The frontend does NOT need to be able to create, edit, or delete data.

### Tests

You should write tests to back up your code. You are free to use any testing tools or frameworks you like.

## Completion

When you are finished (or out of time) you will push up the application to a git repo. Then please notify Thomas Kane via email (thomas@pumpjackdataworks.com) with the subject Pumpjack Code Challenge and the link to the github repo. Please include:

- Instructions on how to create and seed database tables
- Instructions on how authentication works
- Anything else you think Thomas should know to run the application (if anything)

Thomas is available for any questions you may have via email at thomas@pumpjackdataworks.com.

![Good Luck](https://media.giphy.com/media/3ohfFopqHDT7vcMM2A/giphy.gif)