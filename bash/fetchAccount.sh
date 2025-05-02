#!/bin/bash

# Set the API endpoint
API_URL="https://gw-1.api.test.piertwo.io/account"

# Set your API key
API_KEY="your-api-key"

# Make the GET request using curl with API key header
response=$(curl -s -w "\n%{http_code}" \
    -H "api-key: $API_KEY" \
    "$API_URL")

# Split the response into body and status code
body=$(echo "$response" | sed '$d')
status_code=$(echo "$response" | tail -n 1)

# Check if the request was successful
if [ "$status_code" -eq 200 ]; then
    echo "Request successful!"
    echo "Response:"
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
else
    echo "Request failed with status code: $status_code"
    echo "Error response:"
    echo "$body"
    exit 1
fi
