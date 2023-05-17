import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, Input, Button } from 'antd';

interface Props {
  title: string;
  placeholderText: string;
  submitButtonText: string;
}


const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 5vw;
  width:100%;
`;

const Textbox = styled.textarea`
  width: 21.3vw;
  height: 11.5vh;
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
  margin-top: 6.5vh;
`;

const NotesLabel = styled.div`
  /* font-family: 'Open Sans'; */
    font-style: normal;
    font-weight: 700;
    font-size: 1vw;
    line-height: 27px;
    text-align: right;

    color: #000000;
    display:flex;
    justify-content: right;
    width: 8vw;
    padding-right:1.5vw;
`

const Notes = ({ title, placeholderText, submitButtonText }: Props) => {
  const [text, setText] = useState('');
  const [showBtn, setShowBtn] = useState("display: 'none'");
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');

  const handleOk = () => {
    // Handle the email sending logic here
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div>
      <NotesLabel>Notes</NotesLabel>
      <Container>
        <Textbox placeholder={placeholderText} value={text} onChange={handleChange} />
        <SubmitButton onClick={handleOpenModal}>{submitButtonText}</SubmitButton>
        <Modal
          title="Email Form"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              Send Email
            </Button>,
          ]}
        >
          <div style={{ padding: '10px 0px' }}>
            <Input type='email' placeholder="Email Address" value={email} onChange={handleEmailChange} />
          </div>
        </Modal>
      </Container>
    </div>
  );
};

export default Notes;