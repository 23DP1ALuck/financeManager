/*
  Warnings:

  - You are about to alter the column `name` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `accounts` MODIFY `name` ENUM('Swedbank', 'Seb', 'Citadele', 'Revolut', 'Wise', 'Cash', 'Other') NOT NULL;
