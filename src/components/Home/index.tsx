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
      {[...Array(numberOfContainers)].map((index: number) => (
        <Generator key={index} />
      ))}
    </div>
  );
};

export default Home;
