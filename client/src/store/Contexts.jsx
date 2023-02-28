import React,{createContext,useState} from 'react'
import  {signInWithGoogle} from '../firebase/config'
export const firebaseContext = createContext()


function Contexts({children}) {
  return (
    <firebaseContext.Provider value={{signInWithGoogle}}>
        {children}
    </firebaseContext.Provider>
  )
}

export default Contexts
