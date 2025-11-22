CREATE TABLE `supportRequests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`serviceType` enum('formatacao','limpeza','atualizacao','suporte_remoto') NOT NULL,
	`description` text NOT NULL,
	`status` enum('pendente','em_andamento','concluido') NOT NULL DEFAULT 'pendente',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `supportRequests_id` PRIMARY KEY(`id`)
);
