import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';


function ReferralHomePage() {
 
  return (
    <div className='BodyContainer'>
      <div className='ImageContainer'>
      <img src="referafriend.png" alt="Refer A Friend"/> 
      </div>
        <div className='TextContainer'>
            <h2>How it Works</h2>
            <p>1. Enter the email address of the friend you would like to refer.</p>
            <p>2. They will receive an email with instructions on how to register with SkyBet.</p>
            <p>3. During the registration, they will be able to enter your email address.</p>
            <p>4. Once verified, you and your friend will receive an email to confirm the referral.</p>
            <h3>5. A £10 bonus is received by you.</h3>
            <h3>6. A £10 bonus is received by your friend.</h3>

        </div>
        <div className='ButtonContainerHomepage'>
          <div className='ReferNewCustomerButton'>
            <Link to="/refernewcustomer">
              <Button variant="contained" color="success">
                Refer A Friend
              </Button>
            </Link>
          </div>
          <div className='VerifyReferralButton'>
            <Link to="/verifyreferral">
              <Button variant="contained" color="success">
                  Verify The Referral
              </Button>
            </Link>
          </div>
      </div>
    </div>
  );
}

export default ReferralHomePage;
