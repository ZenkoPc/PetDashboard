export function getLanguage () {
    const themeStorage = window.localStorage.getItem('languageDashboard')

    if(themeStorage !== null){
        return themeStorage
    }

    return('es')
}

export function setLanguage (language :string) {
    window.localStorage.setItem('languageDashboard', language)
}