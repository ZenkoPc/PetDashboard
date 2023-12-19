import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getTheme, setTheme } from "./helpers/theme.ts";
import './i18n.ts'
import { getLanguage } from "./helpers/language.ts";
import i18n from 'i18next'

const client = new QueryClient()
const language = getLanguage()
const theme = getTheme()

if(theme === 'dark'){
  document.body.classList.add('dark')
  document.body.classList.remove('light')

  setTheme(theme)
}else{
  document.body.classList.remove('dark')
  document.body.classList.add('light')

  setTheme(theme)
}

i18n.changeLanguage(language)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
   <App />
  </QueryClientProvider>
)
