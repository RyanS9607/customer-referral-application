# This was created to easily remove the any data that was added to the DB - for testing purposes only.

import boto3

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('customer-details')
    
    # Assuming event contains the primary key of the item you want to update
    primary_key = event['email_address_pk']
    
    # Update expression to set the desired attributes to the specified values
    update_expression = "SET referral_date = :empty_date, referral_status = :false_status, referral_verified = :false_verified, referred_customer_email = :empty_email"
    
    # Expression attribute values for the update expression
    expression_attribute_values = {
        ':empty_date': '',
        ':false_status': False,
        ':false_verified': False,
        ':empty_email': ''
    }
    
    # Update item in DynamoDB table
    response = table.update_item(
        Key={'email_address_pk': primary_key},
        UpdateExpression=update_expression,
        ExpressionAttributeValues=expression_attribute_values
    )
    
    return {
        'statusCode': 200,
        'body': 'Attributes updated successfully'
    }