import React, { useState } from 'react';
import axios from 'axios';
import InputField from '../InputField/InputField';


function ReferAFriend() {
    //Due to restrictions in AWS, this Boolean field must be manually set. However, for a live system, this field would ideally use the email of the logged-in user as the state.
  const [referrersEmail] = useState('ryan.e.sutcliffe@gmail.com'); 
  const [newCustomerEmail, setNewCustomerEmail] = useState(''); 

  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Send a POST request to the referral endpoint
      const response = await axios({
        method: 'POST', 
        url: `${process.env.REACT_APP_AWS_REFERRAL_ENDPOINT}`, 
        headers: {
          'Content-Type': 'application/json',
        },
        // Data to be sent in the request body
        data: {
          referrers_email: referrersEmail, 
          new_customer_email: newCustomerEmail,
        },
      });

      console.log('Response:', response); 

    } catch (error) {
      console.error('Error:', error); 
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>New Customers Email:
        <InputField value={newCustomerEmail} onChange={(e) => setNewCustomerEmail(e.target.value)} />
        <br />
        <button type="submit">Submit</button>
        </label>
      </form>
    </>
  );
}

export default ReferAFriend;
