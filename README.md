# 🍽️ NutriTrack Cloud — Rapport Technique

Ce projet est une application de suivi nutritionnel et de santé développée dans le cadre du module Cloud. Il permet aux utilisateurs de suivre leur évolution de poids, de fixer des objectifs caloriques et de gérer leur journal alimentaire.

## 1. Architecture & Choix Techniques

Pour répondre aux besoins de rapidité, de scalabilité et de maintenabilité, nous avons fait les choix suivants :

### **Framework : Node.js & Express**
*   **Pourquoi ?** Nous avons choisi un environnement "Full Node" pour l'unification du langage (JavaScript/TypeScript) entre le serveur et les scripts clients. Express est un framework minimaliste, robuste et parfaitement adapté aux architectures Cloud natives (PaaS).
*   **Organisation :** L'application suit le pattern **MVC (Modèle-Vue-Contrôleur)** :
    *   `/models` : Logique de données et schémas.
    *   `/routes` : Définition des points d'entrée (endpoints).
    *   `/views` : Interface utilisateur via le moteur de template **EJS**.
    *   `/controllers` : Logique métier (authentification, calculs).

### **Interface & UX**
*   **Tailwind CSS :** Pour une interface moderne, réactive (responsive) et une navigation cohérente sans alourdir le projet avec des fichiers CSS massifs.
*   **Chart.js :** Utilisé pour la visualisation des données (poids et nutrition) afin d'offrir une expérience utilisateur (UX) claire et professionnelle.

---

## 2. Modèle de Données (Documentation Technique)

La base de données est gérée via l'ORM **Sequelize**, garantissant une structure stricte et facilitant les migrations vers le Cloud.

### **Schéma de données actuel :**
1.  **User (Utilisateur) :**
    *   `email` : Identifiant unique.
    *   `password` : Stocké de manière sécurisée via **Bcrypt** (Hachage).
    *   `height` : Taille pour le calcul des besoins.
    *   `calorieGoal`, `proteinGoal`, `carbGoal`, `fatGoal` : Objectifs personnalisés.
2.  **WeightEntry (Suivi de poids) :**
    *   `weight` : Valeur numérique.
    *   `date` : Date de la pesée.
    *   *Relation* : BelongsTo User (Un utilisateur a plusieurs pesées).

---

## 3. Analyse & Choix Cloud

Pour l'hébergement de NutriTrack Cloud, nous avons comparé trois solutions :

| Solution | Type | Avantages | Inconvénients | Coût |
| :--- | :--- | :--- | :--- | :--- |
| **AWS EC2** | IaaS | Contrôle total sur l'OS | Gestion complexe, maintenance manuelle | Pay-as-you-go |
| **Heroku** | PaaS | Déploiement `git push`, très simple | Plus de plan gratuit permanent | ~7$/mois |
| **Render** | PaaS | **Déploiement automatique**, SSL gratuit | Cold start (veille) en plan gratuit | **0$ (Gratuit)** |

**Justification du choix :**
Nous avons retenu **Render.com** (ou Railway). C'est une solution **PaaS** qui permet de se concentrer sur le code plutôt que sur l'infrastructure. Elle offre une intégration continue (CI/CD) avec GitHub, une base de données managée et un coût de 0$ pour le prototypage, ce qui correspond parfaitement aux besoins du projet NutriTrack.

---

## 4. Sécurité & Bonnes Pratiques

*   **Validation des données :** Chaque entrée de poids ou de calories est validée côté serveur pour éviter les données erronées.
*   **Sécurité des sessions :** Utilisation de `express-session` avec des secrets d'environnement.
*   **Protection des mots de passe :** Utilisation de l'algorithme de hachage **Bcrypt** (salage de 10 tours) pour empêcher la lecture des mots de passe en cas de fuite de base de données.
*   **Variables d'environnement :** Utilisation d'un fichier `.env` pour séparer les clés secrètes du code source (sécurité Git).

---

## 5. Installation et Lancement

1.  **Clonage :** `git clone <repo-url>`
2.  **Installation :** `npm install`
3.  **Configuration :** Créer un fichier `.env` (voir `.env.example`).
4.  **Lancement :** `npm start` (ou `npm run dev` pour le mode développement).
