const addPanier = async (product) => {
  try {
    // Recupérer le panier depuis le storage
    const panier = await AsyncStorage.getItem("panier");
    let nouveauPanier = [];

    if (panier !== null) {
      // Si le panier existe déjà dans le storage, on le converti en tableau d objet
      nouveauPanier = JSON.parse(panier);
      // Verifier si l 'article selectionné existe déjà dans le panier
      const articleFinded = nouveauPanier.find((item) => item._id === product._id);

      // si l'article existe déjà, on augmente sa quantité de 1
      if (articleFinded) {
        articleFinded.quantite += 1;
      } else {
        // sinon on ajoute l article dans le panier
        nouveauPanier.push({ ...product, quantite: 1 });
      }
    } else {
      // sinon on ajoute l article dans le panier
      nouveauPanier.push({ ...product, quantite: 1 });
    }
    // Enregistre le nouveau panier dans le storage grace a setItem
    await AsyncStorage.setItem('panier', JSON.stringify(nouveauPanier) )
  } catch (error) {
    console.log(error);
  }
};