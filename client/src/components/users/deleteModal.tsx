import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { Button, Card, Text, Title } from "@tremor/react"
import { useTranslation } from "react-i18next"

export const DeleteModal = ({ handleDelete, visible }:{ handleDelete: () => void, visible: () => void }) => {

    const { t } = useTranslation()

    return (
        <>
            <div className="w-full h-full z-[10002] fixed top-0 left-0 flex justify-center items-center bg-black/80">
                <Card className="max-w-[500px] text-center relative">
                    <div className="absolute top-5 right-5 z-[10001]">
                        <Button onClick={visible} color="neutral" variant="light" icon={XMarkIcon} className="p-0">
                        </Button>
                    </div>
                    <ExclamationCircleIcon color="red" className="w-[200px] mx-auto" />
                    <Title className="text-xl capitalize">
                        {t('usersDelete')}
                    </Title>
                    <Text color="red" className="capitalize">
                        {t('usersDeleteDesc')}
                    </Text>
                    <Button onClick={handleDelete} variant="secondary" color="red" className="mt-4 capitalize">
                        {t('usersDeleteAction')}
                    </Button>
                </Card>
            </div>
        </>
    )
}