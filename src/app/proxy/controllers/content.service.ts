import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ArticleDto, CreateUpdateArticleDto } from '../content/models';
import type { ActionResult } from '../microsoft/asp-net-core/mvc/models';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  apiName = 'Default';
  

  getAll = () =>
    this.restService.request<any, ArticleDto[]>({
      method: 'GET',
      url: '/api/module/Content',
    },
    { apiName: this.apiName });
  

  getCmsContentById = (id: string) =>
    this.restService.request<any, ArticleDto>({
      method: 'GET',
      url: `/api/module/Content/${id}`,
    },
    { apiName: this.apiName });
  

  insertOrUpdateCmsContentByIdAndInput = (id: string, input: CreateUpdateArticleDto) =>
    this.restService.request<any, ActionResult>({
      method: 'POST',
      url: '/api/module/Content',
      params: { id },
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
