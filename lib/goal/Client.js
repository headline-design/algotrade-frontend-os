import algosdk from "algosdk";

const key = process.env.algod
const token = { 'X-Algo-API-Token' : key }
const server = 'https://mainnet1-node.algotrade.net'
const algodClient = new algosdk.Algodv2(token, server, '');

export default algodClient