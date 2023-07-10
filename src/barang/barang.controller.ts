import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors, UploadedFiles, Req, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FilesInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';
import { BarangService } from './barang.service';
import { SearchAndPagination } from './dto';
import { BarangDto } from './dto/create-barang.dto';
import * as fs from 'fs';
import path from "path";
import { diskStorage } from 'multer';
import { multerOptions } from './compareCategory';

@Controller('barang')
export class BarangController {
  constructor(private readonly barangService: BarangService) { }

  @Post()
  @UseInterceptors(AnyFilesInterceptor(multerOptions))
  async create(@UploadedFiles() files: Express.Multer.File, @Body() data: any, @Req() req: any) {

    const updatedData = { ...data }; // Copy data asli ke variabel baru



    if (data.variants) {
      const variants = [];
      for (let i = 0; i < data.variants.length; i++) {
        variants.push({
          name: data.variants[i].name,
          image: `${req.protocol}://${req.get("host")}/${files[i].filename}`
        })

      }

      //   // Perbarui data dengan array URL file gambar
      updatedData.variants = variants;
      // }

      console.log(updatedData);


      // console.log(updatedData); // Data yang telah diperbarui dengan URL file gambar

      // Lanjutkan dengan menyimpan data ke database
      // ...

      return updatedData;
    }
  }


  @Post('/bulk')
  async addBarangFromExcel() {
    const path = './file/sementara.xlsx'
    const workbook = XLSX.readFile(path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    fs.unlinkSync(path);
    fs.rmdirSync('./file');
    return this.barangService.parseExcelToJson(jsonData)
  }

  @Get()
  findAll(@Body() selection: SearchAndPagination) {
    return this.barangService.findAll(selection);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barangService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() barang: BarangDto) {
    return this.barangService.update(+id, barang);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.barangService.remove(+id);
  }

}
