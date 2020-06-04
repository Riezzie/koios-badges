import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root'
})
export class ThreeBoxService {
  private web3: any;

  constructor(web3Service: Web3Service) {
    console.log(`3box service created with web3: ${web3Service}`);
    this.web3 = web3Service;
  }


}
