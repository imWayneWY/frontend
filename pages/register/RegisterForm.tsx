import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { usePostRegisterMutation, useVerifyEmailMutation } from "../../redux/api/register";
import loadingSpinner from "../../media/loading.svg";
import FormInput from "../../components/FormInput";

const RegisterFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FFEAFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    border: 1px solid #FEB8FF;
    padding: 2rem 2rem;
    color: black;
    margin: 2rem;
    height: 62vh;
    overflow-y: auto;

    @media (min-width: ${props => props.theme.breakpoints.tablet}px) {
        padding: 3rem 5rem;
        height: fit-content;
    }
`;

const RegisterHeader = styled.h1`
    font-family: Rock Salt, Open Sans;
    color: #c931ff;
`;

const SubmitButton = styled.button<{ $disabled?: boolean }>`
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
    opacity: ${props => props.$disabled ? 0.8 : 1};

    :hover{
        background: #ff44e6;  
    }

    ${props => props.$disabled && css`
        cursor: not-allowed;
        :hover{
            background: #f455fa;  
        }
    `}
`;

const ErrorMessage = styled.p`
    color: red;
    font-family: Poppins, Open Sans;
`;

export default function RegisterForm() {
    const history = useHistory();

    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isPasswordConfirmed, setIsPasswordConfirmed] = useState<boolean>(false);
    const [isVerificationStage, setIsVerificationStage] = useState<boolean>(false);
    const [verificationCode, setVerificationCode] = useState<string>("");

    const [postRegister, {
        isLoading: isRegisterLoading,
        isSuccess: isRegisterSuccess,
        isError: isRegisterError,
        data: registerData,
        error: registerError
    }] = usePostRegisterMutation();

    const [postVerifyEmail, {
        isLoading: isVerifyEmailLoading,
        isSuccess: isVerifyEmailSuccess,
        isError: isVerifyEmailError,
        data: verifyEmailData,
        error: verifyEmailError
    }] = useVerifyEmailMutation();

    useEffect(() => {
        if (isRegisterSuccess) {
            history.push("/login");
        }
    }, [registerData, isRegisterSuccess, isRegisterError]);

    useEffect(() => {
        setIsPasswordConfirmed((password && confirmPassword) && (password === confirmPassword));
    }, [password, confirmPassword]);

    const handleRegister = (e) => {
        e.preventDefault();
        postRegister({ email, name, password, verificationCode });
    };

    const handleVerifyEmail = (e) => {
        e.preventDefault();
        postVerifyEmail({ email });
    };

    return (
        <RegisterFormContainer>
            <RegisterHeader>Register</RegisterHeader>
            <FormInput label="Email" type="email" onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
            <FormInput label="Name" type="text" onChange={(e) => setName(e.target.value)} required />
            <FormInput label="Password" type="password" onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required />
            <FormInput label="Confirm Password" type="password" onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" required />
            <FormInput label="Verification Code" type="text" onChange={(e) => setVerificationCode(e.target.value)} required />
            <ErrorMessage>{isRegisterError && registerError.data.error}</ErrorMessage>
            <SubmitButton onClick={handleVerifyEmail} disabled={!email} $disabled={!email}>Send Code</SubmitButton>
            {
                isRegisterLoading ? <img src={loadingSpinner} /> : <SubmitButton onClick={handleRegister} disabled={!isPasswordConfirmed} $disabled={!isPasswordConfirmed}>Submit</SubmitButton>
            }
            <Link to="/login">Login</Link>
        </RegisterFormContainer>
    );
};