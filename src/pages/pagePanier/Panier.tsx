import React, { useState, useEffect, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// CONTEXTE
import { PanierContext } from '../../utils/context/PanierContext';
import { StripeContext } from '../../utils/context/StripeContext';

const Panier = () => {
  const { incremente, decremente, panier, priceArticleByQuantity, totalPrice, removeArticle, totalArticle } = useContext(PanierContext);
  const { createPaymentIntent, createPaymentMethod, confirmPayment } = useContext(StripeContext);
  
  const stripe = useStripe();
  const elements = useElements();

  const handleCheckout = async () => {
    // 1. Créer une intention de paiement avec le total du panier
    const paymentIntent = await createPaymentIntent(totalPrice);
    console.log(paymentIntent);
    
    const cardElement = elements.getElement(CardElement);
    console.log("CardElement => ", CardElement);
    
    if (!paymentIntent || !paymentIntent.client_secret) {
      console.error('Failed to create payment intent');
      return;
    }
  
    // 2. Créer une méthode de paiement avec les informations de la carte de l'utilisateur
    // Note : Vous devez passer l'élément CardElement de stripe à cette fonction
    const paymentMethod = await createPaymentMethod(cardElement);
    console.log("PAYMENTMETHOD =>", paymentMethod);
    
    if (!paymentMethod) {
      console.error('Failed to create payment method');
      return;
    }
  
    // 3. Confirmer le paiement avec l'intention de paiement et la méthode de paiement
    const confirmedPayment = await confirmPayment(paymentIntent.id, paymentMethod.id);
    console.log("CONFIRMEDPAYMENT =>", confirmedPayment);

    if (confirmedPayment) {
      console.log('Payment confirmed!');
      // Effectuez ici les actions supplémentaires nécessaires après la confirmation du paiement,
      // comme vider le panier ou rediriger l'utilisateur vers une autre page.
    } else {
      console.error('Payment failed');
    }
  };
  
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
          <button onClick={handleCheckout}>Passer la commande ({totalArticle()} articles)</button>
        </div>
      </>
       : 
        <p>Panier Vide ! </p>
      }
    </section>
  );
};

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
};

export default Panier;
