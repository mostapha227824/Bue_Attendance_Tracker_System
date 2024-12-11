import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/BueLogo.svg";
import { RedButton } from '../components/buttonStyles';
const Homepage = () => {
    return (
        <StyledContainer>
            <Grid>
                <Grid >
                    <img src={Students} alt="students" style={{ width: '100%' }} />
                </Grid>
                <Grid>
                    <StyledPaper>
                        <StyledBox > 
                            <StyledLink to="/choose">
                                <RedButton variant="contained" fullWidth>
                                    Login
                                </RedButton>
                            </StyledLink>
                                <Link to="/Adminregister" style={{color:"#AA4A44"}}>
                                    Sign up As Admin
                                </Link>
                        </StyledBox>
                    </StyledPaper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
`;

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content:center;
  gap: 16px;
  padding: 24px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
