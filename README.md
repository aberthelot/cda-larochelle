
# Communauté D'Agglomération de La Rochelle

***

**cda-larochelle** est une application permettant de maquetter des interfaces devant être intégrées par la suite dans leur portail LIferay.

Ce projet s'appuie sur [Node.js](http://nodejs.org/) pour la partie serveur (front) et s'appuie sur la stack [Yeoman](http://yeoman.io/) couplé à [AngularJS](http://angularjs.org).

***

## 1. Environnements requis

### 1.1. Installations requises

1. Installer [Git](http://git-scm.com/)
2. Installer [Node JS](http://nodejs.org/)
3. Installer [Ruby](http://www.ruby-lang.org/fr/)
4. Installer [Compass](http://compass-style.org/install/)
5. Installer Yeoman et le générateur AngularJS

Installer Bower (il est préférable de s'assurer d'avoir une version récente)

	npm install -g bower

Installer Yeoman

	npm install -g yo
	
Installer le générateur "AngularJS" pour Yeoman 

	npm install -g generator-angular

[Pour en savoir plus](http://yeoman.io/)


### 1.2 Espace de travail

Créer un espace de travail. Pour simplifier la suite, celui-ci se situera ~/workspaces

## 2. Installation du projet

### 2.1. Récupérer les sources

En ligne de commande, se positionner au bon endroit

	cd ~/workspaces
	
Récupérer les sources du repository GitHub

	git clone https://github.com/aberthelot/cda-larochelle.git

### 2.2. Récupérer les dépendances

Se positioner dans le répertoire créé

	cd ~/workspaces/cda-larochelle

S'assurer d'être ok au niveau des dépendances Node.js et Yeoman

	sudo npm install
	bower install

### 2.3. Démarrer l'application

Dans une nouvelle fenêtre, se positioner dans le répertoire approprié

	cd ~/workspaces/cda-larochelle
	
Démarrer l'application

	grunt server


## 3. Installation Heroku

### 3.1. Installations requises

1. Installer [Utilitaires Heroku](https://toolbelt.heroku.com/)
2. Ajouter [Clé SSH Heroku](https://devcenter.heroku.com/articles/keys), il faut s'assurer d'avoir les droits sur l'instance de déploiement

### 3.2. Construction et déploiement

### 3.2.1 Sources Heroku

Dans le dossier dist doit se trouver les sources déployées sur Heroku. Si le dossier n'existe pas, il faut récupérer les sources.

Créer le dossier et récupérer les sources (si non présentes)
	
	git clone git@heroku.com:cda-larochelle.git dist

Construire l'application

	grunt build

Se positionner dans le dossier dist

	cd dist

Committer et pousser les modifications sur Heroku

	git commit …
	git push …