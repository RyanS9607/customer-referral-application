import React from 'react';

function Footer() {

  return (
    <div className="FooterContainer">
      <div className='FooterContentContainer'>
        <div className='SaferGamblingShieldContainer'>
          <a className='SaferGamblingShield' href='https://m.skybet.com/lp/safer-gambling' alt='Safer Gambling Shield'>
            Safer Gambling Shield
          </a>
        </div>
        <div className='FooterText'> 
          <p>
            We are committed to Safer Gambling and have a number of self-help tools to help you manage your gambling.
          </p>
          <p>
            We also work with a number of independent charitable organisations who can offer help and answers any questions you may have.
          </p>
        </div> 
        <br/>
      </div>
      <div className='FooterImages'> 
        <a
          className='BeGambleAware' href='https://www.begambleaware.org/' alt='Be Gamble Aware'>
          Be Gamble Aware
        </a>
        <a className="GamCare" href='https://www.gamcare.org.uk/talk-to-us-now/' alt='GamCare logo'>
          GamCare
        </a>
        <a className="Gamstop" href='https://www.gamstop.co.uk/' alt='gamstop logo'>
          Gamstop
        </a>
        <a className="GordonMoody" href='https://www.gamblingtherapy.org/'alt='Gordon Moody logo'>
          Gordon Moody
        </a>

        <a className="SaferGamblingStandard" href='https://www.safergamblingstandard.org.uk/assured-businesses/' alt='SaferGamblingStandard logo'>
          Safer Gambling Standard
        </a>
        <a className="GamBan" href='https://gamban.com/' alt='GamBan logo'>
          GamBan
        </a>
        <a className="EighteenPlus" href='https://support.skybet.com/s/article/How-old-do-I-have-to-be-to-join' alt='EighteenPlus logo'>
          Eighteen Plus
        </a>
        <a className="TimeToThink" href='https://www.taketimetothink.co.uk/' alt='TimeToThink logo'>
          Time To Think
        </a>
      </div>
    </div>
  );
}

export default Footer;