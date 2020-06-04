import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const Web3 = require('web3');

declare let require: any;
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  public account: any = null;
  public networkId: number = null;
  public web3: any;

  constructor() {
    this.account = "hallo",
    this.networkId = 3
  }

  async initialize () {
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      await window.ethereum.enable();
      
      // detect metamask change
      window.ethereum.on('chainIdChanged', (id) => { this.networkId = id });
      window.ethereum.on('accountsChanged', (address) => { this.account = address[0] });
      window.ethereum.autoRefreshOnNetworkChange = false;

      this.web3 = new Web3(Web3.givenProvider);

      this.networkId = await this.web3.eth.net.getId();
      let addressess = await this.web3.eth.getAccounts();
      this.account = addressess[0];
      console.log(`%cWeb 3 initialized; account: ${this.account}, network: ${this.networkId}`, 'color:red; font-weight: bold')
    }
  }
  
  public async getContract(contractAbi: any) {
    const networkData = contractAbi.networks[this.networkId];
    if (networkData) {
      const abi = contractAbi.abi;
      const address = networkData.address;
      return new this.web3.eth.Contract(abi, address);
    }
    return false;
  }

  // // detect metamask change
  // setInterval(() => {
  //   this.getAccount().then((account) => {
  //     if (account !== this.account) {
  //       this.account = account;
  //       this.badges = [];
  //       this.isCreator = null;
  //       this.getContract();
  //     }
  //   });
  // }, 1000);
  
  // private async enableMetaMaskAccount(): Promise<any> {
  //   let enable = false;
  //   await new Promise((resolve, reject) => {
  //     enable = window.ethereum.enable();
  //   });
  //   return Promise.resolve(enable);
  // }

  // private async getAccount(): Promise<any> {
  //   return await new Promise((resolve, reject) => {
  //     this.web3.eth.getAccounts((err, retAccount) => {
  //       if (retAccount.length > 0) {
  //         resolve(retAccount[0]);
  //       } else {
  //         reject('No accounts found.');
  //       }
  //       if (err != null) {
  //         reject('Error retrieving account');
  //       }
  //     });
  //   }) as Promise<any>;
  // }


}
