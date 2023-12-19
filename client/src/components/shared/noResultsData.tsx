import { MagnifyingGlassMinusIcon } from "@heroicons/react/24/solid"
import { Icon, Text } from "@tremor/react"
import { useTranslation } from "react-i18next"

export const NoResultsData = () => {

    const { t } = useTranslation()

    return (
        <div className="h-80 text-center ml-10 md:ml-20 w-full flex flex-col justify-center items-center">
            <Icon icon={MagnifyingGlassMinusIcon} size={'xl'} />
            <Text>
                {t('noResultsData')}
            </Text>
        </div>
    )
}