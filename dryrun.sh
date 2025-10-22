# !/bin/bash
# Bash script for pushing and putting containers to production
# echo Dry run Docker

echo Please enter version number!
read v
echo your version number is $v
# Build docker containers
echo docker build -t alpin:$v .
docker build -t alpin:$v .
# Push to Googlce cloud
docker run --rm -p 3000:3000 alpin:$v
# Ask the user for their name
# echo "Hello, who am I talking to?"
# read varname
# echo "It\'s nice to meet you $varname"
