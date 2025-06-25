import { gql } from "apollo-server-express";

export const typeDefs = gql`
 enum Rol {
    admin
    encargado
  }

  enum Estado {
    disponible
    agotado
  }
  enum Categoria {
    carnes ,
    lacteos ,
    masas,
    dulces,
    bebidas ,
    otros
    }


    type User {
        user_id : ID!
        username : String!
        email : String!
        password : String!
        rol : Rol
    }

    type Product {
        producto_id : ID!
        nombre :  String!
        precio : Float !
        imagen : String!
        descricion : String
        fechaCreacion : String 
        stock : Int 
        estado : Estado
        categoria : Categoria
    }

    input Register {
        username : String!
        email : String!
        password : String!
        rol : Rol
    }

    input Login {
     email: String!
    password: String!
    }

      
    type AuthPayload {
    token: String!
     user: User!
    }

    input CreateProduct {
        nombre : String!
        precio : Float ! 
        imagen : String
        descricion : String
        fechaCreacion : String 
        stock : Int  
        estado : Estado!
        categoria : Categoria!
    }

    type Query {
        getAllProducts : [Product]
        getProductById(producto_id : ID!) :Product
        getAllProductByCategories(categoria : Categoria):Product
        protectedUser : String


    }

    type Mutation {
      register(input:Register!):User
      login(input:Login!):AuthPayload
      logout : String

      createProduct(input : CreateProduct!):Product
      updateProduct(producto_id : ID! , input :CreateProduct ):Product
      deleteProduct(producto_id : ID! ):String
    }


`;
