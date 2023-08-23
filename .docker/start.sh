#!/bin/bash

# Build the NestJS application image
docker build -t space-api .

# Create a custom network
docker network create space

# Start the MongoDB container in the custom network
docker run --name space-db -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=ebd123 -e MONGO_INITDB_DATABASE=space -p 27017:27017 -d --network space mongo

# Read MONGO_URI from .env file
MONGO_URI=$(grep -o 'MONGO_URI=.*' .env | cut -d '=' -f2)

# Start the NestJS application container in the custom network
docker run -d --name space -p 3000:3000 -e MONGO_URI=$MONGO_URI --network space space-api npm start
