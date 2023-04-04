import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  placeholderText: string;
  submitButtonText: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 4.8vw;
  margin-right: 8vw;
`;

const Textbox = styled.textarea`
  width: 21vw;
  height: 8vh;
  border-radius: 10px;
  border: 2px solid green;
  padding: 0.2vw;
  font-size: 0.8vw;
  color: gray;

  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background-color: #519259;
  height: 5vh;
  color: white;
  font-size: 1vw;
  border-radius: 10px;
  cursor: pointer;
  width: 12vw;
  margin-top: 3vh;
`;

const Notes = ({title, placeholderText, submitButtonText}: Props) => {
  const [text, setText] = useState('');

  const handleClick = () => {
    alert('Estimate sent.');
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <Container>
      <Textbox placeholder={placeholderText} value={text} onChange={handleChange} />
      <SubmitButton onClick={handleClick}>{submitButtonText}</SubmitButton>
    </Container>
  );
};

export default Notes;