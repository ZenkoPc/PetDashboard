import { Select, SelectItem } from "@tremor/react"
import { PetType } from "../../types/types"
import { useTranslation } from "react-i18next"

interface Props{
    data: PetType[] | undefined
    setLimit: (limit: number) => void
}

export const HeaderPagination = ({ data= [], setLimit }: Props) => {

    const { t } = useTranslation()

    return(
        <>
            <Select enableClear={false} disabled={data.length < 1} onValueChange={(e) => setLimit(parseInt(e))} defaultValue={'5'} className="max-w-max">
                <SelectItem value="5">{t('showResults')} 5</SelectItem>
                {data?.length >= 10 && <SelectItem value="10">{t('showResults')} 10</SelectItem>}
                {data?.length >= 15 && <SelectItem value="15">{t('showResults')} 15</SelectItem>}
                {data?.length >= 20 && <SelectItem value="20">{t('showResults')} 20</SelectItem>}
            </Select>
        </>
    )
}