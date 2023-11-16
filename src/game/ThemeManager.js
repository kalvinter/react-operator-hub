import { ThemeStorage } from './Storage'

export const themes = {
    'dark-theme': 'Dark',
    'light-theme': 'Light',
}

export const defaultTheme = themes.dark

export default class ThemeManager {
    constructor() {
        this.themeStorage = new ThemeStorage()

        this.activeTheme = this.themeStorage.load().theme
        this.setActiveTheme({ activeTheme: this.activeTheme })

        this.themeChangingEffectClass = 'theme-is-changing'
    }

    setThemeChangeEffect() {
        let node = document.querySelector('body')
        node.classList.add(this.themeChangingEffectClass)
    }

    setActiveTheme({ activeTheme }) {
        // console.log(activeTheme)
        let node = document.querySelector('body')
        node.classList.remove(this.activeTheme)

        this.activeTheme = activeTheme
        let themeData = this.themeStorage.load()
        themeData.theme = this.activeTheme
        this.themeStorage.save({ data: themeData })

        node.classList.add(this.activeTheme)
        node.classList.remove(this.themeChangingEffectClass)
    }

    getActiveTheme() {
        return this.activeTheme
    }
}
