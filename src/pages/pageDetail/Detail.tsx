import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

// Importation des actions de Redux
import * as ACTIONS from "../../redux/reducers/article.reducer"

// Importation des services
import { find_article } from '../../utils/services/selectors/article.selector'

// URLS
import { URL } from '../../utils/constants/url'

const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams<{id: string}>();

    const store = useSelector((state) => find_article(state))
  
    useEffect(() => {
      dispatch(ACTIONS.FETCH_ARTICLE_START());
        const fetchArticles = async (): Promise<void> => {
        try{
         const { data, status } = await axios.get(URL.GET_ONE_ARTICLE)         
         if(status === 200) dispatch(ACTIONS.FETCH_ARTICLE_SUCCES_DETAIL({data, id}))
       }catch(e){
         console.log(e);
         dispatch(ACTIONS.FETCH_ARTICLE_FAILURE())
       }
     }
     fetchArticles()
   }, [])

  const addPanier = () => {
    console.log("test");
    
  }

  return (
    <div>
      {store && store.picture &&
        <section className='bloc__detail'>
          <div>
            <img
              src={store.picture[0].img}
              width={400}
            />
            <div>
              <img
                src={store.picture[0].img1 && store.picture[0].img1}
                width={100}
              />
              <img
                src={store.picture[0].img2 && store.picture[0].img2}
                width={100}
              />
              <img
                src={store.picture[0].img3 && store.picture[0].img3}
                width={100}
              />
              <img
                src={store.picture[0].img4 && store.picture[0].img4}
                width={100}
              />
            </div>
          </div>
         <div>
          <h2>{store.name}</h2>
          <p>{store.content}</p>
          <p>{store.price} €</p>
          <p onClick={addPanier}>AJOUTER</p>
         </div>
        </section>
      }
    </div>
  )
}

export default Detail