# Corrected PowerShell script for testing discount API
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$session.UserAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"

# Calculate proper values
$discountableAmount = 12
$agreedAmount = 111
$discountAmount = $discountableAmount - $agreedAmount  # This will be negative, but we'll send absolute value
$finalDiscountAmount = [Math]::Abs($discountAmount)  # Make it positive

# Create the payload with corrected values
$payload = @{
    "certificateId" = "42"
    "certificateCode" = "GAM-2025-686599"  # Fixed: Removed Persian characters
    "nominalValue" = 70000000
    "currentStatus" = "SUBMITTED_TO_MARKET"
    "transferCount" = 0
    "allowedDiscountPercentage" = 50
    "discountableAmount" = $discountableAmount
    "discountAmount" = $finalDiscountAmount  # Fixed: Now positive
    "agreedAmount" = $agreedAmount
    "sellerPersonId" = 1
    "buyerCustomerId" = 122
    "buyerCustomerNumber" = "1111"
    "buyerPersonType" = "individual"
    "buyerNationalId" = "0200458868"
    "buyerFullName" = "test"
    "buyerShebaNumber" = "IR650180000000000216652398"
    "discountStatus" = "pending_discount"
    "discountDate" = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
}

# Convert to JSON
$jsonPayload = $payload | ConvertTo-Json -Depth 3

Write-Host "Sending payload:"
Write-Host $jsonPayload
Write-Host "`n" + "="*50 + "`n"

try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri "http://146.59.83.245:8075/rest/gam/certificate-discounts" `
        -Method "POST" `
        -WebSession $session `
        -Headers @{
            "Accept" = "application/json, text/plain, */*"
            "Accept-Encoding" = "gzip, deflate"
            "Accept-Language" = "en-US,en;q=0.9,fa;q=0.8"
            "Origin" = "http://localhost:4200"
            "Referer" = "http://localhost:4200/"
        } `
        -ContentType "application/json" `
        -Body ([System.Text.Encoding]::UTF8.GetBytes($jsonPayload))

    Write-Host "Success! Status Code: $($response.StatusCode)"
    Write-Host "Response:"
    Write-Host $response.Content
}
catch {
    Write-Host "Error occurred:"
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)"
    Write-Host "Error Message: $($_.Exception.Message)"
    
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body:"
        Write-Host $responseBody
    }
}
