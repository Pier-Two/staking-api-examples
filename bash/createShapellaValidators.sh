#!/bin/bash

# Set the API endpoint
API_URL="https://gw-1.api.test.piertwo.io/ethereum/stakeV2"

# Set your API key
API_KEY="your-api-key"

# Create the request body
REQUEST_BODY='{
    "validatorCount": 2,
    "withdrawalAddress": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    "suggestedFeeRecipient": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    "reference": "example validator account",
    "label": "example shapella validators"
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
