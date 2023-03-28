import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Login.css";
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from "@mantine/core";

async function loginUser(credentials) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
} 

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [logindata,setLoginData] = useState(0);

  useEffect(() => {
    refreshList();
  }, []);

  function refreshList(){
    fetch('http://localhost:8080/demo')
    .then(response=>response.json())
    .then(data=>{setLoginData({logindata:data});
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });

    const myusers = logindata.logindata;
    
    if (username === myusers.username && password === myusers.password) {
      window.location.href = "/articles";
      setToken(token);
    }
    else{
      window.alert("Invalid Credentials");
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="login-wrapper">
        <Container size={420} my={40}>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Welcome back!
          </Title>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Username"
              placeholder="Enter your username"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              required
              mt="md"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button fullWidth mt="xl" type="submit" onSubmit={handleSubmit}>
              Sign in
            </Button>
          </Paper>
        </Container>
      </div>
    </form>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
