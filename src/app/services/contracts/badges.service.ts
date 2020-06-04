import { Injectable } from '@angular/core';
import { Web3Service } from '../web3.service';
import { Badge } from 'src/app/models/badge';

const BadgeAbi = require('../../../../truffle/build/contracts/BadgeGenerator.json');

@Injectable({
  providedIn: 'root'
})
export class BadgesService {

  private contract: any;
  private web3: any;

  public owner: any;
  public badgeCount: any;
  public isCreator: boolean;
  public badges: Badge[];

  constructor(web3: Web3Service) {
    console.log(`badge services created`)
    this.badges = [];
    this.web3 = web3;
    this.contract = web3.getContract(BadgeAbi);
    this.getBlockChainData();
  }

  private async getBlockChainData() {
    // Get owner of Contract
    this.contract.methods.owner().call().then((owner) => {
      this.owner = owner;
    }).catch((err) => {
      console.error(err);
    });

    // Get existing badges of Contract
    this.contract.methods.badgeCount().call().then((count) => {
      this.badgeCount = count;
      for (let i = 0; i < count; i++) {
        // Get existing badges of Contract
        this.contract.methods.badges(i).call().then((badge) => {
          const tmpBadge: Badge = {
            id: badge.id,
            owner: badge.owner,
            metadataUrl: badge.metadataUrl
          };
          this.badges.push(tmpBadge);
        }).catch((err) => {
          console.error(err);
        });
      }
    }).catch((err) => {
      console.error(err);
    });

    // Get existing badges of Contract
    this.contract.methods.creators(this.web3.account).call().then((bool) => {
      console.log(bool);
      this.isCreator = bool;
    }).catch((err) => {
      console.error(err);
    });
  }

  public async createBadge(data): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.contract.methods.createBadge(data).send({from: this.web3.account}).then((res) => {
        resolve(res);
      }).catch((err) => {
        console.error(err);
        reject('Could not create Badge');
      });
    }) as Promise<any>;
  }

  public async addCreator(data): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.contract.methods.addCreator(data).send({from: this.web3.account}).then((res) => {
        if (data === this.web3.account) {
          this.isCreator = true;
        }
        resolve(res);
      }).catch((err) => {
        console.error(err);
        reject('Could not add creator with address: ' + data);
      });
    }) as Promise<any>;
  }

  public async removeCreator(data): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.contract.methods.removeCreator(data).send({from: this.web3.account}).then((res) => {
        if (data === this.web3.account) {
          this.isCreator = false;
        }
        resolve(res);
      }).catch((err) => {
        console.error(err);
        reject('Could not remove creator with address: ' + data);
      });
    }) as Promise<any>;
  }
}
