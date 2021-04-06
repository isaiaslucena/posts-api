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