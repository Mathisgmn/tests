/**
 * Sidebar configuration for the Docusaurus documentation.
 * Docs are organized by domain to mirror the main user stories.
 */

module.exports = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Produit',
      collapsed: false,
      items: [
        'produit/creer-produit',
        'produit/modifier-produit',
      ],
    },
    {
      type: 'category',
      label: 'Commande',
      collapsed: false,
      items: ['commande/ajouter-produit'],
    },
  ],
};
