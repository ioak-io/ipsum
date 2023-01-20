import React, { useEffect, useState } from 'react';
import './Generator.scss';
import { Button, Input, Select, SelectPropsConverter, ThemeType } from 'basicui';

interface Props {
}
const Generator = (props: Props) => {
  const [count, setCount] = useState(1);
  const [type, setType] = useState("Sentence");

  const handleCountChange = (event: any) => {
    setCount(event.currentTarget.value);
  }

  const handleTypeChange = (_value: string[]) => {
    setType((_value && _value.length > 0) ? _value[0] : "Sentence");
  }

  const handleClick = () => {
    console.log(type, count);
  }

  return (
    <div className="generator">
      <div className="generator__header">
        <div className="generator__header__left">
          <div className="generator__header__left__count">
            <Input onInput={handleCountChange} initialValue={6} type="number" />
          </div>
          <div className="generator__header__left__type">
            <Select initialValues={[type]} options={SelectPropsConverter.optionsFromSimpleList(["Sentence", "Paragraph"])} onInput={handleTypeChange} />
          </div>
        </div>
        <div className="generator__header__right">
          <Button onClick={handleClick} theme={ThemeType.primary}>Copy</Button>
        </div>
      </div>
      <div className="generator__body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet condimentum elit. Aenean tempus consectetur ligula nec porttitor. Phasellus ultrices sed odio a porttitor. Nam suscipit tellus ante, vel gravida mauris auctor sed. Sed vel dui iaculis, ultricies nibh nec, euismod massa. Cras ut ipsum eget nisi commodo dignissim vitae nec mi. Cras vitae sapien commodo, consectetur mi ut, condimentum mauris.</div>
    </div>
  );
};

export default Generator;
