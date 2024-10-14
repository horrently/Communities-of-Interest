-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Окт 13 2024 г., 17:15
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `communities_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `communities`
--

CREATE TABLE `communities` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `owner_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `communities`
--

INSERT INTO `communities` (`id`, `title`, `description`, `owner_id`) VALUES
(1, 'Спортивное сообщество', 'Все о спорте', 1),
(2, 'Кулинарный блог', 'Все о готовке', 1),
(3, 'Игры', 'Все о компьютерных играх', 1),
(4, 'Все и сразу', 'Сообщество обо всем и ни о чем', 1),
(11, 'Сериалы и кино', 'Если вам интересна тематика кино и сериалов, то это для вас!', 1),
(12, 'Различные игры и их новости', 'Новостное сообщество', 8),
(17, 'Книжное общество', 'Обсуждение книг', 11),
(18, 'Сообщество', 'Сообщество', 12);

-- --------------------------------------------------------

--
-- Структура таблицы `community_interests`
--

CREATE TABLE `community_interests` (
  `id` int(11) NOT NULL,
  `community_id` int(11) DEFAULT NULL,
  `interest_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `community_interests`
--

INSERT INTO `community_interests` (`id`, `community_id`, `interest_id`) VALUES
(1, 1, 1),
(6, 11, 14),
(7, 11, 17),
(8, 12, 3),
(9, 12, 17),
(61, 3, 3),
(62, 3, 17),
(63, 4, 23),
(64, 4, 16),
(69, 17, 9),
(70, 17, 21),
(71, 17, 11),
(72, 18, 23),
(73, 18, 22),
(74, 18, 21),
(75, 18, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `community_members`
--

CREATE TABLE `community_members` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `community_id` int(11) DEFAULT NULL,
  `role` enum('member','owner') DEFAULT 'member'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `community_members`
--

INSERT INTO `community_members` (`id`, `user_id`, `community_id`, `role`) VALUES
(1, 1, 1, 'owner');

-- --------------------------------------------------------

--
-- Структура таблицы `interests`
--

CREATE TABLE `interests` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `interests`
--

INSERT INTO `interests` (`id`, `name`) VALUES
(1, 'Спорт'),
(2, 'Готовка'),
(3, 'Игры'),
(8, 'Танцы'),
(9, 'Чтение'),
(10, 'Общение'),
(11, 'Коллекционирование'),
(12, 'Азартные игры'),
(13, 'Музыка'),
(14, 'Кино'),
(15, 'Автомобили'),
(16, 'Фотосъемки'),
(17, 'Интернет'),
(18, 'Живопись'),
(19, 'Астрология'),
(20, 'Психология'),
(21, 'Наука'),
(22, 'Дизайн'),
(23, 'Бизнес'),
(25, 'Сериалы');

-- --------------------------------------------------------

--
-- Структура таблицы `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `community_id` int(11) DEFAULT NULL,
  `approved` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `posts`
--

INSERT INTO `posts` (`id`, `content`, `community_id`, `approved`) VALUES
(1, 'приготовил торт', 2, 1),
(77, 'Выиграл бой\n', 1, 0),
(79, 'Расписание боев:\nПонедельник\nВторник', 1, 0),
(82, 'Всем советую сериал \"Тьма\"!', 11, 0),
(83, 'Как ваши дела?', 1, 0),
(85, 'Тони Надаль высказался о завершении карьеры племянника.\n«Я не знал, что он сделает это сегодня [10 октября]. Узнал только с утра: Рафаэль отправил нам сообщение в семейном чате WhatsApp и сказал, что сегодня объявит о своем уходе.\n\nЯ знал, что он закончит карьеру в Малаге, на Кубке Дэвиса. Он рассказал мне месяц назад и попросил ничего никому не говорить.\n\nРафа хотел играть. Он уходит с сожалением из-за того, что не смог провести полноценный последний сезон на грунте. Думаю, он очень хотел хорошо сыграть в последний раз. Старался подготовиться к «Ролан Гаррос», но возникали проблемы. К тому же ему не повезло с сеткой: в первом круге он попал на одного из лучших в туре [Александра Зверева], который впоследствии дошел до финала.', 1, 0),
(86, 'Вышла новая игра!', 12, 0),
(89, 'Hello', 3, 0),
(90, 'Первый пост!\n', 17, 0),
(91, 'Первый пост!', 18, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `suggested_interests`
--

CREATE TABLE `suggested_interests` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `approved` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `suggested_interests`
--

INSERT INTO `suggested_interests` (`id`, `name`, `user_id`, `approved`) VALUES
(26, 'Новый интерес', 1, 0),
(27, 'Аэробика', 12, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`) VALUES
(1, 'admin', 'admin@mail.ru', '$2a$10$/UGez0rEHkFS/qLa9mlYoeaxeBgTJcHFE0QGcAhhON8rLedI3MzXS', 'admin'),
(8, 'wew', 'we@we', '$2a$10$1Hy6m1Y6//1dMVicGnB8YOh4o80uScxq1HzKJ7dPas/9yELbTXNGa', 'user'),
(10, 'user', 'user@mail.ru', '$2a$10$ERulbF2nM0LSLjWU6UlqFuWQvbIDCtlfwLH2yCyeHLmLa/lror5A.', 'user'),
(11, 'we', 'we@mail.ru', '$2a$10$wrIhgcfJEz75bwQ7Z/YItuDiji6RRPrNFuMwBXeW3/GyqHIrK5SKO', 'user'),
(12, 'qwe', 'qwe@qwe', '$2a$10$sRsZiN0qv48McU9IWJB5/OSdHMyAR//tKRNF/yNXtYk1Wz0kZqIUS', 'user');

-- --------------------------------------------------------

--
-- Структура таблицы `user_interests`
--

CREATE TABLE `user_interests` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `interest_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `user_interests`
--

INSERT INTO `user_interests` (`id`, `user_id`, `interest_id`) VALUES
(45, 8, 1),
(46, 8, 14),
(47, 8, 3),
(48, 8, 21),
(53, 11, 1),
(54, 11, 13),
(55, 11, 21),
(56, 11, 23),
(57, 11, 16),
(58, 11, 20),
(59, 11, 12),
(60, 11, 9),
(63, 12, 23),
(64, 12, 22),
(65, 12, 1),
(66, 12, 21);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `communities`
--
ALTER TABLE `communities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Индексы таблицы `community_interests`
--
ALTER TABLE `community_interests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `community_id` (`community_id`),
  ADD KEY `interest_id` (`interest_id`);

--
-- Индексы таблицы `community_members`
--
ALTER TABLE `community_members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `community_id` (`community_id`);

--
-- Индексы таблицы `interests`
--
ALTER TABLE `interests`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `community_id` (`community_id`);

--
-- Индексы таблицы `suggested_interests`
--
ALTER TABLE `suggested_interests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Индексы таблицы `user_interests`
--
ALTER TABLE `user_interests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `interest_id` (`interest_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `communities`
--
ALTER TABLE `communities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT для таблицы `community_interests`
--
ALTER TABLE `community_interests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT для таблицы `community_members`
--
ALTER TABLE `community_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `interests`
--
ALTER TABLE `interests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT для таблицы `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT для таблицы `suggested_interests`
--
ALTER TABLE `suggested_interests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `user_interests`
--
ALTER TABLE `user_interests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `communities`
--
ALTER TABLE `communities`
  ADD CONSTRAINT `communities_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `community_interests`
--
ALTER TABLE `community_interests`
  ADD CONSTRAINT `community_interests_ibfk_1` FOREIGN KEY (`community_id`) REFERENCES `communities` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `community_interests_ibfk_2` FOREIGN KEY (`interest_id`) REFERENCES `interests` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `community_members`
--
ALTER TABLE `community_members`
  ADD CONSTRAINT `community_members_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `community_members_ibfk_2` FOREIGN KEY (`community_id`) REFERENCES `communities` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`community_id`) REFERENCES `communities` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `suggested_interests`
--
ALTER TABLE `suggested_interests`
  ADD CONSTRAINT `suggested_interests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `user_interests`
--
ALTER TABLE `user_interests`
  ADD CONSTRAINT `user_interests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_interests_ibfk_2` FOREIGN KEY (`interest_id`) REFERENCES `interests` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
