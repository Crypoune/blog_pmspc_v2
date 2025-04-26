-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : mer. 26 fév. 2025 à 19:03
-- Version du serveur : 8.0.35
-- Version de PHP : 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `pimp_my_spc`
--

DELIMITER $$
--
-- Procédures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `AllProduits` ()   BEGIN
	SELECT * FROM produits ORDER BY id DESC;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `article`
--

CREATE TABLE `article` (
  `id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `publishDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_user` int NOT NULL,
  `id_category` int DEFAULT NULL,
  `image` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `alt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `article`
--

INSERT INTO `article` (`id`, `title`, `content`, `publishDate`, `id_user`, `id_category`, `image`, `alt`) VALUES
(1, 'Ford Mustang Dark Horse - LEGO set', '--Lego set: Ford Mustang Dark Horse (76920)--\r\n\r\nLa Ford Mustang Dark Horse est le tout dernier modèle haute performance de la 7e génération de Mustang, disponible sur le marché depuis 2024. Ce modèle emblématique, à la fois puissant et élégant, ne laisse personne indifférent – que ce soit sur la route ou en version Lego.\r\n\r\nAvec ses 351 pièces (et 17 pièces de rechange), ce set proposé au prix de 26,99 € offre un excellent rapport qualité-prix, avec un coût par pièce d’environ 7,3 centimes. Accessible à tous grâce à sa disponibilité non exclusive, il bénéficie déjà de réductions intéressantes chez certains revendeurs.\r\n\r\n--Un design réaliste et des possibilités infinies--\r\n\r\nCe set Lego Speed Champions reproduit avec fidélité les lignes dynamiques et agressives de la Mustang Dark Horse. Parmi les modèles 2024, c’est l’un des rares que l’on pourrait réellement croiser sur la route, alors que les autres semblent davantage pensés pour les circuits de course.\r\n\r\nAvec ses nombreuses pièces en bleu foncé (Dark Blue) et ses éléments transparents en Trans-Black, cette voiture est non seulement un plaisir à construire, mais aussi une base idéale pour les passionnés de customisation.\r\n\r\n--Des modifications uniques pour un réalisme accru--\r\n\r\nEn tant que passionné(e) de voitures et de Lego, j’aime ajouter ma touche personnelle à chaque modèle. Pour cette Mustang Dark Horse, j’ai opté pour des enjoliveurs custom 3D conçus par GT Créa Cars. Ces accessoires apportent un réalisme supplémentaire et transforment une superbe voiture en une véritable pièce unique, parfaite pour toute collection.\r\n\r\n--Et vous ?--\r\n\r\nQu’en pensez-vous ? Avez-vous déjà construit ce modèle ou personnalisé ce set ? Partagez vos créations et idées dans les commentaires !', '2024-10-21 11:48:20', 2, 5, 'ford_mustang_dark_horse_preview', 'Ford Mustang Dark Horse'),
(2, 'Ferrari F8 Tributo - LEGO set', '--Lego set : Ferrari F8 Tributo (76895)--\r\n\r\nLa Ferrari F8 Tributo est une véritable icône de vitesse et de design, et ce modèle Lego Speed Champions capture toute l\'élégance et la puissance de cette supercar exceptionnelle. Bien que ce set soit sorti il y a quelque temps, il est aujourd’hui devenu rare, ce qui en fait une pièce précieuse pour les collectionneurs et les passionnés de Lego.\r\n\r\nAvec ses 275 pièces, ce modèle propose une expérience de construction accessible et satisfaisante, mettant en valeur les courbes aérodynamiques caractéristiques de la Ferrari F8. Initialement proposé à 19,99 €, ce set est désormais un véritable trésor à dénicher.\r\n\r\n--Un design fidèle à l\'original--\r\n\r\nLe set Lego Ferrari F8 Tributo recrée avec brio les lignes fluides et l’agressivité typique de la voiture originale. Les amateurs de Ferrari reconnaîtront immédiatement les détails iconiques, comme les phares effilés et les prises d’air caractéristiques.\r\n\r\nAvec ses pièces rouges éclatantes et ses éléments noirs contrastants, ce modèle est une réplique fidèle qui brille autant sur l’étagère que dans une mise en scène Lego Speed Champions.\r\n\r\n--Des modifications uniques pour un réalisme accru--\r\n\r\nComme pour mes autres modèles, j’ai choisi d’ajouter une touche personnelle à cette Ferrari F8 Tributo. Grâce aux enjoliveurs custom 3D de GT Créa Cars, les roues de ce modèle gagnent en réalisme et en élégance, renforçant encore son charme unique. Ces modifications permettent de sublimer ce set rare et d’en faire une véritable pièce de collection, tout en respectant l’esprit de la Ferrari.\r\n\r\n--Et vous ?--\r\n\r\nAvez-vous eu la chance de construire ce modèle ou de mettre la main sur cet exemplaire devenu rare ? Peut-être avez-vous aussi apporté vos propres modifications ? Partagez vos créations et idées dans les commentaires – je serais ravi(e) de les découvrir !', '2024-10-21 11:52:22', 2, 7, 'ferrari_f8_tributo_preview', 'Ferrari F8 Tributo'),
(3, 'Porsche RWB 911 (993) - MOC', '--MOC : Porsche RWB 911 (993) par Pedroportelaneto--\r\n\r\nLa Porsche 911 RWB (993), personnalisée avec le style distinctif des créations RWB (Rauh-Welt Begriff), est une véritable œuvre d\'art automobile. Grâce au talent de Pedroportelaneto, ce MOC capture à merveille l’esprit brut et audacieux de ces modèles uniques, avec des lignes larges et une allure agressive qui respirent la performance.\r\n\r\nCe modèle, constitué de 313 pièces, est un défi passionnant pour les amateurs de Lego et de voitures. Contrairement aux sets officiels, ce MOC vous plonge dans une expérience de construction unique, avec des détails et une fidélité rarement égalés.\r\n\r\n--Des touches de customisation pour un modèle exceptionnel--\r\n\r\nPour cette Porsche RWB, j’ai apporté quelques modifications personnelles qui subliment encore davantage le design :\r\n\r\n  1. Jantes custom 3D de GT Créa Cars : Ces accessoires ajoutent un réalisme saisissant aux roues, en parfait accord avec l\'esprit audacieux des modèles RWB.\r\n\r\n  2. Pièces chromées de Chrome Block City : Les touches chromées apportent une finition élégante et mettent en valeur certains éléments clés de la voiture comme le moteur.\r\n\r\n  3. Deux pièces non officielles de Webrick : Ces pièces permettent d’unifier les couleurs pour un rendu parfait, en évitant les légères différences qui auraient pu gâcher l’harmonie globale du modèle.\r\n\r\nCes ajustements, bien que subtils, transforment ce MOC déjà impressionnant en une pièce de collection unique et hautement personnalisée.\r\n\r\n--Un design brut et iconique--\r\n\r\nLe style signature de RWB, avec ses ailes élargies, son aileron imposant et son profil abaissé, est parfaitement retranscrit dans cette construction. Un détail qui ne passe pas inaperçu : l’énorme moteur apparent à l’arrière, qui renforce le caractère brut et authentique de ce modèle. Ce choix de design met en avant la puissance de cette Porsche customisée, tout en ajoutant une touche visuelle impressionnante qui capte instantanément le regard.\r\n\r\nLes détails minutieux, comme les prises d’air, les feux avant et arrière, et le travail sur les proportions, complètent l’ensemble pour en faire une véritable œuvre d’art destinée aux passionnés de Porsche et de Lego.\r\n\r\n--Et vous ?--\r\n\r\nQu’en pensez-vous ? Avez-vous déjà tenté de construire ce MOC ? Partagez vos créations et idées dans les commentaires, et faites-moi savoir si vous avez des astuces ou des idées pour d’autres personnalisations !', '2024-10-21 11:59:45', 2, 3, 'porsche_rwb_preview', 'Porsche RWB 911 (993)'),
(4, 'Porsche Carrera GT - MOC', '--MOC : Porsche Carrera GT par TheGBrix--\n\nLa Porsche Carrera GT est une légende automobile, et ce MOC conçu par TheGBrix est à la hauteur de son statut iconique. Avec ses lignes élégantes, son profil abaissé et son style intemporel, ce modèle capture à merveille l’essence de cette supercar exceptionnelle, tout en offrant une expérience de construction riche et détaillée.\n\nDisponible dans plusieurs couleurs (gris clair, jaune, rouge et noir), ce MOC est un véritable bijou pour les fans de Porsche et les passionnés de Lego.\n\n--Une touche personnalisée pour encore plus de réalisme--\n\nPour cette Porsche Carrera GT, j’ai ajouté quelques personnalisations subtiles mais percutantes :\n\nBien évidemment, des enjoliveurs custom 3D de GT Créa Cars : Ces jantes spéciales ajoutent une finition élégante et réaliste, sublimant le design général et 6 pièces de chez Webrick pour les phares avant et arrière : Ces ajustements rendent l’éclairage du modèle plus réaliste et fidèle à l’apparence iconique de la Carrera GT, renforçant son impact visuel.\n\nCes petites modifications transforment un MOC déjà exceptionnel en une pièce de collection unique, parfaitement adaptée aux passionnés de supercars et de Lego.\n\n--Un design raffiné et fidèle--\n\nTheGBrix a brillamment recréé les courbes fluides et les détails caractéristiques de la Carrera GT. Le long capot avant, les passages de roues sculptés, et les lignes épurées du châssis forment un ensemble harmonieux qui respire la sophistication et la puissance.\n\nÀ l’arrière, le diffuseur finement modélisé et les doubles sorties d’échappement complètent le look sportif et luxueux de la voiture. Ce modèle est un hommage à la perfection mécanique et au design avant-gardiste de Porsche et pas que !\n\nCette voiture n’est pas seulement une icône automobile, elle est aussi entrée dans la légende en étant liée à l’acteur et passionné de voitures Paul Walker, qui en possédait un exemplaire. Cet hommage à sa mémoire ajoute une dimension émotionnelle à ce modèle, célébrant non seulement une supercar, mais aussi la passion qu’elle inspire aux amateurs du monde entier.\n\nEt rien que pour ça, je pense la passer en version rouge. For Paul\n\n--Et vous ?--\n\nQue pensez-vous de ce modèle emblématique, rendu encore plus spécial par son lien avec Paul Walker ? Avez-vous déjà construit ce chef-d’œuvre ou apporté vos propres modifications ? Peut-être avez-vous des souvenirs ou des anecdotes à partager autour de cette voiture légendaire ?\n\nPartagez vos créations, idées et impressions dans les commentaires ! J’ai hâte de découvrir ce que ce modèle évoque pour vous !', '2024-10-21 12:00:44', 2, 3, 'porsche_carrera_gt_preview', 'Porsche Carrera GT'),
(5, 'Mazda RX-7 FD3S d’Initial D - MOC', '--MOC : Mazda RX-7 FD3S d’Initial D par Madspacer--\r\n\r\nInspirée par la légendaire Mazda RX-7 FD3S pilotée par Keisuke Takahashi dans le manga et anime culte Initial D, cette création de Madspacer est une véritable ode à la culture automobile japonaise et à l’univers du drift.\r\n\r\nAvec ses courbes élégantes, ses détails soigneusement modélisés et ses proportions fidèles, ce MOC capture parfaitement l’esprit et la puissance de cette icône JDM (Japanese Domestic Market). Une voiture mythique qui ravira autant les fans de Lego que ceux d’Initial D.\r\n\r\n--Des modifications pour un réalisme accru--\r\n\r\nPour rendre ce modèle encore plus fidèle et percutant, j’ai apporté plusieurs touches personnalisées :\r\n\r\n1. Des jantes custom 3D de GT Créa Cars pour renforcer l’allure sportive et élégante de cette RX-7, parfaitement adaptée à l’univers du drift.\r\n\r\n2. Des stickers de Mattsbrickmocs : Les stickers ajoutent une finition graphique et des détails visuels qui rappellent le style distinctif de la voiture d’Initial D, pour une immersion totale.\r\n\r\n3. Deux pièces de chez Webrick pour les feux arrière : Ces éléments personnalisés donnent aux feux une apparence plus réaliste, en accord avec les caractéristiques emblématiques de la RX-7 originale en ajoutant aussi ma petite touche de peinture dessus.\r\n\r\n4. On y trouve aussi 4 adaptateurs Camber Stance (léger) également de chez GT Créa Cars : Ces adaptateurs permettent d’incliner les roues pour reproduire l’effet \"stance\" typique des voitures de drift et des préparations JDM. Cet ajout subtil confère au modèle une posture plus dynamique et agressive, fidèle à l’esprit d’Initial D.\r\n\r\nCes ajustements transforment un modèle déjà remarquable en une pièce unique, parfaite pour les collectionneurs et les amateurs de tuning Lego.\r\n\r\n--Un design fidèle à l’esprit d’Initial D--\r\n\r\nCe MOC ne se contente pas de reproduire une voiture. Il raconte une histoire, celle des courses nocturnes et des duels palpitants des routes de montagne japonaises. L’attention portée aux détails – des lignes agressives de la carrosserie au profil abaissé – fait honneur à l’original, tout en permettant aux fans de revivre l’univers d’Initial D dans un format Lego.\r\n\r\nLes fans reconnaîtront immédiatement l’iconique RX-7 FD3S de Keisuke Takahashi, une machine de drift légendaire dans le manga. Construire ce modèle, c’est comme ramener à la vie une part de l’histoire du JDM et de l’animation japonaise.\r\n\r\n--Et vous ?--\r\n\r\nAvez-vous déjà eu la chance de construire ce MOC inspiré d’Initial D ? Si oui, avez-vous ajouté vos propres modifications pour encore plus de réalisme, ou vous êtes-vous concentré sur l’esthétique d’origine ?\r\n\r\nN’hésitez pas à partager vos créations, vos idées et vos souvenirs liés à cette voiture emblématique – en Lego ou dans la vraie vie – dans les commentaires. J’ai hâte de découvrir vos inspirations !', '2024-10-21 12:02:14', 2, 10, 'mazda_rx7_initial_d_preview', 'Mazda RX-7 FD3S d’Initial D'),
(7, 'Lamborghini Vision Gran Turismo - LEGO set', '--Lego Set : Lamborghini Vision Gran Turismo--\r\n\r\nAvec son design futuriste et ses lignes acérées, la Lamborghini Vision Gran Turismo est bien plus qu’une voiture ! C’est un concept audacieux issu des circuits virtuels de Gran Turismo et transformé en une pièce de collection Lego exceptionnelle. Ce set, composé de 230 pièces et proposé au prix de 24,99 €, offre une expérience de construction captivante pour les amateurs de supercars et de Lego.\r\n\r\n--Une reproduction fidèle d’un concept futuriste--\r\n\r\nCe modèle Lego s’inspire directement de la voiture concept dévoilée par Lamborghini en 2019 pour le jeu Gran Turismo. Chaque détail, du châssis monocoque ultra-léger à l’aérodynamisme extrême, est fidèlement retranscrit en briques.\r\n\r\nL’allure agressive, le cockpit central futuriste et les grandes prises d’air latérales traduisent l’audace de ce concept, tandis que la livrée Lamborghini classique lui confère une allure luxueuse et sportive. Une fois monté, ce modèle est une véritable œuvre d’art qui attire tous les regards, que ce soit sur une étagère ou dans une collection dédiée.\r\n\r\n--Un réalisme personnalisé grâce à des modifications uniques--\r\n\r\nPour rendre cette Lamborghini Vision Gran Turismo encore plus impressionnante, j’ai ajouté une touche personnelle :\r\n\r\n1. Des enjoliveurs custom 3D de GT Créa Cars : Ces jantes uniques ont été soigneusement adaptées pour sublimer l’allure futuriste de la voiture.\r\n\r\n2. J’ai réalisé un travail minutieux sur les jantes ainsi qu\'à l\'arrière pour reproduire une finition élégante et haut de gamme, fidèle à l’esprit Lamborghini.\r\n\r\nCes modifications apportent une dimension supplémentaire à ce modèle, transformant une création déjà exceptionnelle en une pièce unique et réaliste.\r\n\r\n--Un set incontournable pour les passionnés--\r\n\r\nAvec ses multiples détails, la Lamborghini Vision Gran Turismo est un modèle qui séduira autant les amateurs de supercars que les fans de design futuriste. Ce set est une invitation à plonger dans l’univers visionnaire de Lamborghini et à découvrir comment la marque repousse sans cesse les limites de l’innovation automobile.\r\n\r\n--Et vous ?--\r\n\r\nQue pensez-vous de cette Lamborghini Vision Gran Turismo ? Avez-vous apporté vos propres touches personnelles à ce modèle ?\r\n\r\nPartagez vos impressions, vos idées et vos créations dans les commentaires – j’ai hâte de découvrir vos chefs-d’œuvre !', '2024-10-21 12:07:26', 2, 4, 'lamborghini_vision_gt_preview', 'Lamborghini Vision Gran Turismo'),
(8, 'Porsche 718 GT4 RS - MOC', '--MOC : Porsche 718 GT4 RS par TheGBrix--\n\nAvec ses lignes précises et son design racé, la Porsche 718 GT4 RS est une machine taillée pour la performance. Cette création de TheGBrix, composée de 445 pièces et disponible sous forme d’instructions au prix de 7 €, capture parfaitement l’essence de cette supercar compacte et sportive.\n\nPrésentée ici dans une élégante teinte Dark Bluish Gray, elle reflète à merveille l’équilibre parfait entre puissance et raffinement. Pour ma première construction, j’avais choisi une version blanche, mais cette nouvelle livrée ajoute une touche de sophistication supplémentaire.\n\n--Un modèle fidèle et détaillé--\n\nTheGBrix a mis tout son talent dans la conception de ce modèle, en s’attachant aux moindres détails :\n\n1. La large prise d’air à l’avant rappelle la recherche d’efficacité aérodynamique propre à Porsche.\n2. Les lignes épurées et les proportions parfaites traduisent la puissance et l’agilité de cette 718 GT4 RS.\n3. Les finitions arrière, notamment l’aileron massif et les doubles sorties d’échappement, renforcent l’esprit sportif de ce modèle.\n\nChaque élément de ce MOC évoque l’ADN Porsche : un équilibre entre design et performance qui ne laisse personne indifférent.\n\n--Une personnalisation unique pour encore plus de réalisme--\n\nPour rendre cette Porsche 718 GT4 RS encore plus impressionnante, j’ai ajouté plusieurs modifications :\n\n1. Les enjoliveurs custom 3D de GT Créa Cars : Ces jantes sur mesure apportent une finition haut de gamme, parfaitement en phase avec le style racé de la voiture.\n\n2. J’ai réalisé un travail précis sur les jantes pour un rendu encore plus réaliste et fidèle à l’identité Porsche.\n\n3. Et enfin 8 pièces de chez Webrick pour les phares avant et arrière : Ces éléments donnent un réalisme accru à l’éclairage de la voiture, accentuant la finesse des détails.\n\nCes modifications transforment une création déjà remarquable en une pièce de collection unique, idéale pour tout amateur de Lego et de voitures de sport.\n\n--Et vous ?--\n\nQue pensez-vous de cette Porsche 718 GT4 RS ? Avez-vous déjà construit ce modèle et avez-vous tenté d’autres couleurs ou ajouté vos propres touches personnelles ?\n\nN’hésitez pas à partager vos impressions, vos idées et vos créations dans les commentaires – je suis curieux de voir comment vous personnalisez vos modèles !\n\n', '2024-10-21 12:08:02', 2, 3, 'porsche_718_gt4_rs_preview', 'Porsche 718 GT4 RS'),
(9, 'Nissan GT-R NISMO', '--Lego set: Nissan GT-R Nismo (76896)--\r\n\r\nLa Nissan GT-R Nismo représente l’ultime incarnation de l’excellence sportive, mêlant technologies de pointe et design racé. Ce modèle emblématique, à la fois percutant et raffiné, ne passe jamais inaperçu – que ce soit sur route ou en version Lego.\r\n\r\nAvec ses 301 pièces, ce set, autrefois disponible chez Lego, est désormais devenu plus rare. Son prix a grimpé avec le temps, et il faut compter environ 40 € (voire plus) pour un modèle neuf sur des plateformes comme Bricklink. Une pièce de collection qui attire toujours les passionnés !\r\n\r\n--Un design saisissant et des détails impressionnants--\r\n\r\nCe set Lego Speed Champions capture avec précision les lignes agressives et le style unique de la GT-R Nismo. Parmi les modèles de la gamme, il est l’un des rares à représenter une voiture de série aussi iconique, immédiatement reconnaissable grâce à ses courbes sculptées et ses accents rouges distinctifs.\r\n\r\nLes couleurs lui confèrent un look résolument moderne et dynamique, rendant hommage au design du bolide original.\r\n\r\n--Une touche personnelle pour encore plus de réalisme--\r\n\r\nComme d\'habitude, j’aime apporter ma propre touche aux modèles que je construis. Pour cette GT-R Nismo, j’ai installé des jantes custom conçues par GT Créa Cars, la peinture a été un défi amusant, surtout lorsqu’il a fallu recréer le logo Nismo sur la branche – un détail qui apporte une vraie authenticité au modèle !\r\n\r\n--Et vous ?--\r\n\r\nPossédez-vous cette Nissan GT-R Nismo Lego ? Avez-vous eu l’occasion de la personnaliser ? N’hésitez pas à partager vos expériences et créations dans les commentaires !', '2024-10-23 19:02:39', 2, 2, 'nissan_gt-r_nismo_preview', 'Nissan GT-R NISMO Preview');

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, ' Divers'),
(2, 'Nissan'),
(3, 'Porsche'),
(4, 'Lamborghini'),
(5, 'Ford'),
(7, 'Ferrari'),
(8, 'McLaren'),
(9, 'Toyota'),
(10, 'Mazda'),
(11, 'Chevrolet'),
(12, 'Dacia'),
(14, 'BMW'),
(15, 'Koenigsegg'),
(16, 'Pagani'),
(17, 'Lotus'),
(18, 'Bugatti'),
(19, 'Mercedes'),
(20, 'Jaguar');

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

