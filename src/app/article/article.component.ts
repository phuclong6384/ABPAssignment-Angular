import { Component, OnInit } from '@angular/core';
import { CreateUpdateArticleDto, ArticleDto } from '@proxy/content';
import { ContentService } from '@proxy/controllers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'articles',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})

export class ArticleComponent implements OnInit {
  articles: ArticleDto[] = [];
  isModalOpen = false;
  selectedArticle = {} as ArticleDto;
  form: FormGroup;

  constructor(
    private contentService: ContentService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.refresh();
  }

  // actions
  refresh(){
    this.contentService.getAll().subscribe((response) => {
      this.articles = response;

      if(this.selectedArticle.id == null){
        if(this.articles.length > 0)
          this.selectedArticle = this.articles[0];
      }

        this.isModalOpen = false;
    });
  }

  select(id: string){
    this.contentService.getCmsContentById(id).subscribe((article) => {
      this.selectedArticle = article;
    });
  }
  create() {
    // this.selectedArticle = {} as ArticleDto;

    this.buildForm(true);
    this.isModalOpen = true;
  }
  edit(id: string) {
    this.buildForm(false);
    this.isModalOpen = true;
  }

  buildForm(isAdd:boolean) {
    this.form = this.fb.group({
      heading: [isAdd == true ? '' : (this.selectedArticle.heading || ''), [Validators.required, Validators.maxLength(200)]],
      byline: [isAdd == true ? '' : (this.selectedArticle.byline || ''), [Validators.required, Validators.maxLength(50)]],
      body: [isAdd == true ? '' : (this.selectedArticle.body || ''), Validators.maxLength(4000)],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.contentService.insertOrUpdateCmsContentByIdAndInput(this.selectedArticle.id, this.form.value);

    request.subscribe((article) => {
      this.form.reset();
      this.selectedArticle = article;
      this.refresh();
    });
  }
}