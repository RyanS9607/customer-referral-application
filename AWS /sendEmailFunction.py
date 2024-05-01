import json
import boto3
import re 
from botocore.exceptions import ClientError
import datetime
from datetime import datetime, timedelta

dynamodb = boto3.client('dynamodb')

def lambda_handler(event, context):

    email_pattern = r'^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$'

    if not re.match(email_pattern, event['referrers_email']):
        return {
            'statusCode': 400,
            'body': json.dumps('Invalid referrer email address!')
        }

    if not re.match(email_pattern, event['new_customer_email']):
        return {
            'statusCode': 400,
            'body': json.dumps('Invalid email address! Please try again and enter a Valid email Address')
        }

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
    
    ses = boto3.client('ses', AWS_REGION)
    
    try:
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
        
        if not item or not item.get('referral_date')['S']:
            expiredReferralDate = datetime.now() - timedelta(days=1)
        else:
            expiredReferralDate = datetime.strptime(item.get('referral_date')['S'], '%Y-%m-%dT%H:%M:%SZ') + timedelta(days=5)
          
        print("Expired Date and Time",expiredReferralDate) 
          
        if currentDateTime > expiredReferralDate and item.get('referral_verified', {}).get('BOOL', False) == False :
            now = datetime.now()
            referralDate = now.strftime("%Y-%m-%dT%H:%M:%SZ")
            
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
            print("You have already referred a friend and are awaiting verification, or you have already referred a friend.")
            SEND_EMAIL = False
            return {
                'statusCode': 200,
                'body': json.dumps("You have already referred a friend and are awaiting verification, or you have already referred a friend.")
            }
    except dynamodb.exceptions.ConditionalCheckFailedException:
   
        print("Condition check failed!")
        SEND_EMAIL = False
        return {
            'statusCode': 200,
            'body': json.dumps('Condition check failed!')
        }
    
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
            print(e.response['Error']['Message'])
            return {
                'statusCode': 200,
                'body': json.dumps('Email sending failed! This is us not you, please try again later')
            }
        else:
            print("Email sent! Message ID:")
            print(response['MessageId'])
            return {
                'statusCode': 200,
                'body': json.dumps('The referral and the email have been sent successfully!')
            }
