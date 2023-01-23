import React, { useEffect, useState } from 'react';
import './style.scss';
import { Select, SelectPropsConverter } from 'basicui';
import Generator from './Generator';
import { getSessionValue, setSessionValue, toNumber } from '../../utils/SessionUtils';
import * as Constants from './Constants';
import Logo from '../Logo';
import DarkModeIcon from '../DarkModeIcon';

interface Props {
}
const Home = (props: Props) => {
  const [numberOfContainers, setNumberOfContainers] = useState(2);

  useEffect(() => {
    let _numberOfContainers = toNumber(getSessionValue(Constants.IPSUM_NUMBER_OF_BLOCKS, null));
    if (!_numberOfContainers) {
      setSessionValue(Constants.IPSUM_NUMBER_OF_BLOCKS, 2);
      _numberOfContainers = 2;
    }

    setNumberOfContainers(_numberOfContainers);
  }, []);

  return (
    <div className="page-home">
      <div className='page-home__header'>
        <Logo variant='full' />
        <DarkModeIcon />
      </div>
      <div className='page-home__body'>
        {[...Array(numberOfContainers)].map((_, index: number) =>
          <Generator key={index} index={index} />
        )}
      </div>
    </div>
  );
};

export default Home;
