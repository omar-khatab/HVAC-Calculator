import { RecommendationsTypes } from "@/app/Types/hvac"

type Props = {
    recommendationCard : RecommendationsTypes[]
}

export default function BTURecommendations({recommendationCard} : Props) {
    return (
        <div className="p-6 bg-white rounded-xl shadow-md">
            <span>Recommendations</span>
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
        </div>
    )
}
