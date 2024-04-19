import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

// Importation des actions de Redux
import * as ACTIONS from "../../redux/reducers/article.reducer"

// Importation des services
import { get_all_articles } from '../../utils/services/selectors/article.selector'

// URLS
import { URL } from '../../utils/constants/url'

const AdminArticle = () => {
  // Utilisation du hook useDispatch pour gérer les actions de Redux
  const dispatch = useDispatch();

    // Utilisation du hook useSelector pour sélectionner une partie de l'état de Redux
    const store = useSelector((state) => get_all_articles(state))

      // Utilisation du hook useEffect pour gérer les effets de bord
  useEffect(() => {
    // Dispatch de l'action de démarrage de la récupération des données
    dispatch(ACTIONS.FETCH_ARTICLE_START());

    // Fonction asynchrone pour récupérer les données des sneakers
    const fetchArticles = async (): Promise<void> => {
      try{
        // On récupère les articles de notre API 
        const { data, status } = await axios.get(URL.GET_ALL_ARTICLES)
        
        // Dispatch l'action de succès envoyant les donées
        if(status === 200) dispatch(ACTIONS.FETCH_ARTICLE_SUCCES(data))
      }catch(e){
        // Affichage de l'erreur en console
        console.log(e);
        // Dispatch de l'action d'échec de la récupération des données
        dispatch(ACTIONS.FETCH_ARTICLE_FAILURE())
      }
    }
    // Appel de la fonction pour récupérer les données
    fetchArticles()
  }, [])

  return (
    <div>
 <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Brand</th>
          <th>Category</th>
          <th>Content</th>
          <th>Online</th>
          <th>Picture</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {store?.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.brand}</td>
            <td>{item.category === "f" ? "Femme" : "Homme"}</td>
            <td>{item.content.substr(0, 50)}...</td>
            <td>{item.online ? 'Yes' : 'No'}</td>
            <td><img src={item.picture[0].img} width={70} /></td>
            <td>
              <Link to={`/admin/detail/article/${item._id}`}>Detail</Link>
              <Link to={`/admin/update/article/${item._id}`}>Update</Link>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default AdminArticle