import React, { useState } from 'react';
import styled from 'styled-components';

interface DropdownProps {
  name: string,
  onClickDropdown: (arg0: string) => any,
  options: string[],
}

const Dropdown: React.FC<DropdownProps> = ({ name, onClickDropdown, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <StyledDropdown>
      <StyledButton onClick={toggleDropdown}>
        {name}
        <StyledIcon className={isOpen ? 'open' : ''}>&#9660;</StyledIcon>
      </StyledButton>
      {isOpen && (
        <StyledMenu>
          {options.map((item, index) => (
            <StyledMenuItem key={index} onClick={onClickDropdown(item)}>{item}</StyledMenuItem>
          ))}
        </StyledMenu>
      )}
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledButton = styled.button`
  background-color: none;
  color: green;
  border: 2px solid green;
  border-radius: 20px;
  padding: 10px 30px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    opacity: 0.8;
  }
`;

const StyledIcon = styled.span`
  margin-left: 10px;
  font-size: 12px;
  transition: transform 0.3s ease;

  &.open {
    transform: rotate(180deg);
  }
`;

const StyledMenu = styled.ul`
  background-color: white;
  border: 1px solid green;
  border-top: none;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 1;
`;

const StyledMenuItem = styled.li`
  border-bottom: 1px solid green;
  padding: 5px;
  font-size: 16px;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f2f2f2;
  }
`;

export default Dropdown;
