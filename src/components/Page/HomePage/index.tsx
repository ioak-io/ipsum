import React, { useEffect, useState } from "react";
import "./style.scss";
import { Select, SelectPropsConverter } from "basicui";
import Generator from "./Generator";
import {
  getSessionValue,
  setSessionValue,
  toNumber,
} from "../../../utils/SessionUtils";
import * as Constants from "./Constants";
import Topbar from "../../../components/Topbar";
import PageControls from "./PageControls";

interface Props {}
const HomePage = (props: Props) => {
  const [numberOfContainers, setNumberOfContainers] = useState(2);
  const [presetId, setPresetId] = useState<string | undefined>();

  useEffect(() => {
    let _numberOfContainers = toNumber(
      getSessionValue(Constants.IPSUM_NUMBER_OF_BLOCKS, null)
    );
    if (!_numberOfContainers) {
      setSessionValue(Constants.IPSUM_NUMBER_OF_BLOCKS, 2);
      _numberOfContainers = 2;
    }
    setNumberOfContainers(_numberOfContainers);

    let _presetId = getSessionValue(Constants.IPSUM_APPLIED_PRESET_ID, null);
    if (!_presetId) {
      _presetId = process.env.REACT_DEFAULT_PRESET_ID || "";
      setSessionValue(Constants.IPSUM_APPLIED_PRESET_ID, _presetId);
    }
    setPresetId(_presetId);
  }, []);

  const onApplyPreset = (_presetId: string) => {
    setPresetId(_presetId);
    setSessionValue(Constants.IPSUM_APPLIED_PRESET_ID, _presetId);
  };

  return (
    <>
      <div className="page-home">
        <Topbar title="Choose company" />
        <div className="page-home__body">
          {presetId &&
            [...Array(numberOfContainers)].map((_, index: number) => (
              <Generator key={index} index={index} presetId={presetId} />
            ))}
        </div>
      </div>
      <PageControls activePresetId={presetId} onApplyPreset={onApplyPreset} />
    </>
  );
};

export default HomePage;
