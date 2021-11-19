import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetNftRequest {
    tokenId: string;
}

interface GetNftResponse {
    nft: NftInterface;
    ownerName: string;
}

export interface TokenURIInterface {
    title: string;
    description: string;
    image: string;
}

interface GetUserNftsRequest {
    address: string;
}

interface GetUserNftsResponse {
    userNfts: NftInterface[];
}

export interface NftInterface {
    tokenId: number;
    recipient: string;
    address: string;
    transactionHash: string;
    transactionIndex: number;
    blockHash: string;
    blockNumber: number;
    tokenURI: TokenURIInterface;
}

export const nftApi = createApi({
    reducerPath: "nftApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        getNft: builder.query<GetNftResponse, GetNftRequest>({
            query: ({ tokenId }) => ({
                url: `nft/${tokenId}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }),
        }),
        getUserNfts: builder.query<GetUserNftsResponse, GetUserNftsRequest>({
            query: ({ address }) => ({
                url: `nft/user/${address}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }),
        })
    }),
});

export const { useGetNftQuery, useGetUserNftsQuery } = nftApi;