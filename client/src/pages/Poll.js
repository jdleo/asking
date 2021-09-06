import React from 'react';
import { useParams } from 'react-router-dom';

const Poll = () => {
  // get poll id from route params
  let { id } = useParams();
  return <div>poll id: {id}</div>;
};

export default Poll;
