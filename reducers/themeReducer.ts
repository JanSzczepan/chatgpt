'use client'

export enum ThemeActionType {
   LIGHT = 'light',
   DARK = 'dark',
}

export type Mode = 'light' | 'dark'

type ThemeState = {
   mode: Mode
}

export type ThemeAction = {
   type: ThemeActionType
   payload: Mode
}

export default function themeReducer(
   state: ThemeState,
   action: ThemeAction
): ThemeState {
   switch (action.type) {
      case ThemeActionType.LIGHT:
         return { mode: 'light' }
      case ThemeActionType.DARK:
         return { mode: 'dark' }
      default:
         return state
   }
}
