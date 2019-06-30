# Orga-4.8-D-veloppement-Web-

Pour pouvoir utiliser le code:

1) Ouvrir un terminal dans le dossier dans lequel vous souhaitez travailler
2) Créer un nouveau projet avec "meteor create Orga"
3) Se déplacer dans le projet avec "cd Orga"
4) Supprimer les dossiers Client et Server du nouveau projet puis les remplacer par ceux disponible dans ce repository 

Pour le modifier:

1) Appuyer sur Upload files
2) Aller dans le dossier Orga de votre ordinateur
3) Prendre "client" et "server" à l'aide de ctrl puis les faire glisser au niveau du "Drag files here"
4) Appuyer sur "Commit changes" en bas de la page
	


## Mise en place Github
1. Obtention du dossier sur votre compte et machine
Obtenir une copie du projet sur votre compte github : `fork`.
Pour créer une copie locale du projet git sur votre ordinateur :
```bash
$ git clone https://github.com/An-ri/Orga-4.8-D-veloppement-Web-/blob/master/README.md
```

2. Dès que vous modifiez un élément de votre dossier git, une `working copy` est créée. 
Visualisation du statut du dossier git :
```bash
$ git status
```
Ajout à la pile de `commit` 
```bash
$ git add nomDuFichier
```
Puis `commit` pour modifier les fichiers locaux :
```bash
$ git commit -m 'Message du commit'
```
La modification n'opère que sur votre copie locale, ni la copie virtuelle GitHub de votre compte ni celle du compte d'où provient le `fork` a été modifié.

Pour modifier votre copie virtuelle :
```bash
$ git push
```
Pour proposer votre modification au dossier GitHub original, il faut effectuer une pull request, directement sur github via le bouton : `New pull request`

3. Maintenant, pour mettre à jour votre copie virtuelle et locale en cas de modification du dossier initial (celui que vous avez `fork`) il faut utiliser un `remote`. Le `remote` est un pointeur vers un le dossier git voulu :
Mise en place du `remote` appelé `upstream` par convention :
```bash
$ git remote add upstream https://github.com/An-ri/Orga-4.8-D-veloppement-Web-/blob/master/README.md
```
Mise à jour de votre dossier local et virtuel :
```bash
$ git fetch upstream
$ git checkout master
$ git merge upstream/master
```
