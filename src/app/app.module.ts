import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForumComponent } from './forum/forum.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { ThreadListItemComponent } from './thread-list-item/thread-list-item.component';
import { ThreadComponent } from './thread/thread.component';
import { ThreadPostListComponent } from './thread-post-list/thread-post-list.component';
import { ThreadPostListItemComponent } from './thread-post-list-item/thread-post-list-item.component';
import { Web3Service } from './services/web3.service';
import { onAppInit } from './factories/on-app-init.factory';

@NgModule({
  declarations: [
    AppComponent,
    ForumComponent,
    ThreadListComponent,
    ThreadListItemComponent,
    ThreadComponent,
    ThreadPostListComponent,
    ThreadPostListItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: onAppInit,
      deps: [ Web3Service ],
      multi: true
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
