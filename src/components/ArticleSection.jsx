import React, { useState } from 'react';
import { marked } from 'marked';

const ArticleSection = ({ courseData }) => {
  const [translatedContent, setTranslatedContent] = useState('');
  const [loading, setLoading] = useState(false); // New loading state

  const translateArticle = async () => {
    const language = document.getElementById('languageSelect').value;
    const article = courseData.article;

    setLoading(true); // Start loading
    setTranslatedContent(''); // Clear previous translation

    try {
      const response = await fetch('http://localhost:5000/api/courses/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ article, language }),
      });

      if (!response.ok) throw new Error('Failed to translate article');
      const data = await response.json();
      setTranslatedContent(data.translatedText);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedContent('Translation failed: ' + error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="content-section my-4 px-3">
      <div className="mb-4 d-flex align-items-end gap-3 flex-wrap">
        <button
          id="translateArticleBtn"
          className="btn btn-secondary"
          onClick={translateArticle}
        >
          Translate Article
        </button>
        <select
          id="languageSelect"
          className="form-select"
          style={{ width: 'auto', minWidth: '150px' }}
        >
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
        </select>
      </div>

      <h3>{courseData.title}</h3>

      <div className="d-flex flex-wrap gap-4 article-content-wrapper">
        <div
          id="articleContent"
          className="article-column"
          dangerouslySetInnerHTML={{ __html: marked(courseData.article) }}
        />

        <div className="article-column">
          {loading ? (
            <div className="text-muted fst-italic">Translating... please wait.</div>
          ) : translatedContent ? (
            <div
              id="translatedArticleContent"
              dangerouslySetInnerHTML={{ __html: marked(translatedContent) }}
            />
          ) : (
            <div className="text-muted">Translation will appear here.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleSection;
