import React, { useEffect, useState } from 'react';

import { Route, Routes } from 'react-router-dom';
import './RouterView.scss';
import Home from '../Home';
import { loginPageSubject } from '../../events/LoginPageEvent';
import ProtectedRouteApp from '../ProtectedRouteApp';
import LandingPage from '../Page/LandingPage';
import OaLogin from '../Auth/OaLogin';
import EditCompanyPage from '../Page/EditCompanyPage';
import UnauthorizedPage from '../Page/UnauthorizedPage';
import ExpensePage from '../Page/ExpensePage';
import EditCompany from '../Page/SettingsPage/EditCompany';
import Permissions from '../Page/SettingsPage/Permissions';
import BackupAndRestore from '../Page/SettingsPage/BackupAndRestore';
import GraphPage from '../Page/GraphPage';
import NotePage from '../Page/NotePage';
import MetadataDefinitionPage from '../Page/MetadataDefinitionPage';
import BrowsePage from '../Page/BrowsePage';
import NewNotePage from '../Page/NewNotePage';
import ColorfilterPage from '../Page/ColorfilterPage';
import EditColorFilterPage from '../Page/EditColorfilterPage';
import StopwordsPage from '../Page/StopwordsPage';
import LoginPage from '../Page/LoginPage';
import HomePage from '../Page/HomePage';

interface Props {
}

const RouterView = (props: Props) => {
  const [loginPage, setLoginPage] = useState(true);

  useEffect(() => {
    loginPageSubject.subscribe((message) => {
      setLoginPage(message.state);
    });
  }, []);

  return (
    <div
      className={`router-view ${loginPage ? 'on-login-page' : 'not-on-login-page'}`}
    >
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouteApp
              middleware={['readAuthentication']} component={HomePage} />
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRouteApp
              middleware={['readAuthentication']} component={HomePage} />
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRouteApp
              middleware={[]} component={LoginPage} />}
        />
        <Route
          path="/unauthorized"
          element={
            <ProtectedRouteApp
              middleware={['isAuthenticated']} component={UnauthorizedPage} />}
        />
      </Routes>
    </div>
  );
};

export default RouterView;
