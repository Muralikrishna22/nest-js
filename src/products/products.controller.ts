import { Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
      constructor(private readonly ProductsService:ProductsService){}

      @Post()
      addProduct(@Body("title") prodTitle:string,@Body("description") prodDesc:string,@Body("price") prodPrice:number):any{ 
        const generatedTitle = this.ProductsService.insertProduct(prodTitle,prodDesc, prodPrice)
        return {
            result:"successfull",
            data:`uploaded with ${generatedTitle}`
        }
      }

      @Get()
      getAllProducts(){
        return this.ProductsService.getProducts()
      } 

      @Get(":name")
      getproduct(@Param("name") prodName:string){
        return this.ProductsService.getSingleProduct(prodName)
      }

      @Put(":name")
      updateProduct(@Param("name") prodName:string, @Body("description") prodDesc:string, @Body("price") prodPrice:number){
        return this.ProductsService.updateProduct(prodName, prodDesc , prodPrice)
      }

      @Delete(":name")
      deleteProduct(@Param("name") prodName:string){
        return this.ProductsService.deleteProduct(prodName)
      }
} 