import styled from 'styled-components';
import { Button } from '@mui/material';
export const BlackButton = styled(Button)`
  && {
    background-color: #000000;
    color: white;
    margin-left: 4px;
    &:hover {
      background-color: #212020;
      border-color: #212020;
      box-shadow: none;
    }
  }
`;


export const RedButton = styled(Button)`
  && {
    background-color: #880808;
    color: #fff;
    &:hover {
      background-color: #AA4A44;
    }
  }
`;




