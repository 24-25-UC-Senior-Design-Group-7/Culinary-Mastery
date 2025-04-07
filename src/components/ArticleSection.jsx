import React, { useState } from 'react';
import { marked } from 'marked'; // Correct way for version 4.x.x and later

const ArticleSection = ({ courseData }) => {
  const [translatedContent, setTranslatedContent] = useState('');

  const translateArticle = async () => {
    const language = document.getElementById('languageSelect').value;
    const article = courseData.article;

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
    }
  };

  return (
    <div className="content-section my-4">
      <h3>{courseData.title}</h3>
      <div
        id="articleContent"
        dangerouslySetInnerHTML={{ __html: marked(courseData.article) }}
      />

      <div className="mt-3">
        <button
          id="translateArticleBtn"
          className="btn btn-secondary"
          onClick={translateArticle}
        >
          Translate Article
        </button>
        <select id="languageSelect" className="form-select mt-2" style={{ width: 'auto' }}>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
        </select>
      </div>

      {translatedContent && (
        <div
          id="translatedArticleContent"
          className="mt-3"
          dangerouslySetInnerHTML={{ __html: marked(translatedContent) }}
        />
      )}
    </div>
  );
};

export default ArticleSection;
