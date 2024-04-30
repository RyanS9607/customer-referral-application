import React from 'react';
import Button from '@mui/material/Button';

function Success({ successMessage }) {

  function redirectPage(){ 
    window.location.href = "https://m.skybet.com/"; 
}
    
  return (
    <React.Fragment>
        <div className='Response'> 
            <img
                src={`${process.env.REACT_APP_NEXT_PUBLIC_STATIC_ASSETS_DIR}/core-static-assets/tick-in-circle.png`}
                alt='tick-in-circle'
                data-qa='tick-in-circle-icon'
            />
            <h2 className='Success'>Success!</h2>

          <div className='SuccessPage'>
            <p>{successMessage}</p>
            <Button onClick={ redirectPage } type="submit" variant="contained" color="success">Go to Sky Bet</Button>
          </div>
        </div>
    </React.Fragment>
  );
}

export default Success;