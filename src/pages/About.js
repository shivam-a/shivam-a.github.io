import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import Main from '../layouts/Main';

const About = () => {
  const [markdown, setMarkdown] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (accessGranted) {
      import('../data/about.md').then((res) => {
        fetch(res.default)
          .then((r) => r.text())
          .then(setMarkdown);
      });
    }
  }, [accessGranted]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctAnswers = ['mumma', 'bhavna', 'chander', 'mom'];
    const normalizedInput = userInput.trim().toLowerCase();

    if (correctAnswers.includes(normalizedInput)) {
      setAccessGranted(true);
      setError('');
    } else {
      setError('Incorrect answer. Please try again.');
    }
  };

  const count = markdown
    .split(/\s+/)
    .map((s) => s.replace(/\W/g, ''))
    .filter((s) => s.length).length;

  return (
    <Main title="About" description="Learn about Shivam Arora">
      {!accessGranted ? (
        <div className="password-prompt">
          <h2>Access Restricted</h2>
          <p>To view this page, please answer the following question:</p>
          <p>Who is Shivam&apos;s most favorite person in this world?</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Enter the name"
            />
            <button type="submit">Submit</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <article className="post markdown" id="about">
          <header>
            <div className="title">
              <h2>
                <Link to="/about">About Me</Link>
              </h2>
              <p>(in about {count} words)</p>
            </div>
          </header>
          <Markdown>{markdown}</Markdown>
        </article>
      )}
    </Main>
  );
};

export default About;
