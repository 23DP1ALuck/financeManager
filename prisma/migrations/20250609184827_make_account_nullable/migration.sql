-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_account_id_fkey`;

-- AlterTable
ALTER TABLE `transactions` MODIFY `account_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`account_id`) ON DELETE SET NULL ON UPDATE CASCADE;
