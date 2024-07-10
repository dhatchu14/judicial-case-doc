import React from 'react';
import './Results.css';

const Results = ({ files, results, onBack }) => {
  return (
    <div className="results-container">
      <h1 className="results-title">RESULTS</h1>
      <div className="results-box">
        <div className="results-column">
          <h2>File Name</h2>
          {files.map((file, index) => (
            <p key={index} className="file-name">{file.name}</p>
          ))}
        </div>
        <div className="results-column">
          <h2>Result</h2>
          {results.map((result, index) => (
            <p key={index} className="result">{result}</p>
          ))}
        </div>
      </div>
      <button className="back-button" onClick={onBack}>Back to Form</button>
    </div>
  );
};

export default Results;
