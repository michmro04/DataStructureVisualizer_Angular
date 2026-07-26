import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home';
import { StackComponent } from './views/stack/stack';
import { QueueComponent } from './views/queue/queue';
import { LinkedListComponent } from './views/linkedList/linkedList';

export const routes: Routes = [
    {path : '', component: HomeComponent},
    {path : 'stack', component: StackComponent},
    {path : 'queue', component: QueueComponent},
    {path: 'linkedList', component: LinkedListComponent}
];
