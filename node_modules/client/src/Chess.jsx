import React, { Component } from "react";
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { isExpired, decodeToken } from "react-jwt";

import WithMoveValidation from "./integrations/WithMoveValidation";

function Chess(){

  const [token, setToken] = useState('');
  let navigate = useNavigate();
  

  useEffect(() =>{
    fetch('/api')
    .then((res)=>res.text())
    .then((data) => {
      setToken(data);
      console.log(data);
      if(isExpired(data)) navigate("/Home");
    });
    //if(isExpired(token)) navigate("/Home");


  }, []);

  return (
    <div>
      <div style={boardsContainer} >
      <h1>{token}</h1>
        <WithMoveValidation/>
      </div>
    </div>
  );
}

export default Chess;

const boardsContainer = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  width: "100vw",
  marginTop: 30,
  marginBottom: 50
};
