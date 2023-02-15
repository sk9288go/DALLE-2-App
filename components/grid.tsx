
import { useState } from "react";
import styled from "styled-components";


const Container = styled.div`
.grid {
        margin-left:350px;
        display:grid;
        /*display:block;*/
        /* background-color: #0070f3; */
    }

    
    .card {
        padding: 1rem;
        text-align: left;
        color: inherit;
        text-decoration: none;
        border-radius: 10px;
        transition: color 0.15s ease, border-color 0.15s ease;
        max-width: 300px; /* 300px for 3 in a row */
    }

    .imgPreview {
        width: 100%;
        border-radius: 10px;
    }

    .imgPreview:hover,
    .imgPreview:focus,
    .imgPreview:active {
        transform: scale(1.01);
        cursor: pointer;
    }

    .card h2 {
        margin: 0 0 1rem 0;
        font-size: 20px;
    }

    .card p {
        margin: 0;
        font-size: 20px;
        line-height: 1.5px;
    }
`;
const [results, setResults] = useState([]);


