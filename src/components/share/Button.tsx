import styled from 'styled-components';

export const Button = styled.button`
  width: fit-content;
  padding: 0.3rem;
  margin-top: 0.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 15px;
  font-size: 1rem;
  font-family: 'Pretendard-medium';
  transition-duration: 0.4s;
  box-shadow: 5px 5px 8px 3px rgb(0 0 0 / 5%), 2px 2px 5px -2px rgba(0, 0, 0, 0.118),
    5px 2px 5px -7px rgb(0 0 0 / 5%);
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.white};
  }
  cursor: pointer;
`;
