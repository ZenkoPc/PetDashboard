import { Title, Text, Button } from "@tremor/react"
import { Link } from "react-router-dom"

export const NotFound = () => {
    return (
        <main className="w-full h-screen flex flex-col justify-center items-center">
            <Title className="text-5xl">
                Oops something went wrong
            </Title>
            <Text className="capitalize text-center mt-8 text-xl">
                page not found, go back to the index
            </Text>
            <div className="mx-auto flex justify-center mt-5">
                <Button>
                    <Link to={'/'}>
                        Go back
                    </Link>
                </Button>
            </div>
        </main>
    )
}