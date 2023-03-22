import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Textbox = styled.textarea`
  width: 500px;
  height: 125px;
  border-radius: 10px;
  border: 2px solid green;
  padding: 10px;
  font-size: 1rem;
  color: gray;
  margin-bottom: 20px;

  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background-color: green;
  color: white;
  font-size: 1rem;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
`;

const Text = styled.div`
  font-weight: bold;
  font-size: 1rem;
  color: black;
  width: 100%;
  float: left;
  padding: 0.5rem 4rem;
`;

const Notes = () => {
  const [text, setText] = useState('');

  const handleClick = () => {
    alert('Estimate sent.');
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <Container>
      <Text>Notes</Text>
      <Textbox placeholder='Enter text here' value={text} onChange={handleChange} />
      <SubmitButton onClick={handleClick}>Send me this Estimate</SubmitButton>
    </Container>
  );
};

export default Notes;