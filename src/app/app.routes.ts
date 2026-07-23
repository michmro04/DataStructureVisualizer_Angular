import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home';
import { StackComponent } from './views/stack/stack';

export const routes: Routes = [
    {path : '', component: HomeComponent},
    {path : 'stack', component: StackComponent}
];
