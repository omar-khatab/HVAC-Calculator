
export default function Footer() {
  return (
    <div className=" bg-secondary text-surface w-full p-3 fixed bottom-0 left-0  md:text-[14px] text-[12px]">
        <span>Built by</span>
        <a 

          href="https://github.com/omar-khatab"
          target="_blank"
          className="text-accent hover:underline"
        >
        <span className="mx-1"> Omar Khatab</span>
        </a>
        <p className="md:inline-block "><span className="md:inline-block hidden">—</span> Frontend Developer, Mechanical Power Engineering background</p>
      </div>
  )
}
