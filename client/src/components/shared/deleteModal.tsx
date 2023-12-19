import { XMarkIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid"
import { Title, Card, Button, Text } from "@tremor/react"
import { useTranslation } from "react-i18next"

interface Props{
    handleDelete: (id: string) => void
    close: () => void
    title: string
    id: string
}

export const DeleteModal = ({ title, handleDelete, close, id }: Props) => {
    
    const { t } = useTranslation()

    return(
        <>
             <div className="w-full h-full z-[10002] fixed top-0 left-0 flex justify-center items-center bg-black/80">
                <Card className="animate-fade-up max-w-[500px] text-center relative">
                    <div className="absolute top-5 right-5 z-[10001]">
                        <Button onClick={close} color="neutral" variant="light" icon={XMarkIcon} className="p-0">
                        </Button>
                    </div>
                    <ExclamationCircleIcon color="red" className="w-[200px] mx-auto" />
                    <Title className="text-xl">
                        {title}
                    </Title>
                    <Text color="red">
                        {t('deleteModalMessage')}
                    </Text>
                    <Button onClick={() => handleDelete(id)} variant="secondary" color="red" className="mt-4 capitalize">
                        {t('deleteModalAction')}
                    </Button>
                </Card>
            </div>
        </>
    )
}