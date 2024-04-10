import React, { useState } from 'react';
import axios from 'axios';

function ValidateReferral() {
  
  const [referrersEmail, setRerrersEmail] = useState(''); 

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
    <form onSubmit={handleSubmit}> 
        
      <br />
      <label>
      Referrers Email:
        <input
          type="email"
          value={referrersEmail} 
          onChange={(e) => setRerrersEmail(e.target.value)} 
          required 
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ValidateReferral;
