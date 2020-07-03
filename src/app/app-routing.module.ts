import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForumComponent } from './forum/forum.component';
import { ThreadComponent } from './thread/thread.component';


const routes: Routes = [
  { path: '', component: ForumComponent },
  { path: 'thread', component: ThreadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
