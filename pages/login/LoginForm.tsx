import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { usePostLoginMutation } from "../../redux/api/login";
import { setUserLoggedIn, setUserEmail } from "../../redux/slices/user";
import loadingSpinner from "../../media/loading.svg";
import FormInput from "../../components/FormInput";

const LoginFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FFEAFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    border: 1px solid #FEB8FF;
    padding: 50px 100px;
    color: black;
`;

const LoginHeader = styled.h1`
    font-family: Rock Salt, Open Sans;
    color: #c931ff;
`;

const SubmitButton = styled.button`
    margin: 20px;
    background: #f455fa;
    border: 1px solid #707070;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    color: white;
    padding: 8px 25px;
    font-family: Poppins, Open Sans;
    font-size: 20px;
    cursor: pointer;

    :hover{
        background: #ff44e6;  
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-family: Poppins, Open Sans;
`;

export default function LoginForm(props) {
    const loggedIn = useAppSelector(state => state.user.loggedIn);
    const dispatch = useAppDispatch();
    const history = useHistory();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [postLogin, { isLoading, isSuccess, isError, data, error }] = usePostLoginMutation();

    useEffect(() => {
        if (isSuccess) {
            window.localStorage.setItem("token", data.token);
            dispatch(setUserLoggedIn(true));
            dispatch(setUserEmail(data.decoded.email));
        } else if (isError) {
            window.localStorage.removeItem("token");
        }
    }, [data, isSuccess, isError]);

    useEffect(() => {
        if (loggedIn) {
            const params = new URLSearchParams(window.location.search);
            const redirectPath = params.get("redirect");
            history.push(redirectPath || "");
        }
    }, [loggedIn]);

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            postLogin({ token });
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit!");
        postLogin({ email, password });
    };

    return (
        <LoginFormContainer onSubmit={handleSubmit}>
            <LoginHeader>Login</LoginHeader>
            <FormInput label="Email" type="email" onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
            <FormInput label="Password" type="password" onChange={(e) => setPassword(e.target.value)} autoComplete="password" required />
            <ErrorMessage>{isError && error.data.error}</ErrorMessage>
            {
                isLoading ? <img src={loadingSpinner} /> : <SubmitButton>Submit</SubmitButton>
            }
        </LoginFormContainer>
    );
};