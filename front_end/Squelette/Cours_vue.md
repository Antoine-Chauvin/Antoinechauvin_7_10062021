# Cours VueJs 

- views = les pages que je souhaite crée pour mon site qui seront l'accueil de plusieur components, dans mon cas je dois crée :
- 
    -  [ ] Connexion.vue
    -  [ ] All.vue 
    -  [ ] Chanel.vue
    -  [ ] Profil.vue
    -  [ ] modif_profil.vue
    -  [ ] modif_status.vue
  

- components = ça va être l'endroit ou je vais stocké tout le code (html css Js) de mes diff composant tel que je souhaite leur composition et éléments rémanent 
- 
    - [ ] La bannière du site
    - [ ] le formulaire du signup
    - [ ] le formulaire de connexion
    - [ ] le formulaire de création du status
    - [ ] le formulaire de modif du profil
    - [ ] le formulaire de modif du status
    - [ ] la list des chanel
    - [ ] la liste des status
    - [ ] la compositions des différents composant des status 
        - [ ] vote
        - [ ] comment
        - [ ] text 
        - [ ] img shared
        - [ ] affiche de du profil créateur
    -[ ] Menu burger pour la navigation sur smartphone

- Router met le bon composant au bon endroit, ceux qui viennet de la composition depuis /views pas /components 
      Pour cela on va chercher notre fichier .vue de /views on lui donne un path un nom et on ref un component à la variable lié au chemin de notre fichier

      si non pour les composant qui ne sont pas à charger direct on peut passer par un fonction anonyme pour optimiser le chargement de ///views.  

      Toutes les pages crée dans /views devront être intégré index.js de /router 