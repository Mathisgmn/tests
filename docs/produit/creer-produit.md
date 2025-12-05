---
title: "Créer un produit"
sidebar_position: 1
---

## Objectif
En tant qu’admin, je veux pouvoir créer un produit afin de le mettre en vente.

## Règles métier
- Le titre doit contenir plus de 2 caractères.
- Le prix doit être supérieur à 0.
- Le prix doit être inférieur à 10 000.

## Scénarios
1. **Création réussie** :
   - Étant donné qu'il n'y a pas de produit enregistré,
   - Quand je crée un produit avec en titre « switch 2 », description « nouvelle console » et un prix à 500,
   - Alors le produit doit être créé.
2. **Échec - titre trop court** :
   - Étant donné qu'il n'y a pas de produit enregistré,
   - Quand je crée un produit avec en titre « sw »,
   - Alors une erreur « titre trop court » est retournée.
3. **Échec - prix négatif** :
   - Étant donné qu'il n'y a pas de produit enregistré,
   - Quand je crée un produit avec un prix de -10,
   - Alors une erreur « le prix doit être supérieur à 0 » est retournée.
4. **Échec - prix trop élevé** :
   - Étant donné qu'il n'y a pas de produit enregistré,
   - Quand je crée un produit avec un prix de 11 000,
   - Alors une erreur « le prix doit être inférieur à 10 000 » est retournée.
5. **Échec - sauvegarde impossible** :
   - Étant donné qu'il n'y a pas de produit enregistré,
   - Quand je crée un produit et que la sauvegarde échoue,
   - Alors une erreur « erreur lors de la création du produit » est retournée.
