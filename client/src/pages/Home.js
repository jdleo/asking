import { useState } from 'react';
import axios from 'axios';

function Home() {
  // state mgmt
  const [answers, setAnswers] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [limitIp, setLimitIp] = useState('yes');
  const [expirationDate, setExpirationDate] = useState('never');

  // helper method to add new blank answer
  const addAnswer = () => {
    setAnswers([...answers, '']);
  };

  // helper method to handle input change for answer
  const handleAnswerChange = (text, i) => {
    // update state
    const newAnswers = [...answers];
    newAnswers[i] = text;
    setAnswers(newAnswers);
  };

  // helper method to detect keypress on input
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      addAnswer();
    }
  };

  // helper method to render text inputs for each answer
  const renderAnswers = () => {
    return answers.map((answer, index) => {
      return (
        <input
          key={index}
          placeholder='Choose an answer...'
          className='home-input'
          value={answers[index]}
          onChange={e => handleAnswerChange(e.target.value, index)}
          onKeyPress={handleKeyPress}
        />
      );
    });
  };

  // helper method to handle poll creation
  const handleSubmit = () => {
    // trim every answer
    const trimmedAnswers = answers.map(answer => answer.trim());
    // filter by empty answers
    const filteredAnswers = trimmedAnswers.filter(answer => answer !== '');
    // check if there are enough answers
    if (filteredAnswers.length < 2) {
      return setError('You must have at least 2 non-empty answers.');
    }
    // check if title is empty
    if (title.trim() === '') {
      return setError('You must have a title.');
    }

    // get limit_ip
    const limit_ip = limitIp === 'yes';

    // calculate expiration
    let expiration = 999999999999999;
    if (expirationDate === '10m') {
      expiration = Date.now() + 1000 * 60 * 10;
    } else if (expirationDate === '1h') {
      expiration = Date.now() + 1000 * 60 * 60;
    } else if (expirationDate === '1d') {
      expiration = Date.now() + 1000 * 60 * 60 * 24;
    } else if (expirationDate === '1w') {
      expiration = Date.now() + 1000 * 60 * 60 * 24 * 7;
    } else if (expirationDate === '1mo') {
      expiration = Date.now() + 1000 * 60 * 60 * 24 * 30;
    }

    // get poll datap
    const pollData = {
      title: title.trim(),
      options: filteredAnswers,
      limit_ip,
      expiration,
    };

    // post poll data to {API_URI}/poll
    API_URI =
      process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_API_URI
        : 'http://asking.one:8080';
    axios
      .post(`${process.env.API_URI}/poll`, pollData)
      .then(res => {
        // make sure status isn't error
        if (res.data.status !== 'success') {
          return setError('Unable to create poll. Please try again.');
        } else {
          // redirect to poll page
          window.location.href = `/${res.data.data.id}`;
        }
      })
      .catch(() => {
        setError('Unable to create poll. Try again.');
      });
  };

  return (
    <div className='home-container'>
      <h5 className='home-header'>Title</h5>
      <input
        placeholder='Type your question here...'
        className='home-input'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <br />
      <h5 className='home-header'>Answers</h5>
      {renderAnswers()}
      <button className='add-option-btn' onClick={addAnswer}>
        + Add option
      </button>
      <br />
      <h5 className='home-header'>Settings</h5>
      <label for='cars'>Limit one vote per IP:</label>
      <select
        name='limit_ip'
        id='limit_ip'
        style={{ marginLeft: 8 }}
        value={limitIp}
        onChange={e => setLimitIp(e.target.value)}
      >
        <option value='yes'>Yes</option>
        <option value='no'>No</option>
      </select>
      <br />
      <label for='cars'>Expiration:</label>
      <select
        name='limit_ip'
        id='limit_ip'
        style={{ marginLeft: 8 }}
        value={expirationDate}
        onChange={e => setExpirationDate(e.target.value)}
      >
        <option value='never'>Never</option>
        <option value='10m'>10 minutes</option>
        <option value='1h'>1 hour</option>
        <option value='1d'>1 day</option>
        <option value='1w'>1 week</option>
        <option value='1mo'>1 month</option>
      </select>
      <br />
      <br />
      <br />
      <button className='create-poll-btn' onClick={handleSubmit}>
        Create poll
      </button>
      {error && <p className='error-message'>{error}</p>}
    </div>
  );
}

export default Home;
