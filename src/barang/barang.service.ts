import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { compareDataById } from './compareCategory';
import { SearchAndPagination } from './dto';
import { BarangDto } from './dto/create-barang.dto';

@Injectable()
export class BarangService {
  constructor(private prisma: PrismaService) { }

  async bulkAddBarang(filePath: Array<string>) {
    return filePath
  }

  async add(barang: BarangDto) {
    const categoryExist = await this.prisma.category.findFirst({
      where: {
        name: barang.category,
      },
    });

    if (!categoryExist) {
      await this.prisma.category.create({
        data: {
          name: barang.category,
        },
      });
    }

    return await this.prisma.barang.create({
      data: barang,
    });

  }

  async findOne(id: number) {
    return await this.prisma.barang.findUnique({
      where: {
        id: id,
      },
    });

  }

  async update(id: number, barang: BarangDto) {
    const categoryExist = await this.prisma.category.findFirst({
      where: {
        name: barang.category,
      },
    });

    if (categoryExist) {
      await this.prisma.category.update({
        where: {
          id: categoryExist.id,
        },
        data: {
          name: barang.category,
        },
      });

    } else {
      await this.prisma.category.create({
        data: {
          name: barang.category,
        },
      });
    }
    return await this.prisma.barang.update({
      where: {
        id: id,
      },
      data: barang,
    });
  }

  async remove(id: number) {
    const barangExist = await this.prisma.barang.findMany()


    const barang = await this.prisma.barang.delete({
      where: {
        id: id,
      },
    });

    const currentCategory = barangExist.filter(e => e.category === barang.category)
    if (currentCategory.length <= 1) {
      await this.prisma.category.deleteMany({
        where: {
          name: barang.category
        }
      })
    }
    return barang
  }

  async search(selection: SearchAndPagination) {
    const intialFilters = {
      name: selection.name ?? '',
      price: selection.price,
      id_category: selection.category ?? [],
      size: selection.size ?? 5,
      page: selection.page ?? 1
    }

    const skip = (intialFilters.page - 1) * intialFilters.size
    const filters = []
    if (intialFilters.name) {
      filters.push({
        name: {
          contains: intialFilters.name
        }
      })
    }
    if (intialFilters.price) {
      filters.push({ price: intialFilters.price })
    }
    if (intialFilters.id_category.length !== 0) {
      filters.push({
        id_category: {
          in: intialFilters.id_category
        }
      })
    }
    const searchCriteria = {
      where: {
        AND: filters,
      },
      take: intialFilters.size,
      skip: skip
    };

    const resultFilters = await this.prisma.barang.findMany(searchCriteria)
    const totalItem = await this.prisma.barang.count(searchCriteria)
    return {
      data: resultFilters,
      pagging: {
        page: intialFilters.page,
        total_item: totalItem,
        total_page: Math.floor(totalItem / intialFilters.size)
      }
    }
  }

  async findAll(selection: SearchAndPagination) {
    const search = await this.search(selection)
    return search
  }

  async parseExcelToJson(jsonData: any) {
    const category = await this.prisma.category.findMany()
    const itemNameCategory = category.map(e => e.name)
    const categoryNoExist = jsonData.filter((item: BarangDto) => !itemNameCategory.includes(item.category));
    const compare = compareDataById(categoryNoExist)
    compare.forEach(async (item) => {
      await this.prisma.category.create({
        data: {
          name: item.category
        }
      })
    })
    await this.prisma.barang.createMany({
      data: jsonData
    })
    return jsonData
  }
}
