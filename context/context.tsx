import { createContext, useState } from 'react'

export const NavigationData = createContext(null)

function Context({ children }) {
  const [navigation, setNavigation] = useState()

  return (
    <NavigationData.Provider value={{ navigation, setNavigation }}>
      {children}
    </NavigationData.Provider>
  )
}

export default Context
