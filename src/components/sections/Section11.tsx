export default function Section11() {
    return (
    <section
      id="section_11"
      className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 px-4"
    >
      <div className="flex flex-col items-center gap-8 w-full max-w-6xl">
        {/* Stats Row */}
        <div className="flex flex-wrap justify-center items-stretch gap-6 w-full">
          <div className="flex-1 min-w-[220px] flex flex-col items-center gap-2">
            <div className="text-center text-white text-5xl font-black leading-tight">
              95%
            </div>
            <div className="text-center text-white text-base font-medium leading-snug">
              have less than 10 people
            </div>
          </div>

          <div className="flex-1 min-w-[220px] flex flex-col items-center gap-2">
            <div className="text-center text-white text-5xl font-black leading-tight">
              80%
            </div>
            <div className="text-center text-white text-base font-medium leading-snug">
              are solo (2025 SBA)
            </div>
          </div>

          <div className="flex-1 min-w-[220px] flex flex-col items-center gap-2">
            <div className="text-center text-white text-5xl font-black leading-tight">
              70%
            </div>
            <div className="text-center text-white text-base font-medium leading-snug">
              say web presence is “mission-critical”
            </div>
          </div>

          <div className="flex-1 min-w-[220px] flex flex-col items-center gap-2">
            <div className="text-center text-white text-5xl font-black leading-tight">
              50%
            </div>
            <div className="text-center text-white text-base font-medium leading-snug">
              with no physical storefront
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col items-center gap-6 w-full max-w-3xl text-center">
          <p className="text-white text-xl md:text-2xl font-medium leading-relaxed">
            You don’t just want your site to work, you need it to wow. <br />
            For decades, world-building was trapped in game engines.
          </p>

          <h2 className="text-white text-3xl md:text-4xl font-extrabold">
            Now, that power is yours
          </h2>

          <p className="text-white text-lg md:text-2xl font-medium leading-relaxed">
            With BOTI, your success isn’t limited by skill or budget
          </p>

          <h3 className="text-white text-3xl md:text-5xl font-black leading-tight">
            only by imagination.
          </h3>

          <p className="text-white text-lg md:text-2xl font-medium leading-relaxed">
            BOTI turns ‘good enough’ into limitless imagination.
          </p>
        </div>
      </div>
    </section>

    );
}
