import json
import boto3
from botocore.exceptions import ClientError
import datetime
from datetime import datetime, timedelta

# Initialize DynamoDB client
dynamodb = boto3.client('dynamodb')

# Lambda handler function
def lambda_handler(event, context):
    SENDER = 'Sky Bet <' + event['referrers_email'] + '>'
    RECIPIENT = event['new_customer_email']
    AWS_REGION = "eu-north-1"
    SUBJECT = 'You Have Been Referred To Sky Bet'
    BODY_TEXT = 'You Have Been Referred To Sky Bet'
    BODY_HTML = """
    <html>
    <head></head>
    <body>
      <h1>Welcome. Glad you could join us!</h1>
      <p>Dear referred Customer<p>
      <p>We are excited to welcome you to our community!<p>
      <p>For a helpful guide on how to make the most of your Sky Bet Account please click <a href='https://m.skybet.com/lp/new-customer-guide?DCMP=NewCustomerEmail'>here</a><p>
      <p>To confirm your referral, please follow the link below to register. Once you have registered, please enter the email address of your referring friend!<p>
      <p>Upon registration you and your friend will recieve a reward<p>
      <p><a href='https://m.skybet.com/'>Confirm Your referral here</a><p>
    </html>
     """     
    SEND_EMAIL = True 
    CHARSET = "UTF-8"
    
    # Initialize SES client
    ses = boto3.client('ses', AWS_REGION)
    
    try:
        # Retrieve referral details from DynamoDB
        response = dynamodb.get_item(
            TableName='customer-details',
            Key={
                'email_address_pk': {'S': event['referrers_email']}
            },
            ProjectionExpression='referral_status, referral_date, referral_verified'
        )
        item = response.get('Item') 
        
        # Calculate current date and time
        currentDateTime = datetime.now() # + timedelta(days=6)  the + timedelta(days=5) is only added for testing
        print("Current Date and Time",currentDateTime)
        
        # Calculate expired referral date
        if not item or not item.get('referral_date')['S']:
            expiredReferralDate = datetime.now() - timedelta(days=1)
        else:
            expiredReferralDate = datetime.strptime(item.get('referral_date')['S'], '%Y-%m-%dT%H:%M:%SZ') + timedelta(days=5)
          
        print("Expired Date and Time",expiredReferralDate) 
          
        # Check if current time is within the referral period and referral is not verified
        if currentDateTime > expiredReferralDate and item.get('referral_verified', {}).get('BOOL', False) == False :
            now = datetime.now()
            referralDate = now.strftime("%Y-%m-%dT%H:%M:%SZ")
            
            # Update referral status in DynamoDB
            response = dynamodb.update_item(
                TableName='customer-details',
                Key={
                    'email_address_pk': {'S': event['referrers_email']}
                },
                UpdateExpression="SET referral_status = :bool, referred_customer_email = :email, referral_date =:datetime", 
                ConditionExpression='attribute_exists(referral_status)',
                ExpressionAttributeValues={
                    ':bool': {"BOOL": True},
                    ':email': {'S': event['new_customer_email']},
                    ':datetime': {'S': referralDate},
                },
            )
            print("Item updated successfully!")
        else:
            # If referral already exists or referral period expired, do not proceed
            print("Customer has already referred a friend and is waiting verification or you have already referred a friend")
            SEND_EMAIL = False
            return {
                'statusCode': 200,
                'body': json.dumps('Customer has already referred a friend and is waiting verification or you have already referred a friend')
            }
    except dynamodb.exceptions.ConditionalCheckFailedException:
        # Handle if condition check fails
        print("Condition check failed!")
        SEND_EMAIL = False
        return {
            'statusCode': 200,
            'body': json.dumps('Condition check failed!')
        }
    
    # Send email only if referred_customer_email is empty
    if SEND_EMAIL:
        try:
            response = ses.send_email(
                Destination={
                    'ToAddresses': [
                        RECIPIENT,
                    ],
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
        except ClientError as e:
            # Handle if email sending fails
            print(e.response['Error']['Message'])
            return {
                'statusCode': 200,
                'body': json.dumps('Email sending failed!')
            }
        else:
            # If email sent successfully
            print("Email sent! Message ID:")
            print(response['MessageId'])
            return {
                'statusCode': 200,
                'body': json.dumps('The referral and the email have been sent successfully!')
            }
