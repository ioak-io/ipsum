import { faBars, faChevronCircleUp, faChevronUp, faCogs, faPen, faPenAlt, faPenClip, faPlus, faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton } from 'basicui';
import Header from './Header';
import PresetType from 'src/components/Types/PresetType';
import { getPreset, savePreset } from './service';
import ListPresets from './ListPresets';
import EditPreset from './EditPreset';

interface Props {
  activePresetId?: string;
  onApplyPreset: any;
}

const PageControls = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);

  const [view, setView] = useState<'list' | 'edit'>('list');
  const [presetToEdit, setPresetToEdit] = useState<PresetType | undefined>();
  const [isActive, setIsActive] = useState(false);
  const [presets, setPresets] = useState<PresetType[]>([]);
  const [activePreset, setActivePreset] = useState<PresetType | undefined>();

  useEffect(() => {
    if (authorization.isAuth) {
      getPreset(authorization).then((response: PresetType[]) => {
        setPresets(response);
      })
    }
  }, [authorization]);

  useEffect(() => {
    setActivePreset(presets.find(item => item._id === props.activePresetId));
  }, [props.activePresetId, presets]);

  const handleChange = (_preset: PresetType) => {
    setPresetToEdit({
      ..._preset
    })
  }

  const applyPreset = (presetId: string) => {
    props.onApplyPreset(presetId);
  }

  const editPreset = (preset: PresetType) => {
    setView('edit');
    setPresetToEdit(preset);
  }

  const deletePreset = (presetId: string) => {
    console.log("delete", presetId)
  }

  const onSavePreset = () => {
    savePreset(presetToEdit, authorization).then((response: PresetType[]) => {
      if (response) {
        setPresets(response);
        setView("list");
        setPresetToEdit(undefined);
      }
    })
  }

  const onAddPreset = () => {
    setPresetToEdit({
      name: '',
      type: 'Word',
      corpus: ''
    });
    setView("edit");
  }

  return (
    <div className="page-controls">
      <div className={`page-controls__body-wrapper ${isActive ? 'page-controls__body-wrapper--active' : ''}`}>
        <div className='page-controls__body'>
          {view === 'list' && <ListPresets
            activePresetId={props.activePresetId}
            presets={presets}
            applyPreset={applyPreset}
            editPreset={editPreset}
            deletePreset={deletePreset}
          />}
          {view === 'edit' && presetToEdit && <EditPreset
            preset={presetToEdit}
            onChange={handleChange}
          />}
        </div>
      </div>
      <Header
        activePreset={activePreset}
        isBodyActive={isActive}
        toggleBody={view !== 'edit' && (() => setIsActive(!isActive))}
        onAdd={isActive && view === 'list' && (() => onAddPreset())}
        onSave={isActive && view === 'edit' && (() => onSavePreset())}
        onBack={isActive && view === 'edit' && (() => setView("list"))}
      />
    </div>
  );
};

export default PageControls;
