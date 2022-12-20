import { Category } from 'categories/types';

export type Article = {
  title: string;
  categories: Pick<Category, 'title' | 'path'>[];
  date: string;
  image: string;
  media: string;
};

export type ArticleListsProps = {
  articleItems: Article[];
  leftGenre: string;
  rightGenre: string;
};
