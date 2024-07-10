import React, { useState, useEffect } from 'react';
import fetchNews from '../services/fetchNews';
import ReactMarkdown from 'react-markdown';
import '../styles/News.css';
import '../styles/global.css';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching news...');
        const data = await fetchNews();
        console.log('News fetched:', data);
        setNews(data.news);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>News</h1>
      {news.length > 0 ? (
        <ul>
          {news.map((article) => (
            <li key={article.id}>
              <h2>{article.title}</h2>
              <p>{article.date_posted}</p>
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </li>
          ))}
        </ul>
      ) : (
        <p>No news articles found.</p>
      )}
    </div>
  );
};

export default News;