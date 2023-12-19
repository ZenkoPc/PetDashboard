export function getTheme () {
    const themeStorage = window.localStorage.getItem('themeDashboard')
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

    let theme = isDark ? 'dark' : 'light'

    if(themeStorage !== null){
    theme = themeStorage
    }

    return(theme)
}

export function setTheme (theme :string) {
    window.localStorage.setItem('themeDashboard',theme)
}