import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import './style.scss';
import ipsumWhiteSmall from '../../images/ipsum_white.svg';
import ipsumBlackSmall from '../../images/ipsum_black.svg';
import ipsumBlack from '../../images/ipsum_black.svg';
import ipsumWhite from '../../images/ipsum_white.svg';

interface Props {
}

const Logo = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);

  const profile = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();

  return (
    <div className="logo">
      <div className="logo--image">
        {profile.theme === 'basicui-light' && (
          <img src={ipsumBlack} alt="Ipsum logo" />
        )}
        {profile.theme === 'basicui-dark' && (
          <img src={ipsumWhite} alt="Ipsum logo" />
        )}
      </div>
    </div>
  );
};

export default Logo;
