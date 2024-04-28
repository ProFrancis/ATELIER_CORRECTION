import React, { createContext, useState, useEffect } from 'react'

export const PanierContext = createContext()

export const PanierProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false) 

  const [panier, setPanier] = useState();

  useEffect(() => {
    const loadPanier = async () => {
      try {
        const panierJSON = await localStorage.getItem("panier");
        if (panierJSON !== null) {
          const panierStorage = JSON.parse(panierJSON);
          setPanier(panierStorage);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadPanier();
  }, []);

  const incremente = (index) => {
    const nouveauPanier = [...panier]
    nouveauPanier[index].quantite++
    setPanier(nouveauPanier)
  }

  const decremente = (index) => {
    const nouveauPanier = [...panier]
    if(nouveauPanier[index].quantite > 1){
      nouveauPanier[index].quantite--
      setPanier(nouveauPanier)
    }
  }

  const addPanier = async (product) => {
    try {
      // Recupérer le panier depuis le storage
      const panier = await localStorage.getItem("panier");
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
      await localStorage.setItem('panier', JSON.stringify(nouveauPanier) )
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PanierContext.Provider value={{ incremente , decremente, addPanier }} >
      {children}
    </PanierContext.Provider>
  )
}