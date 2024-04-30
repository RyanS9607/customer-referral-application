import boto3

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb')

# Lambda function handler
def lambda_handler(event, context):
    # Retrieve the DynamoDB table
    CUSTOMER_DETAILS_TABLE = dynamodb.Table('customer-details')
    
    # Extract email addresses from the event
    NEW_CUSTOMER_EMAIL = event['new_customer_email']
    REFERRERS_EMAIL = event['referrers_email']
    
    
    # Retrieve the referred customer's email from DynamoDB
    response = CUSTOMER_DETAILS_TABLE.get_item(Key={'email_address_pk': REFERRERS_EMAIL})
    if 'Item' not in response:
        return {"statusCode": 400, "body": "Referrer's email not found in database"}
    
    referred_customers_email = response['Item'].get('referred_customer_email')
    
    # Check if the new customer's email matches the referred customer's email
    if NEW_CUSTOMER_EMAIL == referred_customers_email:
        try:
            # Update DynamoDB item to indicate referral verification
            CUSTOMER_DETAILS_TABLE.update_item(
                Key={'email_address_pk': REFERRERS_EMAIL},
                UpdateExpression='SET referral_verified = :val',
                ExpressionAttributeValues={':val': True}
            )
        except Exception as e:
            return {"statusCode": 400, "body": f"Failed to update DynamoDB item: {str(e)}"}
        
        # Send email to new customer and referrer
        SENDER = 'Sky Bet <' + event['referrers_email'] + '>'
        SUBJECT = 'Your Referral Has Been Verified'
        AWS_REGION = "eu-north-1"
        BODY_TEXT = ("Amazon SES Test (Python)\r\n"
                     "This email was sent with Amazon SES using the "
                     "AWS SDK for Python (Boto)."
                    )
                    
        BODY_HTML = """
        <html>
        <head>
            <style>
            
                h2 {
                    margin: 0px;
                    color: #505050;
                }
            
                p {
                    font-size: 16px;
                    color: #505050;
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <h2>You Sky Bet Referral has been Verified!</h2>
            <p> Dear Customer,</p>
            <p> Just to let you know, we have been able to verify you referral, and you and your friend will now recieve a bonus  </p>
            <p> For a helpful guide on how to make the most of your Sky Bet Account please click <a href="https://m.skybet.com/lp/new-customer-guide?DCMP=NewCustomerEmail">here</a>.</p>
           
        </body>
        </html>
        """      
        
        CHARSET = "UTF-8"
        ses = boto3.client('ses', AWS_REGION)
        
        # Send email to new customer
        try:
            response = ses.send_email(
                Destination={
                    'ToAddresses': [
                        NEW_CUSTOMER_EMAIL
                    ]
                },
                Message={
                    'Body': {
                        'Html': {
                            'Charset': CHARSET,
                            'Data': BODY_HTML,
                        },
                        'Text': {
                            'Charset': CHARSET,
                            'Data': BODY_TEXT,
                        },
                    },
                    'Subject': {
                        'Charset': CHARSET,
                        'Data': SUBJECT,
                    },
                },
                Source=SENDER
            )
        except Exception as e:
            return {"statusCode": 400, "body": f"Failed to send email to new customer: {str(e)}"}
        
        # Send email to referrer
        try:
            response = ses.send_email(
                Destination={
                    'ToAddresses': [
                        REFERRERS_EMAIL
                    ]
                },
                Message={
                    'Body': {
                        'Html': {
                            'Charset': CHARSET,
                            'Data': BODY_HTML,
                        },
                        'Text': {
                            'Charset': CHARSET,
                            'Data': BODY_TEXT,
                        },
                    },
                    'Subject': {
                        'Charset': CHARSET,
                        'Data': SUBJECT,
                    },
                },
                Source=SENDER
            )
        except Exception as e:
            return {"statusCode": 400, "body": f"Failed to send email to referrer: {str(e)}"}
        
        # Return success response if emails match
        return {"statusCode": 200, "body": "Emails match"}
    else:
        # Return error response if emails do not match
        return {"statusCode": 400, "body": "Emails do not match"}


