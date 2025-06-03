/*
  Warnings:

  - You are about to alter the column `name` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `categories` MODIFY `name` ENUM('Food', 'Entertainment', 'Subscribtions', 'Transport', 'Education', 'Other') NOT NULL;
