
export const themes = {
    "dark-theme": "Dark",
    "light-theme": "Light",
}

export const defaultTheme = themes.dark

export default class ThemeManager {
    constructor({preferencesStorage}){
        this.preferencesStorage = preferencesStorage

        this.activeTheme = this.preferencesStorage.load().theme
        this.setActiveTheme({activeTheme: this.activeTheme})

        this.themeChangingEffectClass = "theme-is-changing"
    }

    setThemeChangeEffect(){
        let node = document.querySelector("body")
        node.classList.add(this.themeChangingEffectClass)
    }

    setActiveTheme({activeTheme}){
        console.log(activeTheme)
        let node = document.querySelector("body")
        node.classList.remove(this.activeTheme)

        this.activeTheme = activeTheme
        let preferencesData = this.preferencesStorage.load()
        preferencesData.theme = this.activeTheme
        this.preferencesStorage.save({data: preferencesData})

        node.classList.add(this.activeTheme)
        node.classList.remove(this.themeChangingEffectClass)
    }

    getActiveTheme(){
        return this.activeTheme
    }
}