CREATE TABLE `comment` (
  `id` int NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `publishDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_user` int DEFAULT NULL,
  `id_article` int DEFAULT NULL,
  `status` enum('published','pending','moderated','rejected','deleted') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'published'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`id`, `content`, `publishDate`, `id_user`, `id_article`, `status`) VALUES
(9, 'c\'est super beau !', '2025-01-30 17:51:07', 21, 1, 'published'),
(10, 'joli', '2025-01-30 18:06:31', 21, 1, 'published'),
(11, 'wonderful !', '2025-01-30 18:08:46', 21, 1, 'published'),
(12, 'très belles jantes', '2025-01-30 18:22:46', 21, 1, 'published'),
(13, 'waou !', '2025-01-31 12:08:58', 21, 1, 'published'),
(14, 'super les jantes ! Gautier a fait un super boulot :)', '2025-01-31 12:10:24', 21, 1, 'published'),
(15, 'Waou ! c\'est magnifique super boulot', '2025-01-31 12:16:40', 21, 1, 'published'),
(16, 'WAAAAA !!!! C TROP BIEN !!!', '2025-01-31 15:38:45', 22, 1, 'published'),
(17, 'Belle voiture et bon article', '2025-02-11 15:53:46', 21, 1, 'published'),
(18, 'wonderful !', '2025-02-11 16:11:47', 21, 1, 'published'),
(20, 'super beau c\'est magnifique', '2025-02-11 18:27:36', 21, 1, 'published'),
(21, 'je suis très bavarde', '2025-02-11 20:16:10', 21, 1, 'published'),
(24, 'Super les jantes custom ! et très belle main x)', '2025-02-23 19:27:16', 24, 2, 'published'),
(25, 'merci :p', '2025-02-23 19:33:30', 2, 2, 'published');

