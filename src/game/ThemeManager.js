
import { PreferencesStorage } from "./Storage"

export const themes = {
    "dark-theme": "Dark",
    "light-theme": "Light",
}

export const defaultTheme = themes.dark

export default class ThemeManager {
    constructor(){
        this.preferencesStorage = new PreferencesStorage()

        this.activeTheme = this.preferencesStorage.load().theme
        this.setActiveTheme({activeTheme: this.activeTheme})
    }

    setActiveTheme({activeTheme}){
        console.log(activeTheme)
        let node = document.querySelector("body")
        node.classList.remove(this.activeTheme)

        this.activeTheme = activeTheme

        this.preferencesStorage.save({theme: this.activeTheme})

        node.classList.add(this.activeTheme)
    }

    getActiveTheme(){
        return this.activeTheme
    }
}
