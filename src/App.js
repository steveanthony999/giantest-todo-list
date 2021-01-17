import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  background: #fff;
  display: flex;
  overflow: hidden;
`;

const ListContainer = styled.div`
  width: 90%;
  height: 100vh;
  overflow: scroll;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledX = styled.button`
  background: transparent;
  border: none;
  color: red;
  font-size: 4rem;
  font-weight: bold;
  padding: 0 2rem;
  margin-left: -${(props) => props.buttonOffset}rem;
  transition: 0.2s;

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.4);
  }
`;

const StyledItem = styled.h2`
  font-size: 8rem;
  text-transform: uppercase;
  font-weight: bold;
  line-height: 0;
  margin-left: 2rem;

  &:hover {
    cursor: pointer;
  }
`;

const TextContainer = styled.div`
  width: 200px;
  height: 100vh;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.form`
  height: 190px;
  transform: rotate(-90deg);
  display: flex;
`;

const StyledInput = styled.input`
  width: 1000px;
  background: #000;
  color: #fff;
  border: none;
  font-size: 8rem;
  text-transform: uppercase;
  font-weight: bold;

  &:focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButton = styled.button`
  width: 130px;
  height: 130px;
  background: #000;
  color: #fff;
  font-size: 8rem;
  border: none;
  transform: rotate(90deg);
  font-weight: bold;
  transition: 0.2s;

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
    color: red !important;
  }
`;

function App() {
  const [textValue, setTextValue] = useState('');
  const [todo, setTodo] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [buttonOffset, setButtonOffset] = useState(6);
  const [dashColor, setDashColor] = useState('#ffffff');

  useEffect(() => {
    if (isOpen) {
      console.log('open');
    } else {
      console.log('shut');
    }
  }, [isOpen]);

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setTodo((todo) => [...todo, textValue]);
    setTextValue('');
  };

  const openCloseMenu = () => {
    if (isOpen === false) {
      setIsOpen(true);
      setButtonOffset(0);
      setDashColor('#ff0000');
    } else {
      setIsOpen(false);
      setButtonOffset(6);
      setDashColor('#ffffff');
    }
  };

  const cancelItem = (e) => {
    setTodo(todo.filter((x) => x !== e));
  };

  return (
    <Main>
      <ListContainer>
        {todo.map((e) => (
          <ItemContainer key={uuidv4()}>
            <StyledX buttonOffset={buttonOffset} onClick={() => cancelItem(e)}>
              x
            </StyledX>
            <StyledItem>{e}</StyledItem>
          </ItemContainer>
        ))}
      </ListContainer>
      <TextContainer>
        <StyledForm onSubmit={addItem}>
          <StyledInput type='text' value={textValue} placeholder='ADD ITEM...' autoFocus onChange={handleTextChange} />
          <ButtonContainer>
            <StyledButton onClick={openCloseMenu} type='button' style={{ color: dashColor }}>
              -
            </StyledButton>
            <StyledButton type='submit'>+</StyledButton>
          </ButtonContainer>
        </StyledForm>
      </TextContainer>
    </Main>
  );
}

export default App;
