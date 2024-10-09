import { getPrices } from "@/actions";
import Range from "@/components/Range";

export default async function Exercise1() {
    const prices = await getPrices()

    return (
        <div className="flex flex-col gap-8 py-4 px-8">
            <h3 className="text-2xl underline">Exercise 1</h3>
            <div className="space-y-1">
                <p> data from api:</p>
                <p className="pl-4">min -&gt; {prices.min}</p>
                <p className="pl-4">max -&gt; {prices.max}</p>
            </div>
            <div>
                <Range isArrayMode={false} min={prices.min} max={prices.max} />
            </div>
        </div>
    )
}