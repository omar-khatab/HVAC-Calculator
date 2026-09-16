import { RecommendationsTypes } from "@/app/Types/hvac"

type Props = {
    recommendationCard : RecommendationsTypes[],
    result : number,
}

export default function BTURecommendations({recommendationCard, result} : Props) {
    return (
        <div className="p-6 bg-white rounded-xl shadow-md">
            <div>
                <span>Recommendation • التوصية حسب الطن</span>
                <span> {recommendationCard.map((r) => {
                    return r.status ? r.ton : ""
                })} • ACTIVE</span>
            </div>
            <ul className="flex gap-1">
                {recommendationCard.map((r) => {
            return <li key={r.id} className={`list-none p-2 rounded-xl 
                    ${r.status ? "bg-gray-900 text-gray-200 shadow-xl scale-105" : "bg-gray-200 text-gray-900"}`}>
                    <span>{r.ton}</span>
                    <span>{r.btu}</span>
                    <p>{r.space}</p>
                </li>
            })}
            </ul>
            <div className="bg-amber-200">Recommended : {recommendationCard.map((r) => {
                return r.status ? r.space : "" 
                })}
                <p>{result.toFixed(0)} BTU</p>
            </div>
        </div>
    )
}
