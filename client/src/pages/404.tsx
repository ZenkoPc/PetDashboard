import { Title, Text, Button } from "@tremor/react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export const NotFound = () => {

    const { t } = useTranslation()

    return (
        <main className="w-full h-screen flex flex-col justify-center items-center">
            <Title className="text-5xl">
                {t('404Title')}
            </Title>
            <Text className="capitalize text-center mt-8 text-xl">
                {t('404Message')}
            </Text>
            <div className="mx-auto flex justify-center mt-5">
                <Button>
                    <Link to={'/'}>
                        {t('404Action')}
                    </Link>
                </Button>
            </div>
        </main>
    )
}