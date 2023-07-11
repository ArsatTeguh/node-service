import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as XLSX from 'xlsx';
import { BarangService } from './barang.service';
import { multerOptions } from './compareCategory';
import { SearchAndPagination } from './dto';
import { BarangDto } from './dto/create-barang.dto';

@Controller('barang')
export class BarangController {
  constructor(private readonly barangService: BarangService) { }

  @Post()
  @UseInterceptors(AnyFilesInterceptor(multerOptions))
  create(
    @UploadedFiles() files: Express.Multer.File,
    @Body() data: any,
    @Req() req: any,
  ) {
    const updatedData = { ...data }; // Copy data asli ke variabel baru
    if (data.variants) {
      const variants = [];
      for (let i = 0; i < data.variants.length; i++) {
        variants.push({
          name: data.variants[i].name,
          image: `${req.protocol}://${req.get('host')}/${files[i].filename}`,
        });
      }
      updatedData.variants = variants; //   // Perbarui data dengan array URL file gambar
      return updatedData;
    }
  }

  @Post('/bulk/add')
  addBarangFromExcel() {
    const path = './file/sementara.xlsx';
    const workbook = XLSX.readFile(path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    fs.unlinkSync(path);
    fs.rmdirSync('./file');
    return this.barangService.parseExcelToJson(jsonData);
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

  @Post('bulk/delete')
  deleteBulk(@Body() barangId: { bulkId: Array<number> }) {
    return this.barangService.deleteBulk(barangId.bulkId);
  }
}
