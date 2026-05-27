import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { API_ROOT } from '../config';
import axios from 'axios';

const Result = () => {
  const { query } = useParams();
  const [rawContent, setRawContent] = useState('');
  const [parsedContent, setParsedContent] = useState({ EN: '', RU: '', UZ: '' });
  const [language, setLanguage] = useState('EN');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      setLoading(true);
      setError(null);
      try {
        const searchRes = await axios.post('http://localhost:8000/api/search', { query });
        
        if (searchRes.data.status === 'success') {
          const fileName = searchRes.data.file;
          const resultRes = await axios.get(`http://localhost:8000/api/results/${fileName}`);
          const content = resultRes.data.content;
          setRawContent(content);
          
          // Parse content into 3 languages
          const splitEN = content.split('# [LANG: EN]');
          const splitRU = content.split('# [LANG: RU]');
          const splitUZ = content.split('# [LANG: UZ]');
          
          const getSection = (marker, nextMarker1, nextMarker2) => {
            if (!content.includes(marker)) return '';
            let section = content.split(marker)[1];
            if (nextMarker1 && section.includes(nextMarker1)) section = section.split(nextMarker1)[0];
            if (nextMarker2 && section.includes(nextMarker2)) section = section.split(nextMarker2)[0];
            return section.trim();
          };

          setParsedContent({
            EN: getSection('# [LANG: EN]', '# [LANG: RU]', '# [LANG: UZ]'),
            RU: getSection('# [LANG: RU]', '# [LANG: EN]', '# [LANG: UZ]'),
            UZ: getSection('# [LANG: UZ]', '# [LANG: EN]', '# [LANG: RU]'),
          });
        } else {
          setError("Failed to generate content.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching information.");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [query]);

  // Use raw content if parsing fails or tags are missing
  const displayContent = parsedContent[language] || rawContent;

  return (
    <div className="results-page">
      <div className="results-header">
        <Link to="/" className="back-link">
          &larr; Back
        </Link>
        <div className="language-switcher">
          <button className={language === 'EN' ? 'active' : ''} onClick={() => setLanguage('EN')}>EN</button>
          <button className={language === 'RU' ? 'active' : ''} onClick={() => setLanguage('RU')}>RU</button>
          <button className={language === 'UZ' ? 'active' : ''} onClick={() => setLanguage('UZ')}>UZ</button>
        </div>
      </div>
      
      <div className="content-container">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>AI is researching "{query}"...</p>
          </div>
            ) : error ? (
              <div className="error-container">
                <h2>Error</h2>
                <ReactMarkdown
                  components={{
                    code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    }
                  }}
                >
                  {error}
                </ReactMarkdown>
                <button className="retry-button" onClick={() => window.location.reload()}>Please try again</button>
              </div>
            ) : (
          <div className="markdown-body">
            <ReactMarkdown
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {displayContent}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
