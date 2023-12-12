import { MagnifyingGlassMinusIcon } from "@heroicons/react/24/solid"
import { Icon, Text } from "@tremor/react"

export const NoResultsData = () => {
    return (
        <div className="h-80 text-center ml-10 md:ml-20 w-full flex flex-col justify-center items-center">
            <Icon icon={MagnifyingGlassMinusIcon} size={'xl'} />
            <Text>
                No se han encontrado resultados para tu busqueda
            </Text>
        </div>
    )
}