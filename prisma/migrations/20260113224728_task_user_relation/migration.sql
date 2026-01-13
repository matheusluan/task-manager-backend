/*
  Warnings:

  - You are about to drop the `UserTask` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserTask" DROP CONSTRAINT "UserTask_taskId_fkey";

-- DropForeignKey
ALTER TABLE "UserTask" DROP CONSTRAINT "UserTask_userId_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "UserTask";

-- DropEnum
DROP TYPE "TaskRole";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
