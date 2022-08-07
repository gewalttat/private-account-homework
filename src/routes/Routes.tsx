import React from "react";
import { Routes ,Route } from 'react-router-dom';
import { Login } from "../components/pages/Login/Login";
import { Account } from "../components/pages/Account/Account"

export default (
    <Routes>
        <Route path={'/'} element={<Login/>} />
        <Route path={'/account'} element={<Account/>}  />
    </Routes>
);