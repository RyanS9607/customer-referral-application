import React, { useState } from 'react';
import axios from 'axios';
import InputField from '../InputField/InputField';
import Button from '@mui/material/Button';
import Success from '../ResponseHandling/Success';
import Error from '../ResponseHandling/Error';

function ValidateReferral() {
  
  const [referrersEmail, setReferrersEmail] = useState(''); 
  const [newCustomerEmail] = useState('ryans6atfc@gmail.com'); 
  const [responseText, setResponseText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios({
        method: 'POST', 
        url: `${process.env.REACT_APP_AWS_VALIDATE_ENDPOINT}`,
        headers: {
          'Content-Type': 'application/json',
        },

        data: {
          referrers_email: referrersEmail, 
          new_customer_email: newCustomerEmail, 
        },
      });
      console.log('Response:', response.data); 
      setSubmitted(true);
      setResponseText(JSON.stringify(response.data.body));
      setResponseText(response.data.body.replace(/^"|"$/g, ''));
      console.log(responseText)

    } catch (error) {
      console.error('Error:', error); 
    }
  };

  return (
    <div className='BodyContainer'>
      <h2>Verify that you have been referred</h2>
      <div>
        Please enter the email address of the person who has referred you:
      </div>
      <br/>
      <div className='Inputbox'>
        {submitted ? (
          responseText.includes("Emails match") ? (
            <Success successMessage={responseText} />
          ) : (
            <Error errorMessage={responseText} />
          )
        ) : (
        <form onSubmit={handleSubmit}>
          <InputField value={referrersEmail} onChange={(e) => setReferrersEmail(e.target.value)} />
          <div className='ButtonContainer'>
            <Button type='submit' variant="contained" color="success">Submit</Button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}

export default ValidateReferral;
