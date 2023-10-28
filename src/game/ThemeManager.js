
export const themes = {
    "dark-theme": "Dark",
    "light-theme": "Light",
}

export const defaultTheme = themes.dark

export default class ThemeManager {
    constructor({activeTheme}){
        this.activeTheme = activeTheme || themes.dark
        this.setActiveTheme({activeTheme: this.activeTheme})
    }

    setActiveTheme({activeTheme}){
        console.log(activeTheme)
        let node = document.querySelector("body")
        node.classList.remove(this.activeTheme)

        this.activeTheme = activeTheme

        node.classList.add(this.activeTheme)
    }

    getActiveTheme(){
        return this.activeTheme
    }
}
