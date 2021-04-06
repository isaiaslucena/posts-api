import { RequestHandler } from 'express';
import { Post } from '../models/post';
import fs from 'fs';
import path from 'path';

const dataDirectory = path.resolve(__dirname, '../../src/data');
const jsonDataFile = `${dataDirectory}/posts.json`;

export const getPost: RequestHandler = (req, res, next) => {
  fs.readFile(jsonDataFile, 'utf8', (err, data) => {
    if (err) res.json({ message: err.message });
    res.json(JSON.parse(data));
  });
}

export const createPost: RequestHandler = (req, res, next) => {
  const { author, authorEmail, publishAt, content } = req.body;

  const post = new Post(author, authorEmail, publishAt, content);

  res.json({ message: "Post created!", post });
};

export const updatePost: RequestHandler = (req, res, next) => {
  const idParam = +req.params.id;
  const {
    author,
    authorEmail,
    publishAt,
    content
  }: {
    author: string;
    authorEmail: string;
    publishAt: string;
    content: string
  } = req.body;

  const jsonData = JSON.parse(fs.readFileSync(jsonDataFile, 'utf8'));

  const findPostIndex = jsonData.findIndex((post: { id: number }) => post.id === idParam);
  if (findPostIndex < 0) res.status(404).json({ message: `Post ID ${idParam} not found!` });

  jsonData[findPostIndex] = {
    ...jsonData[findPostIndex],
    author: author ? author : jsonData[findPostIndex].author,
    authorEmail: authorEmail ? authorEmail : jsonData[findPostIndex].authorEmail,
    publishAt: publishAt ? publishAt : jsonData[findPostIndex].publishAt,
    updatedAt: new Date().toISOString(),
    content: content ? content : jsonData[findPostIndex].content
  };

  fs.writeFileSync(jsonDataFile, JSON.stringify(jsonData), 'utf8');

  res.json({ message: "Post updated!", post: jsonData[findPostIndex] });
};