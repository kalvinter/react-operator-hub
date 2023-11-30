import { ThemeStorage } from './Storage'

export const darkTheme = {
    key: "dark-theme",
    label: "Dark"
}

export const lightTheme = {
    key: "light-theme",
    label: "Light"
}

export const themes = [
    darkTheme,
    lightTheme
]

export default class ThemeManager {
    constructor() {
        this.themeStorage = new ThemeStorage()

        this.activeTheme = this.themeStorage.load().theme
        console.log("this.activeTheme post setting active theme in consturctor, ", this.activeTheme)

        this.themeChangingEffectClass = 'theme-is-changing'
    }

    setThemeChangeEffect() {
        let node = document.querySelector('body')
        node.classList.add(this.themeChangingEffectClass)
    }

    removeThemeChangeEffect() {
        let node = document.querySelector('body')
        node.classList.remove(this.themeChangingEffectClass)
    }

    setActiveTheme({ activeTheme }) {
        // console.log(activeTheme)
        console.log("setting active theme")
        
        console.log("this.activeTheme, ", this.activeTheme)
        let node = document.querySelector('body')
        node.classList.remove(this.activeTheme)

        this.activeTheme = activeTheme
        let themeData = this.themeStorage.load()
        themeData.theme = this.activeTheme
        this.themeStorage.save({ data: themeData })

        node.classList.add(this.activeTheme)
        this.removeThemeChangeEffect()
    }

    getActiveTheme() {
        return this.activeTheme
    }
}
