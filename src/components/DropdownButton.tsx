import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface DropdownProps {
  name: string,
  onClickDropdown: (arg0: string) => any,
  options: string[],
}

const Dropdown: React.FC<DropdownProps> = ({ name, onClickDropdown, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  // const [selectedOption, setSelectedOption] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    // setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <StyledDropdown ref={ref}>
      <StyledButton onClick={toggleDropdown}>
        {name}
        <StyledIcon className={isOpen ? 'open' : ''}>&#9660;</StyledIcon>
      </StyledButton>
      {isOpen && (
        <StyledMenu>
          {options.map((item, index) => (
            <StyledMenuItem key={index} onClick={()=>{onClickDropdown(item); toggleDropdown()}}>{item}</StyledMenuItem>
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
  background-color: #519259;
  color: white;
  // border: 2px solid green;
  border-radius: 1vw;
  padding-left:0.5vw;
  padding-right: 0.3vw;
  padding-top: 0.5vw;
  padding-bottom: 0.5vw;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 9vw;
  height:2.5vw;

  font-size: 0.9vw;
  font-weight: 500;

  &:hover {
    opacity: 0.8;
  }
`;

const StyledIcon = styled.span`
  margin-left: 1vw;
  font-size: 0.8vw;
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
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const StyledMenuItem = styled.li`
  border-bottom: 1px solid green;
  // padding: 5px;
  font-size: 0.9vw;
  padding: 0.2vw;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f2f2f2;
  }
`;

export default Dropdown;
