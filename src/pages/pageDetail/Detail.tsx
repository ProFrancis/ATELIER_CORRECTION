import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

// CONTEXTE
import { PanierContext } from '../../utils/context/PanierContext';

// Importation des actions de Redux
import * as ACTIONS from "../../redux/reducers/article.reducer"

// Importation des services
import { find_article } from '../../utils/services/selectors/article.selector'

// URLS
import { URL } from '../../utils/constants/url'

const Detail = () => {
  const { addPanier } = useContext(PanierContext)
  
  const dispatch = useDispatch();
    const { id } = useParams<{id: string}>();

    const article = useSelector((state) => find_article(state))
  
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

  return (
    <div>
      {article && article.picture &&
        <section className='bloc__detail'>
          <div>
            <img
              src={article.picture[0].img}
              width={400}
            />
            <div>
              <img
                src={article.picture[0].img1 && article.picture[0].img1}
                width={100}
              />
              <img
                src={article.picture[0].img2 && article.picture[0].img2}
                width={100}
              />
              <img
                src={article.picture[0].img3 && article.picture[0].img3}
                width={100}
              />
              <img
                src={article.picture[0].img4 && article.picture[0].img4}
                width={100}
              />
            </div>
          </div>
         <div>
          <h2>{article.name}</h2>
          <p>{article.content}</p>
          <p>{article.price} €</p>
          <p onClick={() => addPanier(article)}>AJOUTER</p>
         </div>
        </section>
      }
    </div>
  )
}

export default Detail