---
title: "Modifier un produit"
sidebar_position: 2
---

## Objectif
En tant qu’admin, je veux pouvoir modifier un produit afin de mettre à jour ses informations pour la vente.

## Règles métier
- Le titre doit contenir plus de 2 caractères.
- Le prix doit être supérieur à 0.
- Le prix doit être inférieur à 10 000.

## Scénarios
1. **Modification réussie** :
   - Étant donné qu’un produit existe avec l’identifiant 2,
   - Quand je modifie le produit avec l’identifiant 2 avec en titre « switch 3 », description « nouvelle nouvelle console » et un prix à 5 000 €,
   - Alors le produit doit être modifié.
2. **Échec - titre trop court** :
   - Étant donné qu’un produit existe avec l’identifiant 2,
   - Quand je modifie le produit avec l’identifiant 2 avec en titre « sw »,
   - Alors une erreur « titre trop court » est retournée.
3. **Échec - prix négatif** :
   - Étant donné qu’un produit existe avec l’identifiant 2,
   - Quand je modifie le produit avec l’identifiant 2 avec un prix de -10,
   - Alors une erreur « le prix doit être supérieur à 0 » est retournée.
4. **Échec - prix trop élevé** :
   - Étant donné qu’un produit existe avec l’identifiant 2,
   - Quand je modifie le produit avec l’identifiant 2 avec un prix de 11 000,
   - Alors une erreur « le prix doit être inférieur à 10 000 » est retournée.
