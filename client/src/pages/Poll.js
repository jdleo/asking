import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import cookies from 'react-cookies';

const Poll = () => {
  // state mgmt
  const [title, setTitle] = useState('loading...');
  const [optionIsHovering, setOptionIsHovering] = useState([]);

  const [options, setOptions] = useState([]);

  const [totalVotes, setTotalVotes] = useState(0);
  const [maxVotes, setMaxVotes] = useState(0);
  const [userVotedOn, setUserVotedOn] = useState(-1);
  const [expiration, setExpiration] = useState(0);

  // get poll id from route params
  let { id } = useParams();

  // helper method to calculate result width
  const calculateResultWidth = (votes, totalVotes) => {
    const pct = ((votes / totalVotes) * 100) | 0;
    console.info(votes, totalVotes, pct);
    return pct < 7 ? `0%` : `${pct}%`;
  };

  // helper method to fetch poll results
  const fetchPollResults = async () => {
    // check if this poll has expired
    if (expiration > 0 && Date.now() > expiration) {
      // set uservoted on to show results and just return
      return setUserVotedOn(0);
    }

    // get poll data from {API_URI}/poll/:id
    const API_URI =
      process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_API_URI || 'http://localhost:8080'
        : 'http://asking.one:8080';

    axios
      .get(`${API_URI}/poll/${id}`)
      .then(res => {
        const data = res.data.data;
        // set data
        setTitle(data.title);
        setExpiration(data.expiration);

        const voteData = data.options.map(option => ({ title: option, votes: 0 }));

        // go through votes and add to voteData
        data.votes.forEach(vote => {
          // find corresponding option in voteData
          const option = voteData.find(option => option.title === vote.option);
          // add vote_count to option
          option.votes = parseInt(vote.vote_count);
        });

        // set options
        setOptions(voteData);

        // set optionIsHovering
        setOptionIsHovering(voteData.map(() => false));

        // set more vote data
        let total = 0;
        let max = 0;
        voteData.forEach(option => {
          total += option.votes;
          if (option.votes > max) max = option.votes;
        });

        setTotalVotes(total);
        setMaxVotes(max);
      })
      .catch(() => {});
  };

  // component did mount
  useEffect(() => {
    // get cookie for if this user voted already
    const userVoteChoice = cookies.load(id);

    // check if they did vote
    if (userVoteChoice) {
      setUserVotedOn(parseInt(userVoteChoice));
    }

    fetchPollResults();

    // set an interval to fetch poll results every 2 seconds
    const interval = setInterval(() => fetchPollResults(), 2000);

    return () => clearInterval(interval);
  }, []);

  // set interval

  // helper method to handle poll option hover
  const handleOptionHover = (index, hovering) => {
    let newOptionIsHovering = [...optionIsHovering];
    newOptionIsHovering[index] = hovering;
    setOptionIsHovering(newOptionIsHovering);
  };

  // helper method to handle poll option click
  const handleOptionClick = index => {
    // if user has already voted on this poll, do nothing
    if (userVotedOn > -1) return;

    // update userVotedOn
    setUserVotedOn(index);

    // set in cookies too
    cookies.save(id, `${index}`);

    // also update vote count locally in state
    const newOptions = [...options];
    newOptions[index].votes++;
    setOptions(newOptions);

    let total = 0;
    let max = 0;
    newOptions.forEach(option => {
      total += option.votes;
      if (option.votes > max) max = option.votes;
    });

    setTotalVotes(total);
    setMaxVotes(max);

    // vote with put request to {API_URI}/poll/:id
    const API_URI =
      process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_API_URI || 'http://localhost:8080'
        : 'http://asking.one:8080';
    axios
      .put(`${API_URI}/poll/${id}/vote`, { option: options[index].title })
      .then(() => fetchPollResults())
      .catch(() => {});
  };

  // render expiration countdown
  const renderExpiration = () => {
    let now = new Date();
    let expirationDate = new Date(parseInt(expiration));

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
              color:
                userVotedOn > -1 && option.votes === maxVotes && maxVotes > 0 ? '#fff' : '#050505',
              fontWeight:
                userVotedOn > -1 && option.votes === maxVotes && maxVotes > 0 ? 'bold' : 'normal',
            }}
          >
            {option.title}
          </span>
          {console.info(option, maxVotes, totalVotes, option.votes / totalVotes)}
          {/** only render result/fill if user did vote already */}
          {userVotedOn > -1 && (
            <>
              <span
                style={{
                  color:
                    userVotedOn > -1 && option.votes === maxVotes && maxVotes > 0
                      ? '#00cc00'
                      : '#050505',
                  fontWeight:
                    userVotedOn > -1 && option.votes === maxVotes && maxVotes > 0
                      ? 'bold'
                      : 'normal',
                }}
                className='poll-option-result'
              >
                {option.votes.toLocaleString()}
              </span>
              {/** render fill and width based on win/loss */}
              <div
                className={option.votes === maxVotes ? 'winner-fill' : 'loser-fill'}
                style={{
                  width: calculateResultWidth(option.votes, totalVotes),
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
