# This was created to add days to the time stamp for testing - for testing purposes only.

import boto3
from datetime import datetime, timedelta

# Initialize DynamoDB client
dynamodb = boto3.client('dynamodb')
def lambda_handler(event, context):
    # Lambda function to add 5 days to referral_date
    add_five_days_to_referral_date = lambda item: (
        datetime.strptime(item.get('referral_date')['S'], '%Y-%m-%dT%H:%M:%SZ') + timedelta(days=5)
    ).strftime('%Y-%m-%dT%H:%M:%SZ')
    
    response = dynamodb.get_item(
        TableName='customer-details',
        Key={
            'email_address_pk': {'S': event['email_address_pk']}
        },
    )
    item = response.get('Item', {})
    expired_referral_date = add_five_days_to_referral_date(item)
    
    dynamodb.update_item(
        TableName='customer-details',
        Key={
            'email_address_pk': {'S': event['email_address_pk']}
        },
        UpdateExpression='SET referral_date = :new_referral_date',
        ExpressionAttributeValues={
            ':new_referral_date': {'S': expired_referral_date}
        }
    )
    print(expired_referral_date)
    return {
                'statusCode': 200,
                'body': ('6 days have been added to the date')
            }