import { Cuboid } from "lucide-react";
import {getSuggestions} from "@/app/libs/ductSuggestions"

type Props = {
  result: number // Result from duct area calculation in ft²
}

export default function Recommendations({result}: Props) {
  // Get best 4 rectangular suggestions
  const finalSuggestions = getSuggestions(result)

  return (
    <div className="p-5 bg-primary rounded-2xl lg:col-span-2 lg:row-span-2 text-head h-fit">
          {/* Section title */}
          <h2 className="md:text-xl font-bold text- mb-3 flex item-center gap-1">
            <Cuboid size={25} strokeWidth={1.5} />
            Suggested Rectangular Sizes
          </h2>

      {/* Render suggestion list */}
      {finalSuggestions.map((s, i) => {
        // First item is the most optimal (closest to square)
        const isBest = i === 0
        return (
          <div key={`${s.width}x${s.height}`} className=" last:pb-0 py-3 border-t border-border hover:opacity-80 transition flex items-center gap-3">
            {/* Rank badge */}
            <h3 className={`${isBest? "bg-white text-primary" : "border"} md:h-[40] md:w-[40] h-[30] w-[30] md:text-xl text- rounded-full
                flex items-center
            justify-center`}>{i+1}</h3>

            {/* Size details */}
            <div className="flex-1">
              <div className="font-bold md:text- text-">
                {/* Imperial and metric display */}
                <span>{`${s.width}" x ${s.height}"`} / </span>
                <span>{`${(s.width * 25.4).toFixed(0)} mm x ${(s.height * 25.4).toFixed(0)} mm`}</span>
              </div>
              {/* Metadata: area, ratio, quality */}
              <p className="md:text- text-">
                {(s.area).toFixed(0)} in<sup>2</sup> - Ratio {s.ratio}:1 • {isBest? "Closest to square" : "Aspect OK"}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}