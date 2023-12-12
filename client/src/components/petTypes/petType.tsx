import { BookOpenIcon, PaperAirplaneIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Button, Card, Flex, Text, TextInput, Title } from "@tremor/react"
import { useState } from "react"

interface Props{
    type: string
    close: () => void
    submit: (name: string) => void
    selected?: string
}

export const PetTypePop = ({ type, close, submit, selected }: Props) => {
    
    const [error, setError] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const name = e.currentTarget.typeName.value

        if(name?.length < 2){
            setError(true)
            return
        }

        submit(name)

    }

    return (
        <>
            <div className="w-full h-full fixed top-0 left-0 bg-black/50 flex justify-center items-center z-[20000]">
                <form onSubmit={handleSubmit} className="max-w-[360px] w-full">
                    <Card className="max-w-[400px]">
                        <Flex className="border-b pb-5">
                            <Title>
                                {type === 'create' ? 'Crear nuevo ' : 'Editar '} tipo de mascota
                            </Title>
                            <Button type="button" onClick={close} variant="light" color="gray" icon={XMarkIcon} />
                        </Flex>
                        <Flex flexDirection="col" className="mt-4" alignItems="start">
                            <Text>
                                Nombre: *
                            </Text>
                            <TextInput defaultValue={selected} error={error} onChange={() => setError(false)} icon={BookOpenIcon} name="typeName" placeholder="Perro" className="max-w-max" />
                        </Flex>
                        <Flex justifyContent="end" className="pt-4 mt-5 border-t">
                            <Button type="submit" iconPosition="right" icon={type === 'create' ? PaperAirplaneIcon : PencilIcon}>
                                {type === 'create' ? 'Crear' : 'Editar'}
                            </Button>
                        </Flex>
                    </Card>
                </form>
            </div>        
        </>
    )
}