import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { FieldInput } from "../components";
import Layout from "../components/Layout";

const HeadingStyled = styled.h3`
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 2rem;
`;

const HeadingSubStyled = styled.h4`
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 600px;
  gap: 1rem;
`;

const ButtonStyled = styled.button`
  outline: none;
  border: none;
  padding: 1rem;
  display: inline-block;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
`;

const JSONData = styled.span`
  font-size: 1.2rem;
  font-weight: 300;
  color: red;
`;

const JSONDataSuccess = styled.span`
  font-size: 1.2rem;
  font-weight: 300;
  color: green;
`;

const SectionStyled = styled.section`
  margin: 3rem 0;
  display: flex;
  flex-direction: column;
`;

const Home = () => {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState();
  const [sessionData, setSessionData] = useState();
  const [logoutData, setLogoutData] = useState();

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLoginInput({ ...loginInput, email: e.target.value });

  const handleSubmitFormDataLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    await axios
      .post(
        `http://localhost:5555/api/session`,
        { ...loginInput },
        {
          withCredentials: true,
        }
      )

      .then((res) => setLoginData(res?.data))
      .catch((error) => {
        return setLoginData(error.response?.data.message);
      });
  };

  const handleGetSession = async () => {
    await axios
      .get(`http://localhost:5555/api/session`, {
        withCredentials: true,
      })
      .then((res) => setSessionData(res.data))
      .catch((error) => setSessionData(error.message));
  };
  const handleLogout = async () => {
    await axios
      .delete(`http://localhost:5555/api/session`, {
        withCredentials: true,
      })
      .then((res) => setLogoutData(res.data))
      .catch((error) => setLogoutData(error.message));
  };

  return (
    <Layout>
      <HeadingStyled>Demo app</HeadingStyled>
      <HeadingSubStyled>Login</HeadingSubStyled>
      <FormStyled onSubmit={handleSubmitFormDataLogin}>
        <FieldInput
          name="email"
          label="Email"
          placeholder="hosybinhkog@gmail.com"
          type="email"
          value={loginInput.email}
          onChange={handleOnChangeInput}
        />
        <FieldInput
          name="password"
          label="password"
          type="password"
          value={loginInput.password}
          onChange={(e) =>
            setLoginInput({ ...loginInput, password: e.target.value })
          }
        />
        <ButtonStyled type="submit">Login</ButtonStyled>
        <JSONData>{JSON.stringify(loginData)}</JSONData>
        <JSONDataSuccess>
          ACCOUNT VALID :{" "}
          {JSON.stringify({ email: "test@test.com", password: "password" })}
        </JSONDataSuccess>
      </FormStyled>

      <SectionStyled>
        <HeadingSubStyled>Session</HeadingSubStyled>
        <ButtonStyled onClick={handleGetSession}>Get Session</ButtonStyled>
        <JSONDataSuccess>
          {JSON.stringify(sessionData, null, 4)}
        </JSONDataSuccess>
      </SectionStyled>

      <SectionStyled>
        <HeadingSubStyled>Logout</HeadingSubStyled>
        <ButtonStyled onClick={handleLogout}>Logout</ButtonStyled>
        <JSONDataSuccess>{JSON.stringify(logoutData, null, 4)}</JSONDataSuccess>
      </SectionStyled>
    </Layout>
  );
};

export default Home;
