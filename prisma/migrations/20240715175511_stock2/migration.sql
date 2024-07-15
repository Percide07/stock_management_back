/*
  Warnings:

  - Added the required column `requestedMedicine` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requesterHospital` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urgencyLevel` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `requestedMedicine` VARCHAR(191) NOT NULL,
    ADD COLUMN `requesterHospital` VARCHAR(191) NOT NULL,
    ADD COLUMN `urgencyLevel` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `AuditLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
