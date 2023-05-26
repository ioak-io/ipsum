import { faBars, faPlus, faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../../store/actions/ProfileActions';
import MobileSidebar from '../MobileSidebar';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import { removeSessionValue } from '../../utils/SessionUtils';
import { removeAuth } from '../../store/actions/AuthActions';
import DarkModeIcon from '../Navigation/DarkModeIcon';

interface Props {
  title: string;
  children?: any;
  space?: string;
}

const Topbar = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  }

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  }


  const logout = (
    event: any,
    type = 'success',
    message = 'You have been logged out'
  ) => {
    dispatch(removeAuth());
    removeSessionValue(
      `ipsum-access_token`
    );
    removeSessionValue(
      `ipsum-refresh_token`
    );
    navigate(`/`);
  };

  const login = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="topbar">
        <div className="topbar__left">
          <Logo />
          {/* <div className="topbar__left__menu">
            <button className="topbar__left__menu__action">
              Generate
            </button>
            <button className="topbar__left__menu__action">
              Settings
            </button>
          </div> */}
        </div>
        <div className="topbar__right">
          <DarkModeIcon />
          {authorization.isAuth && <button className="topbar__right__icon-action" onClick={logout}>
            <FontAwesomeIcon icon={faSignOut} />
          </button>}
          {!authorization.isAuth && <button className="topbar__right__icon-action" onClick={login}>
            <FontAwesomeIcon icon={faSignIn} />
          </button>}
        </div>
      </div>
    </>
  );
};

export default Topbar;
