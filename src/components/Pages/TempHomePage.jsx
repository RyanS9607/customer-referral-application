import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';


function TempHomepage() {
 
  return (
    <>
    This is the homepage
    <br/>
    <Link to="/refernewcustomer">
      <Button variant="contained" >
        Refer A Friend
      </Button>
    </Link>
    <br/>
    <Link to="/verifyreferral">
      <Button variant="contained">
          Verify The Referral
      </Button>
    </Link>
    <br/>
    </>
  );
}

export default TempHomepage;
