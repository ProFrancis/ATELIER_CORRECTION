import React, {useState, useEffect, useContext} from 'react'

// CONTEXTE
import { PanierContext } from '../../utils/context/PanierContext';

const Panier = () => {
  const { incremente , decremente, panier, priceArticleByQuantity, totalPrice,removeArticle, totalArticle } = useContext(PanierContext)
  
  return (
    <section > 
      {panier ? 
      <>
        <div style={styles.root}>
          {panier.map((article, index) => (
            <div key={index}>
              <p style={styles.title}>{article.name}</p>
              <img
                style={{ width: 170}}
                src={article.picture[0].img}
              />
              <p>Prix : {priceArticleByQuantity(article.price, article.quantite)} $</p>
              <div style={styles.quantity}>
                <p style={styles.click} onClick={() => decremente(index)}>-</p>
                <p>{article.quantite}</p>
                <p style={styles.click} onClick={() => incremente(index)} >+</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <p>Total du panier : {totalPrice}</p>
          <button>Passer la commande ({totalArticle()} articles)</button>
        </div>
      </>
       : 
        <p>Panier Vide ! </p>
      }
    </section>
  )
}
const styles = {
  root: {
    display: 'flex',
  },
  quantity: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: '0.7em'
  },
  click: {
    cursor: 'pointer',
  }
}

export default Panier