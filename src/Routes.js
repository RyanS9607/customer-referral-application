import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReferralHomePage from './components/Pages/ReferralHomePage';
import ValidateReferral from './components/Pages/ValidateReferral';
import ReferAFriend from './components/Pages/ReferAFriend';

const Layout = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<ReferralHomePage/>}></Route>
                <Route path="/refernewcustomer" element={<ReferAFriend/>}></Route>
                <Route path="/verifyreferral"element={<ValidateReferral/>}></Route>
            </Routes>
        </Router>
    );
}

export default Layout;