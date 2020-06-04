import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../services/web3.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  constructor(Web3Service: Web3Service) {
    console.log(`%cForum component created with web3 account: ${Web3Service.account}`, 'color: red; font-weight: bold');
  }

  ngOnInit(): void {

  }

}
