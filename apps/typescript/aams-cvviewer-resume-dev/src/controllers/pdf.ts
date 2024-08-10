import { Request, Response } from 'express';
import path from 'path';

export const displayPdf = (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../public/cv.pdf'));
};
