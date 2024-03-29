import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import i18nBackend from 'i18next-http-backend'

const getCurrentHost = import.meta.env.MODE === 'development' ? 'http://localhost:5173' : 'Link to prod'

i18n
    .use(i18nBackend)
    .use(initReactI18next)
    .init({
        lng: 'es',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        },
        backend: {
            loadPath: `${getCurrentHost}/i18n/{{lng}}.json`
        }
    })

export default i18n