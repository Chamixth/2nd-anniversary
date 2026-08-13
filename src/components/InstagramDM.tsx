interface InstagramDMProps {
  from: string
  message: string
  time?: string
}

/** A stylized DM mockup — evokes Instagram's chat UI without reproducing its logo or exact assets. */
export default function InstagramDM({ from, message, time }: InstagramDMProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full p-[2px]"
          style={{ background: "linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)" }}
        >
          <span className="flex h-full w-full items-center justify-center rounded-full bg-[#0a0a0a] font-sans text-sm text-ink">
            {from.charAt(0).toUpperCase()}
          </span>
        </span>
        <div className="flex flex-col leading-tight">
          <span className="font-sans text-sm text-ink">{from.toLowerCase()}</span>
          <span className="font-sans text-xs text-white/40">direct message</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-5 py-7">
        <div
          className="max-w-[85%] self-end rounded-2xl rounded-br-sm px-4 py-3"
          style={{ background: "linear-gradient(135deg,#4f5bd5,#962fbf,#d62976)" }}
        >
          <p className="font-sans text-base leading-snug text-white">{message}</p>
        </div>
        {time && <span className="self-end font-sans text-xs text-white/35">{time}</span>}
      </div>
    </div>
  )
}
