import React, { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news');
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
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
              <div>{article.content}</div>
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