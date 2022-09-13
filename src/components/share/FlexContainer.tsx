import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  width: 400px;
  height: 97vh;
  border-radius: 40px;
  background: linear-gradient(to bottom, #2e90ff, #4a17d4);

  ::-webkit-scrollbar {
    display: none;
    width: 0;
  }
`;
