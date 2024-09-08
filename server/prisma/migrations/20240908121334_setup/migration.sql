-- CreateTable
CREATE TABLE `tb_tasks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `color_id` INTEGER NULL,
    `author_id` VARCHAR(191) NOT NULL,
    `completed` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `tb_tasks_title_key`(`title`),
    INDEX `index_color_id`(`color_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tb_users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_colors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tb_colors_name_key`(`name`),
    UNIQUE INDEX `tb_colors_code_key`(`code`),
    INDEX `index_color_name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_tasks` ADD CONSTRAINT `tb_tasks_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `tb_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_tasks` ADD CONSTRAINT `tb_tasks_color_id_fkey` FOREIGN KEY (`color_id`) REFERENCES `tb_colors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
