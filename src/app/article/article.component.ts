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
  isAdd = false;
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
    this.isAdd = true;
    this.buildForm();
    this.isModalOpen = true;
  }
  edit() {
    this.isAdd = false;
    this.buildForm();
    this.isModalOpen = true;
  }

  buildForm() {
    this.form = this.fb.group({
      heading: [this.isAdd == true ? '' : (this.selectedArticle.heading || ''), [Validators.required, Validators.maxLength(200)]],
      byline: [this.isAdd == true ? '' : (this.selectedArticle.byline || ''), [Validators.required, Validators.maxLength(50)]],
      body: [this.isAdd == true ? '' : (this.selectedArticle.body || ''), Validators.maxLength(4000)],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    var id = this.isAdd ? null : this.selectedArticle.id;
    const request = this.contentService.insertOrUpdateCmsContentByIdAndInput(id, this.form.value);

    request.subscribe((article) => {
      this.form.reset();
      this.selectedArticle = article;
      this.refresh();
    });
  }
}