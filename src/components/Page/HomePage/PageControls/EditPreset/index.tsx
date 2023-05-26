import { faBars, faCheck, faChevronCircleUp, faChevronUp, faCogs, faEdit, faPen, faPenAlt, faPenClip, faPlus, faSignIn, faSignOut, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Input, SelectNative, Textarea, SelectPropsConverter } from 'basicui';
import PresetType from 'src/components/Types/PresetType';

interface Props {
  preset: PresetType;
  onChange: any;
}

const EditPreset = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const authorization = useSelector((state: any) => state.authorization);

  const handleChange = (event: any) => {
    props.onChange({
      ...props.preset, [event.currentTarget.name]: event.currentTarget.value
    })
  }

  return (
    <div className="edit-preset">
      <Input name="name" value={props.preset.name} label='Preset name' onInput={handleChange} />
      <SelectNative name="type" value={props.preset.type} label='Type' onInput={handleChange}
        options={SelectPropsConverter.optionsFromSimpleList(["Word", "Sentence", "AI"])} />
      <Textarea name="corpus" value={props.preset.corpus} label='Corpus text' onInput={handleChange} />
    </div>
  );
};

export default EditPreset;
