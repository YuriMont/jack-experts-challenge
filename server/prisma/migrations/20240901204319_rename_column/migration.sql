/*
  Warnings:

  - You are about to drop the column `favorite` on the `tb_tasks` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tb_tasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "color_id" INTEGER,
    "author_id" TEXT NOT NULL,
    "completed" BOOLEAN DEFAULT false,
    CONSTRAINT "tb_tasks_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "tb_users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tb_tasks_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "tb_colors" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_tb_tasks" ("author_id", "color_id", "content", "id", "title") SELECT "author_id", "color_id", "content", "id", "title" FROM "tb_tasks";
DROP TABLE "tb_tasks";
ALTER TABLE "new_tb_tasks" RENAME TO "tb_tasks";
CREATE UNIQUE INDEX "tb_tasks_title_key" ON "tb_tasks"("title");
CREATE INDEX "index_color_id" ON "tb_tasks"("color_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
