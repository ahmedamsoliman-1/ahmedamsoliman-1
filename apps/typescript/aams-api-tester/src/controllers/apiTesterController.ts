import { Request, Response } from 'express';
import { ApiTesterService } from '../services/apiTesterService';

const service = new ApiTesterService();

export const testEndpoint = async (req: Request, res: Response) => {
  try {
    const result = await service.testEndpoint(req.body);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const getResults = async (req: Request, res: Response) => {
  try {
    const results = await service.getResults();
    res.render('viewResults', { results });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const renderAddEndpoint = (req: Request, res: Response) => {
  res.render('addEndpoint');
};
