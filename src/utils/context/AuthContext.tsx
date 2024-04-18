import React, { createContext, useState, useEffect } from 'react'

// URL
import { URL } from '../constants/url'
import axios from 'axios'

// Créez un contexte d'authentification
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  // Etat pour suivre si l'authentification est en cours
  const [isLoading, setIsLoading] = useState(false) 

  // Etat pour stocker les informations de l'utilisateur connecté
  const [user,setUser] = useState(null)

  useEffect(() => {
    isLoggedIn()
  }, [])


  // Fonction pour gérer l'authentification de l'utilisateur
  const login = async (dataForm) => {
    // API    
    setIsLoading(true)
    try{
      const { data, status } = await axios.post(URL.USER_SIGN, dataForm)     
      console.log(data);
        
      if(status === 200){
        // Mettre à jours l'état du state (user) avec les données de l'utilisateur
        setUser(data)
        console.log(user);
        
        
        // Stockez les données de l'utilissateur dans le asynctorage
       localStorage.setItem('user', JSON.stringify(user))


        // Met isLoading à false apres une authentification réussie.
        setIsLoading(false)
      }
    }catch(e){
      console.log(e);
      setIsLoading(false)
    }
  }

  const isLoggedIn = async () => {
    setIsLoading(true)
    try{

      // Récupére les données de l'utilisateur depuis le stockage local.
      const userData = await localStorage.getItem('user')

      // Met à jour l'état de l'utilisateur avec les données récupérées.
      setUser(userData ? JSON.parse(userData) : null)

      setIsLoading(false)
    }catch(error) {
      console.log(error)
    }
  }

  const logout = () => {    
    setIsLoading(true)
    setUser(null) // Réinitialise l'état de l'utilisateur à null 
    
    localStorage.removeItem("user") // Supprime les informations de l'utilisateur du stockage local

    setIsLoading(false)
  }

  return (
    <AuthContext.Provider value={{ login, logout, user, isLoading }} >
      {children}
    </AuthContext.Provider>
  )
}