# 🍽️ NutriTrack Cloud — Rapport Technique

Ce projet est une application web de suivi nutritionnel et de santé développée dans le cadre du module Cloud. Il permet aux utilisateurs de suivre leur évolution de poids, de fixer des objectifs caloriques personnalisés, de gérer leur journal alimentaire et d'analyser leurs habitudes via des graphiques dynamiques.

## 1. Architecture & Choix Techniques

Pour répondre aux besoins de rapidité, de scalabilité et de maintenabilité, nous avons opté pour une architecture **Full Node.js** avec **Express**. Ce choix permet d'unifier le langage (JavaScript) côté serveur et côté client, et s'intègre parfaitement aux architectures Cloud natives (PaaS).

L'application respecte strictement le pattern **MVC (Modèle-Vue-Contrôleur)**, ce qui garantit un code lisible, modulaire et maintenable :

*   📂 **`/models`** : Fichiers isolés pour chaque table de la base de données via l'ORM Sequelize.
*   📂 **`/views`** : Interface utilisateur générée côté serveur via le moteur de template **EJS**.
*   📂 **`/controllers`** : Cœur de la logique métier (authentification, calculs nutritionnels, préparation des données pour les graphiques).
*   📂 **`/routes`** : Distribution du trafic HTTP vers les contrôleurs appropriés.
*   📂 **`/middlewares`** : Protection centralisée des routes (vérification des sessions utilisateurs).
*   📂 **`/db`** : Gestion professionnelle de la base de données avec des scripts automatisés (`run-migrations.js` et `run-seeds.js`) utilisant `child_process` pour exécuter les fichiers séquentiellement.

## 2. Interface, UX & Fonctionnalités Avancées (Bonus)

L'expérience utilisateur (UX) a été au centre du développement, justifiant l'usage de bibliothèques tierces pour un rendu professionnel :

*   **Tailwind CSS :** Interface moderne, asymétrique et réactive (responsive) sans alourdir le projet.
*   **Recherche Intelligente (Fuzzy Search) :** Pour l'ajout d'aliments (Mode A), nous avons implémenté **Fuse.js**. Le système gère le filtrage en temps réel côté client, ignore les accents (via `normalize('NFD')`) et tolère les fautes de frappe (ex: taper "pome" trouve "Pomme").
*   **Graphiques Avancés (Chart.js) :** 
    *   Boutons de filtrage dynamiques (7, 30, 90 jours) qui mettent à jour les graphiques sans recharger la page.
    *   Graphique de poids incluant une **Moyenne Glissante sur 7 jours** (Bonus).
    *   Graphiques de nutrition avec barres empilées (Stacked Bar) pour les macros (Protéines, Glucides, Lipides).

---

## 3. Modèle de Données (Documentation Technique)

La base de données relationnelle est gérée via **Sequelize**. 

> 💡 **Note d'optimisation (MVP) :** Le cahier des charges initial suggérait une structure très hiérarchisée (`DiaryDay -> Meal -> MealEntry`). Pour optimiser les performances, réduire le nombre de jointures SQL et simplifier l'architecture du MVP, le modèle a été "aplati" et dénormalisé : les informations de date et de type de repas sont stockées directement dans `MealEntry`.

### **Schéma de données actuel :**
1.  **User (Utilisateur) :**
    *   `email`, `password` (Haché via Bcrypt).
    *   `height`, `calorieGoal`, `proteinGoal`, `carbGoal`, `fatGoal` (Profil et objectifs).
2.  **WeightEntry (Suivi de poids) :**
    *   `weight` (Flottant), `date` (Date).
    *   *Relation :* BelongsTo User.
3.  **FoodItem (Dictionnaire d'aliments - Mode A) :**
    *   `name`, `kcalPer100g`, `proteinPer100g`, `carbsPer100g`, `fatPer100g`.
4.  **MealEntry (Journal Alimentaire) :**
    *   `mealType` (Enum : Petit-déj, Déjeuner, etc.), `foodName`, `quantity`, `calories`, `macros`, `date`.
    *   *Relation :* BelongsTo User.

---

## 4. Analyse & Choix Cloud

Pour l'hébergement de NutriTrack Cloud, nous avons comparé trois solutions :

| Solution | Type | Avantages | Inconvénients | Coût |
| :--- | :--- | :--- | :--- | :--- |
| **AWS EC2** | IaaS | Contrôle total sur l'OS | Gestion complexe, maintenance manuelle | Pay-as-you-go |
| **Heroku** | PaaS | Déploiement `git push`, très simple | Plus de plan gratuit permanent | ~7$/mois |
| **Render** | PaaS | **Déploiement automatique**, SSL gratuit | Cold start (veille) en plan gratuit | **0$ (Gratuit)** |

**Justification du choix :**
Nous avons retenu **Render.com** (ou alternative PaaS comme Railway). C'est une solution **PaaS** qui permet de se concentrer sur le code plutôt que sur l'infrastructure. Elle offre une intégration continue (CI/CD) directe avec GitHub, gère automatiquement les certificats SSL, et propose un coût de 0$ pour le prototypage, ce qui correspond parfaitement aux besoins du projet NutriTrack.

---

## 5. Sécurité & Bonnes Pratiques

*   **Sécurité des sessions :** Utilisation de `express-session` avec des secrets d'environnement.
*   **Protection des mots de passe :** Algorithme de hachage **Bcrypt** (salage de 10 tours).
*   **Variables d'environnement :** Fichier `.env` pour séparer les clés secrètes du code source (exclu via `.gitignore`).
*   **Validation côté serveur :** Sécurisation des entrées pour éviter les injections ou erreurs de typage lors des calculs de macros.

---

## 6. Installation et Lancement Local

Pour tester l'application en local :

1.  **Clonage du projet :** 
    ```bash
    git clone <repo-url>
    cd nutritrack-cloud
    ```
2.  **Installation des dépendances :** 
    ```bash
    npm install
    ```
3.  **Configuration :** 
    Créer un fichier `.env` à la racine (voir `.env.example`).
    ```text
    PORT=3000
    SESSION_SECRET=votre_secret_securise
    ```
4.  **Initialisation de la base de données :**
    ```bash
    npm run db:migrate   # Crée les tables
    npm run db:seed      # Injecte le dictionnaire d'aliments et l'historique de test
    ```
5.  **Lancement du serveur :** 
    ```bash
    npm start
    ```
    *Rendez-vous sur `http://localhost:3000`*
