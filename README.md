# PATHFINDER

Ce répo contient le backend de l'application PathFinder et aussi les fichiers nécessaires à l'initialisation du docker contenant MongoDB.
Il est construit autour de NestJS.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés :

- Node.js
- npm (ou yarn)
- Docker

## Installation

1. Clonez ce dépôt sur votre machine locale :

```
git clone https://github.com/marieliserenzema/pathfinder-backend
```

2. Accédez au répertoire du projet :

```
cd pathfinder-backend
```

3. Installez les dépendances :

```
npm install
```


## Démarrage de l'application

Vous pouvez démarrer le server en exécutant la commande suivante :

```
npm run start
```

## DOCKER

Rien de compliqué pour le lancer grâce au docker-compose :

Si ce n'est pas encore fait :
```
cd docker/
```

puis

```
docker compose up
```

Si vous souhaitez le couper : 

```
docker compose down
```

Pour un reset complet, faites ce combo :

```
docker compose down --volumes
docker compose up --build
```

Les autres fichiers compris dans `mongo_seed` servent à initialiser le mongo avec des données immédiates à l'aide du Dockerfile.  
`admin.json` pour créer un admin utilisable dans Pathfinder-frontend-website.  
Les autres pour nourrir le mongo des données de randonnées que l'on filtre d'un json volumineux (`france_hiking_foot_routes_line.json` dans le serveur Ynov).  
Le filtre est réalisé grâce à `filter.py` et nous modifions les coordonnées vers un format lisible avec `epsgTransformer.py`.

## Dernière étape

Pour que l'app mobile de Pathfinder puisse intéragir avec notre backend lorsque nous utilisons Expo, nous avons besoin d'un tunnel.  
Pour cela, nous utilisons Ngrok. Si vous passez par le serveur Ynov, vous trouverez la commande à lancer (si le docker ngrok n'est pas déjà actif) 
dans le fichier `/home/user/projet/ngrok.txt`.  
Si vous souhaitez le lancer en local, vous allez avoir besoin d'un compte ngrok et de quelques informations assez simple à trouver sur le site.

Installation avec docker :

```
    docker pull ngrok/ngrok
```

Puis : 

```
    docker run -d --restart unless-stopped --net=host -it -e NGROK_AUTHTOKEN=YOUR_AUTHTOKEN ngrok/ngrok:latest http --domain=YOUR_STATIC_DOMAIN 3000
```

Vous pouvez suivre l'activité enregistrée par le tunnel en accédant à `localhost:4040` ou pour le serveur Ynov à `172.16.70.202:4040`.

Avec toutes ces étapes, il est désormais possible d'utiliser l'application Pathfinder depuis votre mobile avec Expo GO.