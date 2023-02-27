'use client'

import {
   createContext,
   Dispatch,
   ReactNode,
   useContext,
   useMemo,
   useReducer,
} from 'react'
import themeReducer, { Mode, ThemeAction } from '../reducers/themeReducer'

type ThemeContextType = {
   state: {
      mode: Mode
   }
   dispatch: Dispatch<ThemeAction>
}

const ThemeContext = createContext<ThemeContextType>({
   state: { mode: 'dark' },
   dispatch: () => ({
      mode: 'dark',
   }),
})

export const useThemeContext = () => {
   const context = useContext(ThemeContext)

   if (!context) {
      throw new Error('Use ThemeContext inside ThemeContextProvider!')
   }

   return context
}

export function ThemeContextProvider({ children }: { children: ReactNode }) {
   const [state, dispatch] = useReducer(themeReducer, { mode: 'dark' })

   const value = useMemo(() => ({ state, dispatch }), [state])

   return (
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
   )
}
