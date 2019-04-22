import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{ImageSearchComponent} from './image-search/image-search.component';
import{SearchHistoryComponent} from './search-history/search-history.component';


const routes: Routes = [
    {path:'',
  children:[
  {
      path:'SearchHistory',
      component : SearchHistoryComponent
    },
    {
      path: 'ImageSearch',
      component:ImageSearchComponent
    },
    {
      path: '**',
      redirectTo:'/ImageSearch' 
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
