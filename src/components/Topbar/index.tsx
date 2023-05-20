import { faBars, faPlus, faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../../store/actions/ProfileActions';
import MobileSidebar from '../MobileSidebar';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo';

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

  const toggleSidebar = () => {
    sessionStorage.setItem(
      'ipsum_pref_sidebar_status',
      profile.sidebar ? 'collapsed' : 'expanded'
    );

    dispatch(setProfile({ ...profile, sidebar: !profile.sidebar }));
  };

  const openNewNotePage = () => {
    navigate(`/${props.space}/new-note`);
  }

  return (
    <>
      <div className="topbar">
        <div className="topbar__left">
          <Logo />
          <div className="topbar__left__menu">
            <button className="topbar__left__menu__action">
              Generate
            </button>
            <button className="topbar__left__menu__action">
              Settings
            </button>
          </div>
        </div>
        <div className="topbar__right">
          {authorization.isAuth && <button className="topbar__right__icon-action">
            <FontAwesomeIcon icon={faSignOut} />
          </button>}
          {!authorization.isAuth && <button className="topbar__right__icon-action">
            <FontAwesomeIcon icon={faSignIn} />
          </button>}
        </div>
      </div>
      <MobileSidebar isOpen={isMobileSidebarOpen} onClose={closeMobileSidebar} />
    </>
  );
};

export default Topbar;
