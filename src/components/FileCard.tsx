// src/components/FileCard.tsx

import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';

interface FileCardProps {
  name: string;
  downloadUrl: string;
  description?: string;
}

const FileCard: React.FC<FileCardProps> = ({ name, downloadUrl, description }) => {
  const handleDownload = () => {
    window.open(downloadUrl);
  };

  return (
    <Card sx={{ maxWidth: 300, margin: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        {description && <Typography variant="body2">{description}</Typography>}
      </CardContent>
      <CardActions>
        <Button onClick={handleDownload} size="small">Download</Button>
      </CardActions>
    </Card>
  );
};

export default FileCard;
