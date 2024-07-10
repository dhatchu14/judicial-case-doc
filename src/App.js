import React, { useState } from 'react';
import FileUpload from './FileUpload';
import Results from './Results';

function App() {
  const [isClassified, setIsClassified] = useState(false);
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);

  const handleClassify = (uploadedFiles) => {
    // Mock classification results
    const classificationResults = uploadedFiles.map(file => `Result for ${file.name}`);
    setFiles(uploadedFiles);
    setResults(classificationResults);
    setIsClassified(true);
  };

  const handleBack = () => {
    setIsClassified(false);
  };

  return (
    <>
      {isClassified ? (
        <Results files={files} results={results} onBack={handleBack} />
      ) : (
        <FileUpload onClassify={handleClassify} />
      )}
    </>
  );
}

export default App;
