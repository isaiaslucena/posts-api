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

    this.id = this.lastId;
    this.author = author;
    this.authorEmail = authorEmail;
    this.publishAt = publishAt;
    this.updatedAt = now;
    this.createdAt = now;
    this.content = content;

    const post = {
      id: this.id,
      author: this.author,
      authorEmail: this.authorEmail,
      publishAt: this.publishAt,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
      content: this.content,
    }

    this.addNewPost(post);
  }

  get posts() {
    return JSON.parse(fs.readFileSync(jsonDataFile, 'utf8'));
  }

  get lastId() {
    const jsonData: PostItem[] = this.posts;

    if (!jsonData.length) return 1;

    const sortedJsonData = jsonData.sort((a, b) => a.id - b.id);
    const lastId = sortedJsonData[jsonData.length - 1].id;
    return lastId + 1;
  }

  private getNowDateTime() {
    return new Date().toISOString();
  }

  addNewPost(post: Object) {
    const currentPosts = this.posts;
    currentPosts.push(post);

    fs.writeFileSync(jsonDataFile, JSON.stringify(currentPosts), 'utf8');
  }
}