import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as multer from 'multer';

export interface CustomRequest extends Request {
    jsonData?: any;
}

@Injectable()
export class ExcelParserMiddleware implements NestMiddleware {
    use(req: CustomRequest, res: Response, next: () => void) {
        const upload = multer().single('file');
        const temporaryDirectory = './file';
        const temporaryFilePath = `${temporaryDirectory}/sementara.xlsx`;
        upload(req, res, () => {
            if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
            fs.mkdirSync(temporaryDirectory, { recursive: true });
            fs.writeFileSync(temporaryFilePath, req.file.buffer);
            next();
        })
    }
}
