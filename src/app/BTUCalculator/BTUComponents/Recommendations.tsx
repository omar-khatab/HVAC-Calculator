
type Props = {
    result : number,
}

export default function Recommendations({ result} : Props) {
    const recommendationCard : {id : number, 
    ton : string, 
    btu : string, 
    space : string, 
    status : boolean}[] = [
        {id : 1, ton: "< 1 ton" , btu : "< 12k BTU", space : "Small office / غرفة صغيرة", 
            status : result < 12000 },
        {id : 2, ton: "1 - 1.5 ton" , btu : "12k-18k BTU", space : "Bedroom / غرفة نوم", 
            status : result >= 12000 && result < 18000},
        {id : 3, ton: "1.5 - 2 ton" , btu : "18k-24k BTU", space : "Large bedroom / كبيرة", 
            status : result >= 18000 && result < 24000},
        {id : 4, ton: "2 - 2.5 ton" , btu : "24k-30k BTU", space : "Living room / صالة", 
            status : result >= 24000 && result < 30000},
        {id : 5, ton: "2.5 - 3.5 ton" , btu : "30k-42k BTU", space : "Open plan / مفتوحة", 
            status : result >= 30000 && result < 42000},
        {id : 6, ton: "3.5+ ton" , btu : "> 42k BTU", space : "Commercial / تجاري", 
            status : result >= 42000},
    ]
    return (
        <div className="p-6 bg-primary rounded-2xl lg:col-span-2">
            <div className="text-head  flex justify-between items-center pb-5 border-b border-surface">
                <span className="md:text-2xl">Recommendation • التوصية حسب الطن</span>
                <span className="bg-secondary p-2 rounded-2xl text-[14px]"> {recommendationCard.map((r) => {
                    return r.status ? r.ton : ""
                })} • ACTIVE</span>
            </div>
            <ul className="grid md:grid-cols-3 gap-3 py-4">
                {recommendationCard.map((r) => {
            return <li key={r.id} className={`list-none p-2 rounded-2xl
                    ${r.status ? "bg-secondary text-surface shadow-xl" : "bg-surface text-primary"}`}>
                    <div className="flex justify-between text-[16px]">
                        <span>{r.ton}</span>
                        <span className="p-1 bg-gray-200 text-black rounded-2xl text-[12px]">{r.btu}</span>
                    </div>
                    <p>{r.space}</p>
                </li>
            })}
            </ul>
            <div className="bg-amber-200 rounded-2xl px-4 py-2"><span className="text-xl font-bold">Recommended</span> : {recommendationCard.map((r) => {
                return r.status ? <span key={r.id} className="text-xl font-bold">{r.space}</span> : "" 
                })}
                <p>Calculated {result} BTU → {(result / 12000).toFixed(2)} Tons. For best efficiency, round up to next available unit size. 
                </p>
            </div>
        </div>
    )
}
