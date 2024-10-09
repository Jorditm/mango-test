import { getArrayPrices } from "@/actions";
import Range from "@/components/Range";

export default async function Exercise1() {
    const data = await getArrayPrices();
    const { rangeValues } = data

    return (
        <div className="flex flex-col gap-8 py-4 px-8">

            <h3 className="text-2xl underline">Exercise 2</h3>
            <div className="space-y-4">
                <p> data from api:</p>
                <p className="flex flex-row gap-3 pl-4">{rangeValues?.map((scale: number) => {
                    return (<span key={scale}>{scale}€</span>)
                })}
                </p>

            </div>
            <div>
                <Range isArrayMode={true} rangeValues={rangeValues} />
            </div>
        </div>
    )
}