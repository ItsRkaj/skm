'use client';

import {addNews} from '@/modules/apiClient';
import type {NewsInsert } from '@/modules/apiTypes';
import {useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function NewsForm() {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
 
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newNews: NewsInsert = {
      text: text,
      author: author,
      title: title,
      date: date,
    };

    try {
      await addNews(newNews);
    } catch (error) {
      console.error('message', error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 p-5">
      <h1 className="flex flex-col items-center w-full">Add news</h1>
      <div className="w-full gap-10">
        {/*eslint-disable-next-line @typescript-eslint/no-misused-promises*/}
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="Titte">Title</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full"
              placeholder="Title text"
            />
          </div>

          <div>
            <Label htmlFor="Author">Author</Label>
            <Input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full"
              placeholder="Author's name"
            />
          </div>

          <div>
            <Label htmlFor="Text">Text</Label>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              className="w-full"
              placeholder="text of the news"
            />
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              type="text"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full"
              placeholder="date"
            />
          </div> 

          <Button
            type="submit"
            className="w-full bg-gray-500 hover:bg-gray-400">
            Add News
          </Button>
        </form>
      </div>
    </div>
  );
}
