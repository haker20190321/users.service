#!/bin/bash

docker run -d --rm \
    --name users_db \
    -p 5432:5432 \
    -e POSTGRES_PASSWORD=test_user \
    -e POSTGRES_USER=test_user \
    -e POSTGRES_DB=users \
    postgres:latest