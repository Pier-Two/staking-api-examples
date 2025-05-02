#!/bin/bash

# Set the API endpoint
API_URL="https://gw-1.api.test.piertwo.io/solana/stake/buildTransaction"

# Set your API key
API_KEY="your-api-key"

# Create the request body
REQUEST_BODY='{
    "feePayer": "ADGZiJfmQMAYRNKGUL9phNaJaZYtFTK7xjJ2yjV3yQV8",
    "instructions": [{
        "type": "createAndDelegate",
        "input": {
            "fromPubkey": "ADGZiJfmQMAYRNKGUL9phNaJaZYtFTK7xjJ2yjV3yQV8",
            "stakeAuthority": "ADGZiJfmQMAYRNKGUL9phNaJaZYtFTK7xjJ2yjV3yQV8",
            "withdrawAuthority": "ADGZiJfmQMAYRNKGUL9phNaJaZYtFTK7xjJ2yjV3yQV8",
            "reference": "example stake account",
            "label": "example SOL stake",
            "lamports": 1000000000
        }
    }]
}'

# Make the POST request using curl with API key header and JSON content type
response=$(curl -s -w "\n%{http_code}" \
    -H "api-key: $API_KEY" \
    -H "Content-Type: application/json" \
    -X POST \
    -d "$REQUEST_BODY" \
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
