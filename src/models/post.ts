import fs from 'fs';
import path from 'path';

const dataDirectory = path.resolve(__dirname, '../../src/data');
const jsonDataFile = `${dataDirectory}/posts.json`;

type PostItem = {
  id: number;
  publishAt: string;
  updatedAt: string;
  createdAt: string;
  author: string;
  authorEmail: string;
  content: string;
};

export class Post {
  id: number;
  publishAt: string;
  updatedAt: string;
  createdAt: string;
  author: string;
  authorEmail: string;
  content: string;

  constructor(author: string, authorEmail: string, publishAt: string, content: string) {
    const now = this.getNowDateTime();

    this.id = this.setLastId();
    this.author = author;
    this.authorEmail = authorEmail;
    this.publishAt = publishAt;
    this.updatedAt = now;
    this.createdAt = now;
    this.content = content;
  }

  private getNowDateTime() {
    return new Date().toISOString();
  }

  private setLastId() {
    const jsonData: PostItem[] = JSON.parse(fs.readFileSync(jsonDataFile, 'utf8'));

    if (!jsonData.length) return 1;

    const sortedJsonData = jsonData.sort((a, b) => a.id - b.id);
    const lastId = sortedJsonData[jsonData.length - 1].id;
    return lastId + 1;
  }
}