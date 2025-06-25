enum Estado {
    disponible = "disponible",
    agotado = "agotado"
}

enum Categoria {
    carnes = "carnes",
    lacteos = "lacteos",
    masas = "masas",
    dulces = "dulces",
    bebidas = "bebidas",
    otros = "otros"
}

export interface ProductsType {
    product_id : string,
    nombre : string,
    precio : number,
    imagen : string ,
    descripcion : string,
    fechaCreacion : Date,
    stock : number,
    estado : Estado,
    categoria : Categoria

}