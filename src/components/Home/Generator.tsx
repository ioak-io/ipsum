import React, { useEffect, useRef, useState } from 'react';
import './Generator.scss';
import { Button, Input, Select, SelectPropsConverter, ThemeType } from 'basicui';
import { httpGet } from '../../utils/RestTemplate';
import TextBoard from './TextBoard';
import { getSessionValue, setSessionValue, toNumber } from '../../utils/SessionUtils';
import * as Constants from './Constants';

interface Props {
  index: number;
}

const Generator = (props: Props) => {
  const [count, setCount] = useState(1);
  const [type, setType] = useState("Sentence");

  const [appliedCount, setAppliedCount] = useState(1);
  const [appliedType, setAppliedType] = useState("Sentence");

  const [data, setData] = useState<string[][]>([]);
  const dataRef = useRef<string[][]>([]);

  useEffect(() => {
    if (props.index > -1) {
      let _count = toNumber(getSessionValue(Constants.getCount(props.index), null));
      
      if (!_count) {
        _count = 1;
        setSessionValue(Constants.getCount(props.index), _count);
      }
      let _type = getSessionValue(Constants.getType(props.index), null);
      if (!_type) {
        _type = props.index === 1 ? "Paragraph" : "Sentence";
        setSessionValue(Constants.getType(props.index), _type);
      }
      console.log(props.index, _count, _type);
      setCount(_count);
      setType(_type);
      setAppliedCount(_count);
      setAppliedType(_type);
      setTimeout(() => {
        reloadData();
      }, 100);
    }
  }, [props.index]);

  const handleCountChange = (event: any) => {
    setCount(event.currentTarget.value);
  }

  const handleTypeChange = (_value: string[]) => {
    setType((_value && _value.length > 0) ? _value[0] : "Sentence");
  }

  const handleCopy = () => {
    const _data: string[][] = [...data];
    if (_data.length === 0) return;
    const _item: string[] = _data[0];
    let clipboardText = "";
    _item.forEach(
      _text => (clipboardText += _text + '\n')
    );
    navigator.clipboard.writeText(clipboardText).then(() => { });
    const _newData = _data.slice(1);
    setData(_newData);
    dataRef.current = _newData;
    if (_newData.length < 5) {
      reloadData();
    }
  }

  const handleApply = () => {
    setAppliedCount(count);
    setAppliedType(type);
    reloadData(true);
    setSessionValue(Constants.getCount(props.index), count);
    setSessionValue(Constants.getType(props.index), type);
  }

  const reloadData = (reset: boolean = false) => {
    httpGet(`/generate/english/lorem/${type}/${count}/10`, {}).then((response) => {
      let _data: string[][] = [];
      if (!reset) {
        _data = [...dataRef.current];
      }
      _data = [..._data, ...response.data];
      setData(_data);
      dataRef.current = _data;
    })
  }

  return (
    <div className="generator">
      <div className="generator__header">
        <div className="generator__header__left">
          <div className="generator__header__left__count">
            <Input onInput={handleCountChange} value={count} type="number" />
          </div>
          <div className="generator__header__left__type">
            <Select value={[type]} options={SelectPropsConverter.optionsFromSimpleList(["Sentence", "Paragraph"])} onInput={handleTypeChange} />
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
