import React, { useState } from 'react';
import axios from 'axios';
import InputField from '../InputField/InputField';
import Button from '@mui/material/Button';
import Success from '../ResponseHandling/Success';
import Error from '../ResponseHandling/Error';

function ReferAFriend() {
  const [referrersEmail] = useState('ryan.e.sutcliffe@gmail.com');
  const [newCustomerEmail, setNewCustomerEmail] = useState('');
  const [responseText, setResponseText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_AWS_REFERRAL_ENDPOINT}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          referrers_email: referrersEmail,
          new_customer_email: newCustomerEmail,
        },
      });
      setResponseText(JSON.stringify(response.data.body));
      setResponseText(response.data.body.replace(/^"|"$/g, ''));
      console.log('Response:', response);
      setSubmitted(true);
   
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='BodyContainer'>
      <h2>Refer a friend to Sky Betting and Gaming</h2>
      <div>
        Please enter the email address of the person you want to refer:
      </div>
        <br/>
        <div className='Inputbox'>
        {submitted ? (
          responseText.includes("successfully") ? (
            <Success successMessage={responseText} />
          ) : (
              <Error errorMessage={responseText} />
            )
        ) : (
          <form onSubmit={handleSubmit}>
            <InputField value={newCustomerEmail} onChange={(e) => setNewCustomerEmail(e.target.value)} />
            <div className='ButtonContainer'>
              <Button type="submit" variant="contained" color="success">Submit</Button>
            </div>
          </form>
        )}
      </div>
    </div>
    
  );
}

export default ReferAFriend;