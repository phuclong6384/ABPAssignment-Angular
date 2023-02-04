import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';

@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    SharedModule,
    ArticleRoutingModule,
  ]
})
export class ArticleModule { }
