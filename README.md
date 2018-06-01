
LA BOUFFE

## Documentation
See documentation [here](labouffe.pdf)

## Etapes proposées :

1. Enoncer la/les problèmatique(s) auxquelles on veut répondre
2. Proposer des solutions. Découper les uses cases (workflow users)
3. Faire une maquette dessinnée
4. Test d'API (API mockée)
5. API JS
6. Maquette front (sur API mockée)

7. Spécification d'une implémentation back : pour apporter quoi (persistence, broadcast events)
8. API back
9. Impléméntation back


## Problèmes :
- Quels sont les resto ouverts au jour J
- Qui propose de manger où
- Difficulté de prévenir tout le monde pour une proposition
- Il faut partir parfois à un resto avant un heure H

## Specification :

- appli web sur navigateur (responsive)
- afficher une page en temps réel avec les restos enregistrés par les users, avec les votes associés
- on peut ajouter un resto (nom, description)
- on peut voter pour un resto
- on peut annuler son vote
- chaque jour reset tous les votes

## Backlog :


- moment ou il faut partir au resto (pour qu'il soit ouvert ou qu'il reste des plats)
- afficher une carte
- (géolocaliser les utilisateurs)
- connexion LDAP entreprise
- appli mobile
- machine learning : proposition de restaurant personalisée