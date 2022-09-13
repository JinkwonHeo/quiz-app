import styled from 'styled-components';

export const Button = styled.button`
  width: 80%;
  padding: 1rem 0;
  margin: 0.5rem 0;
  border: none;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  font-family: 'Pretendard-medium';
  color: #0066ff;
  transition-duration: 0.4s;
  box-shadow: 5px 5px 8px 3px rgb(0 0 0 / 20%), 2px 2px 5px -2px rgba(0, 0, 0, 0.218),
    5px 2px 5px -7px rgb(0 0 0 / 20%);
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.white};
  }
  cursor: pointer;
`;
