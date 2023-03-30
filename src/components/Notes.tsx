import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  placeholderText: string;
  submitButtonText: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Textbox = styled.textarea`
  width: 85%;
  height: 8vh;
  border-radius: 10px;
  border: 2px solid green;
  padding: 1vh;
  font-size: 2vh;
  color: gray;
  // margin-bottom: 20px;
  margin-bottom: 1vh;

  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background-color: green;
  color: white;
  font-size: 2vh;
  border-radius: 10px;
  padding: 1vh 2vh;
  cursor: pointer;
`;

const Text = styled.div`
  font-weight: bold;
  font-size: 2vh;
  color: black;
  width: 85%;
  float: left;
  // padding: 0.5rem 4rem;
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
      <Text>{title}</Text>
      <Textbox placeholder={placeholderText} value={text} onChange={handleChange} />
      <SubmitButton onClick={handleClick}>{submitButtonText}</SubmitButton>
    </Container>
  );
};

export default Notes;