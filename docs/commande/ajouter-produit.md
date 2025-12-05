---
title: "Ajouter un produit à une commande"
sidebar_position: 1
---

## Objectif
En tant qu’utilisateur, je veux pouvoir ajouter un produit à une commande afin de commander le produit.

## Règles métier
- Si un produit existe déjà dans la commande, la quantité est augmentée.
- Si le produit n'existe pas dans la commande, il est ajouté avec une quantité de 1.
- L'utilisateur doit envoyer l'identifiant du produit et la quantité.
- Maximum 5 produits différents par commande.
- Montant total maximum de 2 000 € par commande.

## Scénarios
1. **Ajout réussi - nouveau produit** :
   - Étant donné qu'une commande existe avec l'identifiant 1 et qu'elle ne contient pas le produit avec l'identifiant 2,
   - Quand j'ajoute le produit avec l'identifiant 2 à la commande avec l'identifiant 1 avec une quantité de 1,
   - Alors le produit avec l'identifiant 2 est ajouté à la commande avec une quantité de 1.
2. **Ajout réussi - produit existant** :
   - Étant donné qu'une commande existe avec l'identifiant 1 et qu'elle contient déjà le produit avec l'identifiant 2 avec une quantité de 2,
   - Quand j'ajoute le produit avec l'identifiant 2 à la commande avec l'identifiant 1 avec une quantité de 1,
   - Alors la quantité du produit avec l'identifiant 2 dans la commande est mise à jour à 3.
3. **Échec - nombre maximum de produits** :
   - Étant donné qu'une commande existe avec l'identifiant 1 et qu'elle contient déjà 5 produits différents,
   - Quand j'ajoute un nouveau produit à la commande avec l'identifiant 1,
   - Alors une erreur « nombre maximum de produits atteint » est retournée.
4. **Échec - montant maximum dépassé** :
   - Étant donné qu'une commande existe avec l'identifiant 1 et que son montant total est de 1 900 €,
   - Quand j'ajoute un produit d'une valeur de 200 € à la commande avec l'identifiant 1,
   - Alors une erreur « montant maximum de la commande dépassé » est retournée.
