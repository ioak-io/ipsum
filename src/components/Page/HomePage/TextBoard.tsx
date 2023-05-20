import React, { useEffect, useState } from 'react';
import './TextBoard.scss';

interface Props {
  data: string[];
}
const TextBoard = (props: Props) => {
  const [numberOfContainers, setNumberOfContainers] = useState(2);
  return (
    <div className="text-board">
      {props.data?.map(text => (
        <p>{text}</p>
      ))}
    </div>
  );
};

export default TextBoard;
