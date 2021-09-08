import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Poll = () => {
  // state mgmt
  const [title, setTitle] = useState('What is the best option to pick?');
  const [optionIsHovering, setOptionIsHovering] = useState([false, false, false, false]);

  const [options, setOptions] = useState([
    { title: 'a', votes: 19042043 },
    { title: 'b', votes: 9304093 },
    { title: 'c', votes: 3728494 },
    { title: 'd', votes: 7324897 },
  ]);

  const [totalVotes, setTotalVotes] = useState(0);
  const [maxVotes, setMaxVotes] = useState(0);
  const [userVotedOn, setUserVotedOn] = useState(-1);
  const [expiration, setExpiration] = useState(Date.now() + 5600000);

  // component did mount
  useEffect(() => {
    setTotalVotes(options.reduce((acc, curr) => acc + curr.votes, 0));
    setMaxVotes(options.reduce((acc, curr) => Math.max(acc, curr.votes), 0));
  });

  // get poll id from route params
  let { id } = useParams();

  // helper method to handle poll option hover
  const handleOptionHover = (index, hovering) => {
    let newOptionIsHovering = [...optionIsHovering];
    newOptionIsHovering[index] = hovering;
    setOptionIsHovering(newOptionIsHovering);
  };

  // helper method to handle poll option click
  const handleOptionClick = index => {
    // if user has already voted on this poll, do nothing
    if (userVotedOn !== -1) return;

    // update userVotedOn
    setUserVotedOn(index);
  };

  // render expiration countdown
  const renderExpiration = () => {
    let now = new Date();
    let expirationDate = new Date(expiration);

    // calculate hours, minutes, seconds
    let hours = Math.floor((expirationDate - now) / 3600000);
    let minutes = Math.floor((expirationDate - now) / 60000) % 60;
    let seconds = Math.floor((expirationDate - now) / 1000) % 60;

    // return formatted expiration time
    let formattedTime = `${hours}h ${minutes}m ${seconds}s`;
    if (hours > 864000) formattedTime = 'Never';
    if (expirationDate - now < 0) formattedTime = 'Expired';

    return <p>Expires: {formattedTime}</p>;
  };

  // helper method to render options
  const renderOptions = () => {
    return options.map((option, index) => {
      return (
        <div
          key={index}
          className='poll-option'
          onMouseEnter={() => handleOptionHover(index, true)}
          onMouseLeave={() => handleOptionHover(index, false)}
          onClick={() => handleOptionClick(index)}
          style={
            optionIsHovering[index] ? { boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' } : {}
          }
        >
          <span
            className='poll-option-title'
            style={{
              color: userVotedOn > -1 && option.votes === maxVotes ? '#fff' : '#050505',
              fontWeight: userVotedOn > -1 && option.votes === maxVotes ? 'bold' : 'normal',
            }}
          >
            {option.title}
          </span>
          {/** only render result/fill if user did vote already */}
          {userVotedOn > -1 && (
            <>
              <span className='poll-option-result'>{option.votes.toLocaleString()}</span>
              {/** render fill and width based on win/loss */}
              <div
                className={option.votes === maxVotes ? 'winner-fill' : 'loser-fill'}
                style={{
                  width: `${(option.votes / totalVotes) * 100}%`,
                }}
              />
            </>
          )}
        </div>
      );
    });
  };

  return (
    <div className='home-container'>
      <h2 className='poll-header'>{title}</h2>
      <br />
      <br />
      {renderOptions()}
      <br />
      <br />
      {renderExpiration()}
    </div>
  );
};

export default Poll;
