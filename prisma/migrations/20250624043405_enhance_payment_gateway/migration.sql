/*
  Warnings:

  - A unique constraint covering the columns `[transactionId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `method` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payment` ADD COLUMN `bank` VARCHAR(191) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `expiresAt` DATETIME(3) NULL,
    ADD COLUMN `gatewayResponse` LONGTEXT NULL,
    ADD COLUMN `method` VARCHAR(191) NOT NULL DEFAULT 'manual',
    ADD COLUMN `transactionId` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `verificationCode` VARCHAR(191) NULL;

-- Update existing records to have proper values
UPDATE `payment` SET `method` = 'manual', `updatedAt` = CURRENT_TIMESTAMP(3) WHERE `method` = 'manual';

-- CreateIndex
CREATE UNIQUE INDEX `Payment_transactionId_key` ON `Payment`(`transactionId`);