-- --------------------------------------------------------

--
-- Structure de la table `media`
--

CREATE TABLE `media` (
  `id` int NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `alt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `id_article` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `media`
--

INSERT INTO `media` (`id`, `name`, `alt`, `id_article`) VALUES
(1, 'dark_horse_1', 'Ford Mustang Dark Horse - img 1', 1),
(2, 'dark_horse_2', 'Ford Mustang Dark Horse - img 2', 1),
(3, 'dark_horse_3', 'Ford Mustang Dark Horse - img 3', 1),
(4, 'dark_horse_4', 'Ford Mustang Dark Horse - img 4', 1),
(5, 'dark_horse_5', 'Ford Mustang Dark Horse - img 5', 1),
(6, 'dark_horse_6', 'Ford Mustang Dark Horse - img 6', 1),
(7, 'dark_horse_7', 'Ford Mustang Dark Horse - img 7', 1),
(8, 'dark_horse_8', 'Ford Mustang Dark Horse - img 8', 1),
(9, 'f8_tributo_1', 'Ferrari F8 Tributo - img 1', 2),
(10, 'f8_tributo_2', 'Ferrari F8 Tributo - img 2', 2),
(11, 'f8_tributo_3', 'Ferrari F8 Tributo - img 3', 2),
(12, 'porsche_rwb_1', 'Porsche RWB - img 1', 3),
(13, 'porsche_rwb_2', 'Porsche RWB - img 2', 3),
(14, 'porsche_rwb_3', 'Porsche RWB - img 3', 3),
(15, 'carrera_gt_1', 'Porsche Carrera GT - img 1', 4),
(16, 'carrera_gt_2', 'Porsche Carrera GT - img 2', 4),
(17, 'carrera_gt_3', 'Porsche Carrera GT - img 3', 4),
(18, 'carrera_gt_4', 'Porsche Carrera GT - img 4', 4),
(20, 'carrera_gt_5', 'Porsche Carrera GT - img 5', 4),
(21, 'mazda_rx7_initial_d_1', 'Mazda Rx7 Initial D - img 1', 5),
(22, 'mazda_rx7_initial_d_2', 'Mazda Rx7 Initial D - img 2', 5),
(23, 'mazda_rx7_initial_d_3', 'Mazda Rx7 Initial D - img 3', 5),
(24, 'mazda_rx7_initial_d_4', 'Mazda Rx7 Initial D - img 4', 5),
(25, 'lamborghini_vision_gt_1', 'Lamborghini Vision GT - img 1', 7),
(26, 'lamborghini_vision_gt_2', 'Lamborghini Vision GT - img 2', 7),
(27, 'lamborghini_vision_gt_3', 'Lamborghini Vision GT - img 3', 7),
(28, 'lamborghini_vision_gt_4', 'Lamborghini Vision GT - img 4', 7),
(30, 'porsche_718_gt4_rs_1', 'Porsche 718 GT4 RS - img 1', 8),
(31, 'porsche_718_gt4_rs_2', 'Porsche 718 GT4 RS - img 2', 8),
(32, 'porsche_718_gt4_rs_3', 'Porsche 718 GT4 RS - img 3', 8),
(33, 'porsche_718_gt4_rs_4', 'Porsche 718 GT4 RS - img 4', 8),
(34, 'porsche_718_gt4_rs_5', 'Porsche 718 GT4 RS - img 5', 8),
(35, 'nissan_gt-r_nismo_1', 'Nissan GT-R Nismo - img 1', 9),
(36, 'nissan_gt-r_nismo_2', 'Nissan GT-R Nismo - img 2', 9),
(37, 'nissan_gt-r_nismo_3', 'Nissan GT-R Nismo - img 3', 9),
(38, 'nissan_gt-r_nismo_4', 'Nissan GT-R Nismo - img 4', 9),
(39, 'nissan_gt-r_nismo_5', 'Nissan GT-R Nismo - img 5', 9);

-- --------------------------------------------------------

--
-- Structure de la table `reaction`
--

CREATE TABLE `reaction` (
  `id_user` int NOT NULL,
  `id_article` int NOT NULL,
  `reaction_type` tinyint(1) NOT NULL COMMENT '1 = j''adore, 2 = j''aime'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `reaction`
--

INSERT INTO `reaction` (`id_user`, `id_article`, `reaction_type`) VALUES
(21, 9, 1),
(21, 1, 2),
(2, 2, 2),
(2, 1, 2),
(23, 2, 2),
(23, 1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('TSx3umnxmNuevdmrzI9cS938D0DKbW-U', 1740676176, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-02-27T11:49:25.521Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":2,\"username\":\"Crypoune\",\"role\":\"admin\",\"email\":\"a.messenet@gmail.com\",\"created_date\":\"2024-10-19T20:50:33.000Z\",\"status\":\"active\"}}');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Date et heure de création',
  `role` enum('member','admin','editor') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'member',
  `status` enum('active','inactive','banned') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `created_date`, `role`, `status`) VALUES
(1, 'Anonyme', '', '', '2024-10-19 22:50:33', 'editor', 'active'),
(2, 'Crypoune', 'a.messenet@gmail.com', '$2b$10$weCeX87.Xl.1XLmSpMNxvuAgtL./f5BmcvcPyC5jjIEBMBLgraEtO', '2024-10-19 22:50:33', 'admin', 'active'),
(6, 'Gt.créa.cars', 'crea.cars@gmail.com', '$2b$10$x.9SodNJjA.8FZDaCbaN7eKp/7Crc1r2MFlH/UEKYBCMwgRNOdD0q', '2024-10-22 15:20:00', 'member', 'active'),
(10, 'Fred', 'fred.legars@gmail.com', '$2b$10$3yeDfOTCwEbjgCscou5lnufr8RW/uLUkaL8lbPSKGN4EKz/u7RPjS', '2024-10-22 20:59:52', 'member', 'active'),
(11, 'Jason', 'jason.lepote@gmail.com', '$2b$10$ShBfieCc0FfcKqq1.BHCrehu.a8XcTkNVmVXtK/XBL8k.72Na5vVq', '2024-10-23 13:30:07', 'member', 'active'),
(19, 'Gerard', 'gerard.messenet@gmail.com', '$2b$10$fcm7kKGuBXi7AmzZNVBSIeUkVm/jceTgA27IfrEWyoYZl9HCIDBXi', '2025-01-21 12:33:36', 'member', 'active'),
(20, 'Léa', 'lea.vallot@gmail.com', '$2b$10$3647Rj9VAz5Q5AYsj6fyFO3bmSVomLeLN4aqQPGn2e138I6KCJcF6', '2025-01-21 12:34:58', 'member', 'active'),
(21, 'Solange', 'solange.messenet@gmail.com', '$2b$10$11drYhPJK3jumWj8yTllmO14bdcDk9lPBy1qUeKGf7QFqPbWmjHcS', '2025-01-27 12:04:43', 'member', 'active'),
(22, 'Matis', 'matis.vallot@gmail.com', '$2b$10$0sp8TbGlxE9cJF0rGgHGd.1586QzIQzXqElJCBhD4lQZiFOnVG3NO', '2025-01-31 15:38:18', 'member', 'active'),
(23, 'Cheenzo', 'vincent.cheenzo@gmail.com', '$2b$10$OtpfCMeV6u5w7ysy.nv.BOTHZokTxy9BXvqjj6jFEysR2mtT2EIu6', '2025-02-08 14:48:16', 'member', 'active'),
(24, 'User', 'user.test@3wa.fr', '$2b$10$Km/q2bzxtgzUdWyOBIsiDun7EjToeb1aVk9NWYyG/gQ69bUdLhEsa', '2025-02-19 10:44:24', 'member', 'active'),
(25, 'Admin', 'admin.test@3wa.fr', '$2b$10$x8NaJXJgxMWHu1DlMzTiwuDha2HPTA1cEE2jbxMX8zZMwB7pHXJ96', '2025-02-19 10:45:26', 'admin', 'active'),
(27, 'Jean', 'jean.bon@free.com', '', '2025-02-21 23:38:37', 'member', 'active');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`id_user`),
  ADD KEY `category_id` (`id_category`);

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `article_id` (`id_article`),
  ADD KEY `user_id` (`id_user`);

--
-- Index pour la table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `article_id` (`id_article`);

--
-- Index pour la table `reaction`
--
ALTER TABLE `reaction`
  ADD KEY `user_id` (`id_user`),
  ADD KEY `article_id` (`id_article`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`,`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `article`
--
ALTER TABLE `article`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `media`
--
ALTER TABLE `media`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `article_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `article_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`id_article`) REFERENCES `article` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `media`
--
ALTER TABLE `media`
  ADD CONSTRAINT `media_ibfk_1` FOREIGN KEY (`id_article`) REFERENCES `article` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `reaction`
--
ALTER TABLE `reaction`
  ADD CONSTRAINT `reaction_ibfk_1` FOREIGN KEY (`id_article`) REFERENCES `article` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reaction_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
