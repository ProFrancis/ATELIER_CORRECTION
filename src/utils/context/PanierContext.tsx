import React, { createContext, useState, useEffect } from 'react'
import { debounce } from 'lodash';

export const PanierContext = createContext()

export const PanierProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)

  const [panier, setPanier] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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

  useEffect(() => {
    let total = 0;
    panier.forEach(item => total += item.quantite * item.price) 
    setTotalPrice(parseFloat(total.toFixed(2)));
  }, [panier]);

  const savePanierToLocalStorage = debounce((nouveauPanier) => {
    localStorage.setItem('panier', JSON.stringify(nouveauPanier))
  }, 1000);  

  const totalArticle = () => {
    let totalAritcle = 0;
    panier.forEach(item => totalAritcle += item.quantite);
    return totalAritcle;
  }

  const priceArticleByQuantity = (price, quantity) => {
    const result = price * quantity
    return parseFloat(result.toFixed(2))
  }

  const incremente = (index) => {
    const nouveauPanier = [...panier]
    nouveauPanier[index].quantite++
    setPanier(nouveauPanier)
    savePanierToLocalStorage(nouveauPanier)
  }

  const decremente = (index) => {
    const nouveauPanier = [...panier]
    if(nouveauPanier[index].quantite > 1){
      nouveauPanier[index].quantite--
      setPanier(nouveauPanier)
      savePanierToLocalStorage(nouveauPanier)
    }
  }

  const removeArticle = (index) => {
    const nouveauPanier = [...panier]
    nouveauPanier.splice(index, 1)
    setPanier(nouveauPanier)
  }

  const addPanier = (product) => {
    try {
      // Recupérer le panier depuis le storage
      const panier = localStorage.getItem("panier");
      let nouveauPanier = [];
  
      if (panier !== null) {
        // Si le panier existe déjà dans le storage, on le converti en tableau d objet
        nouveauPanier = JSON.parse(panier);
        // Verifier si l 'article selectionné existe déjà dans le panier
        const articleFinded = nouveauPanier.find(item => item._id == product._id);
  
        // si l'article existe déjà, on augmente sa quantité de 1
        if (articleFinded) {
          articleFinded.quantite += 1;
        } else {
          // sinon on ajoute l article dans le panier
          nouveauPanier.push({ ...product, quantite: 1 });
        }
      } else {
        // sinon on ajoutremoveArticlee l article dans le panier
        nouveauPanier.push({ ...product, quantite: 1 });
      }
      // Enregistre le nouveau panier dans le storage grace a setItem
      savePanierToLocalStorage(nouveauPanier)
      setPanier(nouveauPanier);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PanierContext.Provider value={{ incremente , decremente, addPanier, priceArticleByQuantity, removeArticle, totalArticle,  panier, totalPrice }} >
      {children}
    </PanierContext.Provider>
  )
}
