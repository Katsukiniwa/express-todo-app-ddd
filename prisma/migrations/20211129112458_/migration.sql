/*
  Warnings:

  - Added the required column `cover_image` to the `lanes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lanes` ADD COLUMN `cover_image` VARCHAR(191) NOT NULL;
