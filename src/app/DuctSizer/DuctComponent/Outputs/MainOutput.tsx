
type  Props = {
    result : number
}

export default function MainOutput({result} : Props) {
// const

    return (
        <div>
                <div className="mt-4 text-lg font-bold text-black">
                        <p>المساحة: {result} sq ft</p>
                </div>
        </div>
    )
}
