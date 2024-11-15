#! /bin/bash

# Update server from git repository
echo "Get latest version from git repository"
git pull

# Build Frontend
echo "Build Frontend"
npm run build

# Update / Reset Database from database/vermietung.sql File
echo "Update Database"
php artisan tp24:update
