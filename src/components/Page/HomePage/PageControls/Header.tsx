import { faBars, faCheck, faChevronCircleUp, faChevronLeft, faChevronUp, faCogs, faPen, faPenAlt, faPenClip, faPlus, faSignIn, faSignOut, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton } from 'basicui';
import PresetType from 'src/components/Types/PresetType';

interface Props {
  activePreset?: PresetType;
  isBodyActive: boolean;
  toggleBody?: any;
  onAdd?: any;
  onSave?: any;
  onBack?: any;
}

const Header = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);

  return (
    <div className={`page-controls-header ${props.isBodyActive ? 'page-controls-header--body-active' : ''}`}>
      <div className="page-controls-header__left">
        {props.activePreset?.name || "No preset applied"}
      </div>
      <div className="page-controls-header__right">
        {props.onAdd && <IconButton circle onClick={props.onAdd}>
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>}
        {props.toggleBody && <IconButton circle onClick={props.toggleBody}>
          <div className="page-controls-header__right__toggle">
            <FontAwesomeIcon icon={faChevronUp} />
          </div>
        </IconButton>}
        {props.onSave && <Button onClick={props.onSave}>
          <FontAwesomeIcon icon={faCheck} />
          Save
        </Button>}
        {props.onBack && <Button onClick={props.onBack}>
          <FontAwesomeIcon icon={faTimes} />
          Cancel
        </Button>}
      </div>
    </div>
  );
};

export default Header;
