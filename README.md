# E-Todo

Application web de gestion de tâches (to-do list) avec authentification, réalisée en équipe à Epitech (B-WEB-101).

Chaque utilisateur crée un compte, se connecte et gère ses propres tâches : titre, description, échéance et statut. Une vue calendrier affiche les tâches dans le temps.

## Fonctionnalités

- Inscription et connexion, mots de passe hachés avec bcrypt
- Authentification par jeton JWT, routes protégées par un middleware
- Création, modification, suppression et consultation des tâches
- Statut de chaque tâche : *not started*, *todo*, *in progress*, *done*
- Page profil et vue calendrier

## Stack technique

| Couche | Technologies |
| --- | --- |
| Front-end | HTML, CSS, JavaScript |
| Back-end | Node.js, Express 5, API REST |
| Base de données | MySQL 8 |
| Sécurité | JWT (jsonwebtoken), bcryptjs, CORS |
| Déploiement | Docker, Docker Compose |

## Structure

```
backend/src/
├── index.js              Point d'entrée Express
├── config/db.js          Connexion MySQL
├── middleware/           Authentification JWT, route introuvable
└── routes/
    ├── auth/             Inscription, connexion
    ├── user/             Informations et gestion du compte
    └── todos/            CRUD des tâches
frontend/                 Pages login, register, home, calendar, user
e-todo.sql                Schéma de la base (tables user et todo)
```

## Lancer le projet

```bash
cp .env.example .env    # puis renseigner les mots de passe MySQL et le secret JWT
docker compose up --build
```

- Front-end : http://localhost:8080
- API : http://localhost:5000

## Équipe

Léandre Boubault--Lefebvre, Mattis et Mathieu Jin — Epitech, 2025.
