import React, { useEffect, useState } from 'react';
import './style.scss';
import { Select, SelectPropsConverter } from 'basicui';
import Generator from './Generator';

interface Props {
}
const Home = (props: Props) => {
  const [numberOfContainers, setNumberOfContainers] = useState(2);
  return (
    <div className="page-home">
      <div className='page-home__header'>Header</div>
      <div className='page-home__body'>{[...Array(numberOfContainers)].map((index: number) => (
        <Generator key={index} />
      ))}</div>
    </div>
  );
};

export default Home;
