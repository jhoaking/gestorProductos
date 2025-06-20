-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('credentials', 'github', 'linkedin');

-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('activo', 'inactivo', 'agotado');

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "provider" "Provider" NOT NULL,
    "avatar_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rol_id" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Role" (
    "rol_id" SERIAL NOT NULL,
    "rol" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("rol_id")
);

-- CreateTable
CREATE TABLE "Session" (
    "sid" TEXT NOT NULL,
    "sess" JSONB NOT NULL,
    "expire" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "Product" (
    "producto_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "imagen" TEXT,
    "descripcion" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stock" INTEGER NOT NULL,
    "estado_id" "Estado" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "categoria_id" INTEGER NOT NULL,
    "vendedor_id" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("producto_id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "categoria_id" SERIAL NOT NULL,
    "categoria" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("categoria_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "Role"("rol_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categoria"("categoria_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_vendedor_id_fkey" FOREIGN KEY ("vendedor_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
