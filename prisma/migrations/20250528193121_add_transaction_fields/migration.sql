/*
  Warnings:

  - Added the required column `transaction_description` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_name` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `transaction_description` VARCHAR(191) NOT NULL,
    ADD COLUMN `transaction_name` VARCHAR(191) NOT NULL;
