import { faBars, faCheck, faChevronCircleUp, faChevronUp, faCogs, faEdit, faPen, faPenAlt, faPenClip, faPlus, faSignIn, faSignOut, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton } from 'basicui';
import PresetType from 'src/components/Types/PresetType';

interface Props {
  activePresetId: string;
  presets: PresetType[];
  applyPreset: any;
  editPreset: any;
  deletePreset: any;
}

const ListPresets = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);

  return (
    <div className="list-presets">
      {props.presets.map(preset =>
        <div className='list-presets__preset' key={preset._id}>
          <div className='list-presets__preset__left'>
            {props.activePresetId !== preset._id && preset.name}
            {props.activePresetId === preset._id && <b>
              {preset.name}
            </b>}
          </div>
          <div className='list-presets__preset__right'>
            {props.activePresetId !== preset._id && <button onClick={() => props.applyPreset(preset._id)}>
              <FontAwesomeIcon icon={faCheck} />
            </button>}
            <button onClick={() => props.editPreset(preset)}>
              <FontAwesomeIcon icon={faPenClip} />
            </button>
            <button onClick={() => props.deletePreset(preset._id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListPresets;
