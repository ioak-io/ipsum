import React, { useEffect, useRef, useState } from 'react';
import './Generator.scss';
import { Button, Input, Select, SelectPropsConverter, ThemeType } from 'basicui';
import { httpGet } from '../../utils/RestTemplate';
import TextBoard from './TextBoard';

interface Props {
}
const Generator = (props: Props) => {
  const [count, setCount] = useState(1);
  const [type, setType] = useState("Sentence");

  const [appliedCount, setAppliedCount] = useState(1);
  const [appliedType, setAppliedType] = useState("Sentence");

  const [data, setData] = useState<string[][]>([]);
  const dataRef = useRef<string[][]>([]);

  const handleCountChange = (event: any) => {
    setCount(event.currentTarget.value);
  }

  const handleTypeChange = (_value: string[]) => {
    setType((_value && _value.length > 0) ? _value[0] : "Sentence");
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(data[0][0]).then(() => {
      console.log("Copied to clipboard");
    });
    const _data = data.slice(1);
    setData(_data);
    dataRef.current = _data;
    if (_data.length < 5) {
      reloadData();
    }
  }

  const handleApply = () => {
    setAppliedCount(count);
    setAppliedType(type);
    reloadData();
  }

  const reloadData = () => {
    httpGet(`/generate/english/lorem/${type}/${count}/10`, {}).then((response) => {
      const _data = [...dataRef.current, ...response.data];
      setData(_data);
      dataRef.current = _data;
    })
  }

  return (
    <div className="generator">
      <div className="generator__header">
        <div className="generator__header__left">
          <div className="generator__header__left__count">
            <Input onInput={handleCountChange} initialValue={count} type="number" />
          </div>
          <div className="generator__header__left__type">
            <Select initialValues={[type]} options={SelectPropsConverter.optionsFromSimpleList(["Sentence", "Paragraph"])} onInput={handleTypeChange} />
          </div>
          {(type !== appliedType || count !== appliedCount) && <div>
            <Button onClick={handleApply} theme={ThemeType.primary}>Apply</Button>
          </div>}
        </div>
        <div className="generator__header__right">
          <Button onClick={handleCopy} theme={ThemeType.primary}>Copy</Button>
        </div>
      </div>
      <div className="generator__body">{data.length > 0 ? <TextBoard data={data[0]} /> : ""}</div>
    </div>
  );
};

export default Generator;
