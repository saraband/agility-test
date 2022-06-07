# Test technique Agility

## Setup et lancement du projet
```
yarn install
yarn serve
```

# Résumé/compte-rendu de mon process et du test

J'ai mis un peu moins d'une journée à réaliser l'exercice.

Ma démarche a été globalement de faire toute **la partie logique dans un premier temps afin d'identifier un maxium de problématiques techniques en aval** (Je dirais que ça m'a pris à peu près 50% de mon temps de travail alloué): la connexion et la récupération des données de forecast avec l'API de OpenWeather, les interactions majeures de l'interface (La barre d'autocomplétion, les routes, le toggle de la page de forecast et l'affichage des données formattées).

J'ai aussi passé du temps à chercher une solution relativement propre pour comment récupérer une image de background pour une ville donnée de manière dynamique.

Le reste du temps de travail (~40%) est passé sur le style, l'intégration du design et le responsive.


# Problématiques rencontrées, principes et solutions utilisées

Globalement, j'ai cherché à faire des composants indépendants et qui concentrent leur logique au même endroit afin de faciliter leur maintenance et leur developpement ultérieur. Par ailleurs, j'ai cherché à laisser le code le plus lisible et maintenable possible en évitant de scinder trop vite en petits composants génériques.
## Barre d'autocomplétion et recherche de ville

Pour la recherche de lieu, j'ai pensé à une barre d'autocomplétion (bien qu'elle ne soit pas spécifiée dans le design). Ca permet à l'utilisateur de trouver plus facilement un lieu et aussi **régler le problème des villes qui ont le même nom** qui peut subvenir parfois (Paris est par exemple la ville de France mais est aussi le nom de plusieurs autres villes dans le monde).

Pour l'implémentation technique de la barre d'autocomplétion, j'ai fait attention à **utiliser un debounce pour éviter de faire trop d'appels inutiles à l'API**

J'ai aussi pensé à faire un composant générique *AutocompleteInput* qui aurait pu être utilisé ultérieurement si l'application venait à grandir. Cependant, étant donné qu'il existe actuellement qu'une seule page utilisant cette barre d'autocomplétion j'ai préféré ne pas faire de l'overkill (quitte à refactoriser/re-arranger les composants dans le futur).

## Routing

Pas énormément de choses à dire à part que j'ai fait attention à ce que les routes soient "indépendantes" d'un quelconque état de l'app. Ca permet qu'un utilisateur puisse copier coller l'url de forecast d'une ville et bien se retrouver au même endroit que s'il était arrivé sur la page via la barre d'autocomplétion (vu que les paramètres sont dans l'URL). Ca permet aussi de restreindre la logique de chaque route à un petit nombre de fichiers.

## Recherche de background-image dynamique

J'ai passé pas mal de temps à chercher sur internet des APIS qui me permettraient de résoudre ce problème. Mon idée était de faire une recherche Google image et de récupérer l'URL des premiers résultats pour la mettre en background. Cependant j'ai pas trouvé de solutions straightforward pour faire ça.

J'ai trouvé SerpAPI mais j'me suis rendue compte que c'est une API Node et bien que j'aurais pu faire un serveur Node qui vient ensuite taper dans SerpAPI mais ça aurait probablement été de l'overkill.

J'ai finalement trouvé un service google qui s'appelle Custom Search API qui permet de chercher des images sur un domaine donné. Après avoir fait quelques tests sur des sites d'images (pinterest, unsplash, etc), j'ai décidé de le connecter à Unsplash et d'utiliser les premiers résultats qui sont globalement pertinents.
# Recommandations pour un travail futur

Globalement si l'application venait à grandir, il y aurait probablement imo **un travail de générisation des composants** à mesure que ceux-ci se verront réutilisés à différents endroits de l'app. Par exemples le composants de formulaires (Input, boutons, etc) pourront être refactorisés pour éviter de répéter du code et **garder ainsi l'application maintenable à mesure qu'elle grandit**.

A mesure que le projet grandit je pense qu'il faut aussi continuer à éviter de créer des dépendances trop compliquées entre composants et préferer des composants fonctionnels dont la logique est relativement simple et concentrée à un seul même endroit.

Je suis pas sûre qu'il s'agisse de quelque chose que vous attendez (?) mais en termes de fonctionnalitées qui pourraient être développées, y'a tout un tas de données fournies par l'API d'OpenWeatherMap qui pourraient être utlisées et affichée par exemple sous la forme d'un graph modulaire (Les données de température, d'humidité, de vent, etc pour chaque heure/jour).

Il y aussi la possibilité de rajouter des états de loading (par exemple lors du chargement des forecast), et de meilleurs safeguard (J'ai pas énormément testé mais peut-être que certaines villes n'ont pas de forecast/le forecast est incomplet ?).

Voilà, je suis pas sûre de ce que vous attendiez en terme de *recommandations pour un travail futur*, j'espère que ça vous suffit en terme d'insight.