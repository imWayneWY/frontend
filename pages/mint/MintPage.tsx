import React, { useState } from "react";
import styled, { css } from "styled-components";
import Navbar from "../../components/Navbar";
import catNft from "../../media/defaults/catnft.png";
import NFTCard from "../../components/NFTCard";
import pinkCandy from "../../media/pink-candy.svg";

const MintPageContainer = styled.div`
    font-family: Poppins, Open Sans;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    color: black;
    width: 50%;
    margin: 0 auto;

    @media (max-width: 1200px) {
        width: 90%;
    }
`;

const MintFormHeader = styled.h1`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const MintFormHeaderTitle = styled.h1`
    font-family: Rock Salt, Open Sans;
    font-size: 40px;
`;

const MintFormHeaderCandy = styled.img`
    height: 60px;
`;

const MintFormContainer = styled.div`
    width: 100%;
    margin: 10px 0px;
`;

const MintLabel = styled.label`
    text-align: left;
    display: block;
    font-size: 30px;
    margin-bottom: 5px;
`;

const formStyles = css`
    background-color: #FFFDFF;
    border: 1px solid #DC68F9;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 25px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    outline: none;
    width: 100%;
`;

const MintForm = styled.input`
    ${formStyles};
`;

const MintTextArea = styled.textarea`
    ${formStyles};
`;

const MintFormFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-top: 30px;
`;

const SubmitButton = styled.button`
        font-family: Poppins, Open Sans;
        font-size: 22px;
        background-color: #FF81EB;
        color: white;
        border: none;
        padding: 8px 40px;
        border-radius: 6px;
        margin-left: 50px;
        box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
        cursor: pointer;
`;

const EncryptedLabel = styled.h3`
    margin: 0;
`;

export default function MintPage() {
    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<string>("0");
    const [description, setDescription] = useState<string>("");

    return (
        <>
            <Navbar />
            <MintPageContainer>
                <MintFormHeader>
                    <MintFormHeaderTitle>Mint an NFT</MintFormHeaderTitle>
                    <MintFormHeaderCandy src={pinkCandy} />
                </MintFormHeader>
                <NFTCard title={"King Tobi"} owner={"@thecatdad"} price={"2.45 ETH"} rarity={[1, 8]} image={catNft} />
                <MintFormContainer>
                    <MintLabel htmlFor="titleInput">Title</MintLabel>
                    <MintForm type="text" id="titleInput" onChange={(e) => setTitle(e.target.value)} value={title} />
                </MintFormContainer>
                <MintFormContainer>
                    <MintLabel htmlFor="priceInput">Price</MintLabel>
                    <MintForm type="number" id="priceInput" onChange={(e) => setPrice(e.target.value)} value={price} />
                </MintFormContainer>
                <MintFormContainer>
                    <MintLabel htmlFor="descriptionInput">Description</MintLabel>
                    <MintTextArea id="descriptionInput" onChange={(e) => setDescription(e.target.value)} value={description} />
                </MintFormContainer>
                <MintFormFooter>
                    <EncryptedLabel>Encrypted Content y/n</EncryptedLabel>
                    <SubmitButton onClick={() => alert("Submitted!")}>MINT</SubmitButton>
                </MintFormFooter>
            </MintPageContainer>
        </>
    );
};