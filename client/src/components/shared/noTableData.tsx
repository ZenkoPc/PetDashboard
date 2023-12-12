import { Text } from "@tremor/react"

export const NoTableData = () => {
    return(
        <>
            <div className="h-[300px] relative flex justify-center items-center"></div>
            <div className="absolute top-0 left-0 w-full h-full flex justify-center flex-col gap-2 items-center">
                <img src={'/nodata.svg'}  width={80} alt="no data icon" />
                <Text className="text-[16px]">
                    No hay informacion para mostrar
                </Text>
            </div>  
        </>
    )
}