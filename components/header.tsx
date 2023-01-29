import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: fixed;
    width: 100%;
    //height: 5rem;
    padding: 0 12px; 
    background-color:whitesmoke; 

    h1 {
    font-size: 21px;    
    }
    
    .logo {
    height: 60px;
    align-self:center;
    margin-left: 4.5rem;
    }
`;
const Header: React.FC = () => {
    return (
        <Container>
            <title> Create Junglim AI image DALLE 2 App</title>
            <img className="logo" src ="/jl_logo.png"/> 
        </Container>
    );
};

export default Header;
