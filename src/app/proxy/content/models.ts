import type { AuditedEntityDto } from '@abp/ng.core';

export interface ArticleDto extends AuditedEntityDto<string> {
  heading?: string;
  byline?: string;
  body?: string;
}

export interface CreateUpdateArticleDto {
  heading: string;
  byline: string;
  body?: string;
}
