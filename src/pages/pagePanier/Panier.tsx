import React, {useState, useEffect} from 'react'

const Panier = () => {
  const [panier, setPanier] = useState();

  // Récupére le panier dans le storage
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


  return (
    <div> 
      {panier ? 
      <>
          {panier.map((article, index) => (
            <div key={index}>
              <h2>{article.name}</h2>
              <img
                style={{ width: 150, height: 200 }}
                src={article.picture[0].img}
              />
              <p>Prix : {article.price} $</p>
              <p onClick={() => decremente(index)}>-</p>
              <p>{article.quantite}</p>
              <p onClick={() => incremente(index)} >+</p>
            </div>
          ))}
        </>
       : 
        <p>Panier Vide ! </p>
      }
    </div>
  )
}

export default Panier