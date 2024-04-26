// src/App.tsx

import React from 'react';
import FileCard from './components/FileCard';
import { Grid } from '@mui/material';

const files = [
  { name: 'Document 1', downloadUrl: 'Ahmed_Ali_M_Soliman_SW_Engineer_en.pdf', description: 'lorem' },
  { name: 'Document 1', downloadUrl: 'Ahmed_Ali_M_Soliman_SW_Engineer_en.pdf', description: 'lorem' },
  { name: 'Document 1', downloadUrl: 'Ahmed_Ali_M_Soliman_SW_Engineer_en.pdf', description: 'lorem' },
  { name: 'Document 1', downloadUrl: 'Ahmed_Ali_M_Soliman_SW_Engineer_en.pdf', description: 'lorem' },
  { name: 'Document 1', downloadUrl: 'Ahmed_Ali_M_Soliman_SW_Engineer_en.pdf', description: 'lorem' },
  { name: 'Image 1', downloadUrl: 'Ahmed_Ali_M_Soliman_SW_Engineer_en.pdf' },
];


const App: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {files.map((file, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          <FileCard name={file.name} downloadUrl={file.downloadUrl} description={file.description} />
        </Grid>
      ))}
    </Grid>
  );
};

export default App;
