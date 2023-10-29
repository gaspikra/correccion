const fs = require('fs')
class ProductManager{
    constructor(){
        this.products=[];
        this.path=".\back end\arhivo.txt"
    }
    AddProduct(id,title,description,price,thumbnail,code,stock){
        id=1;
        if (this.products.length>0){
            id=this.products[this.products.length-1].id+1
        }
        let producto={
            id,title,description,price,thumbnail,code,stock
        }
        this.products.push(producto)
        fs.writeFileSync(this.path,JSON.stringify(this.products,null,"\t"))
    }
    GetProducts(){
        let lectura=JSON.parse(fs.readFileSync(this.path,"utf-8"))
        return lectura
    }
    getProductById(id){
        let productos=this.GetProducts()
        let indice=productos.findIndex((producto)=>{
        return producto.id===id
        })
        if(indice===-1){
            console.log("no hay ningun producto con ese ID")
            return
        }
        return productos[indice];
    }
    updateProduct(id,title2,description2,price2,thumbnail2,code2,stock2){
        let busqueda=this.getProductById(id)
        let producto={
            id,title:title2,description:description2,price:price2,thumbnail:thumbnail2,code:code2,stock:stock2
        }
        this.products[busqueda]=producto
        if (busqueda!==-1){
            fs.writeFileSync(this.path,JSON.stringify(this.products,null,"\t"))
        }
        
    }
    DeleteProduct(id){
            let productos = this.GetProducts();
            let nuevoarray = productos.filter((producto) => producto.id !== id);
            if (productos.length === nuevoarray.length) {
                console.log("No se encontró ningún producto con ese ID.");
                return;
            }
            fs.writeFileSync(this.path, JSON.stringify(nuevoarray, null, "\t"));
        }
    }
const elemento=new ProductManager()
elemento.AddProduct(1,"hola","chau",10,"www.img.com",12345,100)