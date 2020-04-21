import { ethers } from 'ethers';
let { utils } = ethers;
let currentProvider = new window.web3.providers.HttpProvider('http://localhost:7545');

let web3Provider = new ethers.providers.Web3Provider(currentProvider);

if (!localStorage.getItem('wallet')) {
  const randomWallet = ethers.Wallet.createRandom();
  localStorage.setItem('wallet', JSON.stringify(randomWallet.signingKey));
}

// let walletInfo = JSON.parse(localStorage.getItem('wallet'));

// let transaction = {
//   to: '0x027a80F585b278daCAb7Ea58AA4731c95E308b18',
//   value: utils.parseEther('1.0'),
// };

// let wallet = new ethers.Wallet(walletInfo.privateKey, web3Provider);

// wallet.sendTransaction(transaction).then(tx => {
//   console.log(tx);
// });

// web3Provider.getBalance(`0xCd997DD8B1E11a017C8804FD2176662904D2113B`).then(data => {
//   let etherString = ethers.utils.formatEther(data);
//   console.log(etherString);
// });
let a = '123123';
const wallet = new ethers.Wallet(
  'ea92f19dac28eb4523cb141846914f7cadcdba342ad7b014c6b3ad44a2c5670e',
  web3Provider,
);
wallet
  .sendTransaction({
    to: '0xCd997DD8B1E11a017C8804FD2176662904D2113B',
    value: utils.parseEther('1.0'),
  })
  .then(tx => {
    console.log(tx);
  });
