import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.module";

@Injectable()
export class ProductsService {
    products: Product[] = [];

    insertProduct(title:string, desc:string, price:number){
        const newProduct = new Product(new Date().toString(), title, desc, price);
        this.products.push(newProduct)
        return title
    }

    getProducts(){
        return [...this.products]
    }

    getSingleProduct(prodName:string){
        let product = this.products?.find((obj) => obj.title === prodName)
        if(product){
            return product
        }else{
            throw new NotFoundException('not exists in the product list')
        }
    }

    updateProduct(prodName:string, desc:string, price:number){
        let productToGetUpdate = this.products?.find((obj) => obj.title === prodName)
        let productIndex = this.products.findIndex((obj) => obj.title === prodName)
        let updatedProd = {...productToGetUpdate}
        if(desc){
            updatedProd['description'] = desc
        }
        if(price){
            updatedProd['price'] = price
        }
        this.products[productIndex] = updatedProd
    }

    deleteProduct(prodName:string){
        let filterData = this.products?.filter((obj) => obj.title !== prodName)
        return filterData
    }
}