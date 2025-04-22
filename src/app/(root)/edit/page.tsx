export default function Page() {
  return (
    <section className="w-full h-fit flex items-center">
      <div className="w-[40%] h-full">
        <img
          src="/media/video-cover-blur.png"
          alt="Video cover"
          className="object-contain w-96 h-full  rounded-xl"
        />
      </div>
      <div className="w-[60%] flex flex-col gap-y-5">
        {[1, 2].map((_, i) => (
          <div key={i} className="flex flex-col w-full h-full gap-y-3">
            <div className="text-[#808080] font-semibold">Choose Audio</div>
            <div className="flex overflow-x-auto overflow-y-hidden gap-6">
              {[1, 2, 4, 54].map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl w-full h-full flex flex-col gap-3 bg-[#1C1C1C] border border-[#474747] p-3.5"
                >
                  <img
                    src="/media/video-effects.png"
                    alt="video effect"
                    className="aspect-video w-full h-36 object-cover rounded-lg"
                  />

                  <div className="text-white font-semibold text-lg">Sarah</div>
                  <div className="flex gap-3 items-center">
                    <div className="rounded-full bg-[#474747] text-[#B1B1B1] px-2 py-1 flex justify-center items-center">
                      <p className="text-sm">English</p>
                    </div>
                    <div className="rounded-full bg-[#474747] text-[#B1B1B1] px-2 py-1 flex justify-center items-center">
                      <p className="text-sm">English</p>
                    </div>
                    <div className="rounded-full bg-[#474747] text-[#B1B1B1] px-2 py-1 flex justify-center items-center">
                      <p className="text-sm">English</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
