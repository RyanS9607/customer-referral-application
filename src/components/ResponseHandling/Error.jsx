import React from 'react';
import Button from '@mui/material/Button';

function Error({ errorMessage }) {

  function refreshPage(){ 
    window.location.reload(); 
}

function redirectPage(){ 
  window.location.href = "https://m.skybet.com/"; 
}
    
  return (
    <React.Fragment>
        <div className='Response'> 
            <img
                src={`${process.env.REACT_APP_NEXT_PUBLIC_STATIC_ASSETS_DIR}/core-static-assets/cross-in-circle.png`}
                alt='cross-in-circle'
                data-qa='cross-in-circle-icon'
            />
            <h2 className='Error'>Error!</h2>

          <div className='ErrorPage'>
            <p>{errorMessage}</p>
          </div>
            <div className='errorButtons'>
              <Button onClick={ refreshPage } type="submit" variant="contained" color="success">Try Again</Button>
              <Button onClick={ redirectPage } type="submit" variant="contained" color="success">Go to Sky Bet</Button>
            </div>
        </div>
    </React.Fragment>
  );
}

// error outcomes for status 200
// Referrer's email not found in database
//Emails do not match
// NEEDS ADDING - "Referral has already been verified"

//error outcomes for 400
//f"Failed to send email to referrer: {str(e)}
// "Failed to send email to new customer: {str(e)}"
// "Failed to update DynamoDB item: {str(e)}"
// "body": "Referrer's email not found in database"


export default Error;