import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';


function ReferralHomePage() {
 
  return (
    <div className='BodyContainer'>
      <div className='ReferNewCustomerContainer'>
        <Link to="/refernewcustomer">
          <Button variant="contained" color="success">
            Refer A Friend
          </Button>
        </Link>
      </div>
      <br/>
      <div className='VerifyReferralContainer'>
        <Link to="/verifyreferral">
          <Button variant="contained" color="success">
              Verify The Referral
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ReferralHomePage;
