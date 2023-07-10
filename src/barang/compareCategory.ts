import { diskStorage } from 'multer';
import { extname } from 'path';
import * as XLSX from 'xlsx';
import { v4 as uuid } from 'uuid';
import { existsSync, mkdirSync } from 'fs';

type PropsBarang = {
    name: string,
    category: string,
    price: number
}[]

export function compareDataById(barang: PropsBarang) {
    const uniqueBarangByCategory = barang.reduce((result, item) => {
        const existingItem = result.find(i => i.category === item.category);
        if (!existingItem) {
            result.push(item)
        }
        return result;
    }, []);

    return uniqueBarangByCategory

}

export async function readExcelFile(filePath: string): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
        try {
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            resolve(jsonData);
        } catch (error) {
            reject(error);
        }
    });
}

export function uuiRandom(file: any) {
    const result = `${uuid()}${extname(file.originalname)}`
    return result
}

export const multerOptions = {
    fileFilter: (req: any, file: any, callback: any) => {
        if (file.mimetype.match(/\.(jpg|png|webp)$/)) {
            return callback(new Error('tidak standart'), false)
        }
        callback(null, true)
    },
    storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
            const uploadPath = 'images'
            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath)
            }
            cb(null, uploadPath)
        },
        filename: (req: any, file: any, cb: any) => {
            cb(null, uuiRandom(file))
        }
    })
}


