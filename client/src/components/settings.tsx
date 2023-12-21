import { Title, Flex, Text, Button, Select, SelectItem } from "@tremor/react"
import { LogoDashboard } from "./logoDashboard"
import { getTheme, setTheme } from "../helpers/theme"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { setLanguage } from "../helpers/language"

export const Settings = () => {

    const actualTheme = getTheme()
    const [theme, setActualTheme] = useState(actualTheme)
    const { i18n, t } = useTranslation()

    const toggleTheme = (themeSelected: string) => {
        setActualTheme(themeSelected)
    }

    if(theme === 'dark'){
        document.body.classList.add('dark')
        document.body.classList.remove('light')

        setTheme(theme)
    }else{
        document.body.classList.remove('dark')
        document.body.classList.add('light')

        setTheme(theme)
    }

    const handleChange =  (value: string) => {
        i18n.changeLanguage(value)
        setLanguage(value)
    }

    return (
        <main className="flex [&>div]:px-5 flex-col w-full h-screen justify-start items-start">
            <LogoDashboard />
            <div className="w-full mt-5">
                <Title>
                    {t('settings')}
                </Title>
                <Text className="mb-5">
                    {t('settingsDesc')}
                </Text>
                <Flex alignItems="start" className="border-t flex-col gap-5 py-5 w-full text-xl">
                    <Title>
                        {t('settingsTheme')}
                    </Title>
                    <Flex justifyContent="start" className="gap-4">
                        <Button onClick={() => toggleTheme(theme === 'dark' ? 'light' : 'dark')} type="button" variant="secondary">
                            {
                                theme === 'dark' ?  `${t('settingsThemeChangeLight')}` :  `${t('settingsThemeChangeDark')}`
                            }
                        </Button>
                    </Flex>
                </Flex>
                <Flex alignItems="start" className="border-t flex-col gap-5 py-5 w-full text-xl">
                    <Title>
                       {t('settingsChangeLanguage')}:
                    </Title>
                    <Flex justifyContent="start" className="gap-4">
                        <Select onValueChange={(e) => handleChange(e)} defaultValue="" enableClear={false} className="max-w-[300px]">
                            <SelectItem value="en">
                                {t('language')}
                            </SelectItem>
                            <SelectItem value="es">
                                {t('language2')}
                            </SelectItem>
                        </Select>
                    </Flex>
                </Flex>
            </div>
        </main>
    )
}