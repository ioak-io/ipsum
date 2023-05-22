import React, { useEffect, useRef, useState } from 'react';
import './Generator.scss';
import { Button, Input, Select, SelectPropsConverter, ThemeType } from 'basicui';
import TextBoard from './TextBoard';
import { getSessionValue, setSessionValue, toNumber } from '../../../utils/SessionUtils';
import * as Constants from './Constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { httpGet } from '../../../components/Lib/RestTemplate';

interface Props {
  index: number;
  presetId: string;
}

const Generator = (props: Props) => {
  const [count, setCount] = useState(1);
  const [type, setType] = useState("Sentence");

  const [appliedData, setAppliedData] = useState<{ count: number, type: string, reset: boolean, changeFlag: boolean } | null>(null);

  const [data, setData] = useState<string[][]>([]);
  const dataRef = useRef<string[][]>([]);

  useEffect(() => {
    if (appliedData) { reloadData(appliedData.reset); }
  }, [appliedData]);

  useEffect(() => {
    if (appliedData) { reloadData(true); }
  }, [props.presetId]);

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
      setCount(_count);
      setType(_type);
      console.log("****", {
        count: _count,
        type: _type,
        reset: false,
        changeFlag: !appliedData?.changeFlag
      });
      setAppliedData({
        count: _count,
        type: _type,
        reset: false,
        changeFlag: !appliedData?.changeFlag
      })
    }
  }, [props.index]);

  const handleCountChange = (event: any) => {
    setCount(event.currentTarget.value);
  }

  const handleTypeChange = (event: any) => {
    setType(event.currentTarget.value || "Sentence");
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
      reloadData(false);
    }
  }

  const handleApply = () => {
    setAppliedData({
      count, type, reset: true, changeFlag: !appliedData?.changeFlag
    })
    setSessionValue(Constants.getCount(props.index), count);
    setSessionValue(Constants.getType(props.index), type);
  }

  const reloadData = (reset: boolean = false) => {
    httpGet(`/generate/${props.presetId}/${appliedData?.type}/${appliedData?.count}/10`, {}).then((response) => {
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
          {(type !== appliedData?.type || count !== appliedData?.count) && <div>
            <Button onClick={handleApply} theme={ThemeType.primary}>Apply</Button>
          </div>}
        </div>
        <div className="generator__header__right">
          <Button onClick={handleCopy} theme={ThemeType.primary}>
            <FontAwesomeIcon icon={faClipboard} />
            Copy
          </Button>
        </div>
      </div>
      <div className="generator__body">{data.length > 0 ? <TextBoard data={data[0]} /> : ""}</div>
    </div>
  );
};

export default Generator;
