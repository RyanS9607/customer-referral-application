import React, { useState } from 'react';
import axios from 'axios';
import InputField from '../InputField/InputField';
import Button from '@mui/material/Button';

function ValidateReferral() {
  
  const [referrersEmail, setReferrersEmail] = useState(''); 

  //Due to restrictions in AWS, this Boolean field must be manually set. However, for a live system, this field would ideally use the email of the logged-in user as the state.
  const [newCustomerEmail] = useState('ryans6atfc@gmail.com'); 

  // Function to handle form submission
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

    } catch (error) {
      console.error('Error:', error); 
    }
  };

  return (
    <div className='BodyContainer'>
      <form onSubmit={handleSubmit}>
        <InputField value={referrersEmail} onChange={(e) => setReferrersEmail(e.target.value)} />
      </form>
        <div className='ButtonContainer'>
          <Button variant="contained" color="success">Submit</Button>
        </div>
    </div>
  );
}

export default ValidateReferral;
