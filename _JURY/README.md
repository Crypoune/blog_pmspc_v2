# Projet Pimp My Speed Champions - Site Vitrine

## Description du projet

Pimp my Speed Champions est un blog dédié à l’univers des LEGO Speed Champions, avec un focus particulier sur la customisation des modèles. Il propose une sélection de créations modifiées, des inspirations de design et des analyses détaillées des différentes techniques d’assemblage. Ce projet vise à mettre en avant l’art de la personnalisation dans le monde des petites briques, en s’adressant aussi bien aux amateurs éclairés qu’aux collectionneurs exigeants.

## Fonctionnalités principales

### Côté Utilisateur

Tout d'abord, le blog inclura des articles détaillés qui fourniront des informations sur les modèles de Lego Speed Champions customisés, ainsi que des avis et des réactions des utilisateurs.

Un formulaire de contact sera disponible pour tout utilisateur souhaitant soumettre une demande ou poser une question.

Ils pourront également laisser des commentaires sur les articles.

Ils auront également accès à un historique de leurs commentaires postés sur le blog.

Des liens utiles les dirigeront vers les sites que j'utilise fréquemment pour personnaliser mes modèles, afin qu'ils puissent eux aussi s'inspirer et trouver des ressources pour leurs propres créations.

### Côté Administrateur

L'administrateur pourra gérer le contenu du site (CRUD).

## Technologies utilisées

- HTML, CSS, React.js, Context
- Node.js, Express
- MySQL

## Lancement

1. Cloner

```bash
git clone [URL_du_repo]
```

2. Installer les dépendances

```bash
cd [nom_du_dossier]
npm install
```

3. Importer la base de données sur phpMyAdmin

Vous trouverez un export de la base de données disponible dans le dossier \_JURY

4. Configurer la base de données

Créer un fichier .env à la source avec les informations suivantes :

```js
LOCAL_PORT = "9000";

HOST_DB = "localhost";
USER_DB = "[nom d'utilisateur de la base de données]";
PASS_DB = "[mot de passe de la base de données]";
NAME_DB = "[nom de la base de données]";
PORT_DB = "[port de la base de données]";
```

5. Lancer le projet

```bash
cd BACK
npm run dev
```

puis

```bash
cd FRONT
npm run dev
```

6. Accès au site

Cliquer sur le lien suivant http://localhost:5173/

## Accès aux comptes

### Compte Utilisateur

- Username : `User`
- Password : `User123!`

### Compte Administrateur

- Username : `Admin`
- Password : `Admin123!`
