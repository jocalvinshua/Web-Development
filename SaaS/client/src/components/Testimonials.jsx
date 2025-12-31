export default function Testimonials() {
  const cardsData = [
    {
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "Briar Martin",
      handle: "@neilstellar",
      date: "April 20, 2025",
    },
    {
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Avery Johnson",
      handle: "@averywrites",
      date: "May 10, 2025",
    },
    {
      image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
      name: "Jordan Lee",
      handle: "@jordantalks",
      date: "June 5, 2025",
    },
    {
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
      name: "Avery Johnson",
      handle: "@averywrites",
      date: "May 10, 2025",
    },
  ];

  const CreateCard = ({ card }) => (
    <div className="p-4 rounded-xl mx-4 w-72 shrink-0 bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex gap-3">
        <img
          className="size-11 rounded-full object-cover"
          src={card.image}
          alt="User"
        />

        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="font-medium text-slate-800">{card.name}</p>
            <svg
              className="mt-0.5 text-primary"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.555.72c-.087.084-.188.164-.297.24-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59c-.052.078-.114.151-.239.297-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743-.125-.146-.187-.219-.24-.297a1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72c-.368-.313-.551-.47-.743-.56a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56"
              />
            </svg>
          </div>

          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>

      <p className="text-sm py-4 text-slate-700 leading-relaxed">
        Radiant made undercutting all of our competitors an absolute breeze.
      </p>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <span>Posted on</span>
          <a
            href="https://x.com"
            target="_blank"
            className="hover:text-primary transition"
          >
            <svg width="11" height="10" viewBox="0 0 11 10" fill="currentColor">
              <path d="m.027 0 4.247 5.516L0 10h.962l3.742-3.926L7.727 10H11L6.514 4.174 10.492 0H9.53L6.084 3.616 3.3 0zM1.44.688h1.504l6.64 8.624H8.082z" />
            </svg>
          </a>
        </div>
        <p>{card.date}</p>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          animation: marqueeScroll 25s linear infinite;
        }
        .marquee-reverse {
          animation-direction: reverse;
        }
      `}</style>

      <section className="relative py-24 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          {/* Header */}
          <div className="flex items-center gap-2 text-primary bg-primary/10 rounded-full px-4 py-1 w-fit">
            <span className="font-medium text-sm">Testimonials</span>
          </div>

          <h2 className="mt-4 text-3xl font-semibold text-slate-900">
            Don&apos;t just take our words
          </h2>

          <p className="text-slate-600 mt-3 max-w-2xl">
            Hear what our users say about us. We're always looking for ways to
            improve. If you have a positive experience with us, leave a review.
          </p>
        </div>

        {/* Marquee Row 1 */}
        <div className="relative max-w-5xl mx-auto overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-20 z-10 bg-gradient-to-r from-white to-transparent" />
          <div className="marquee-inner flex min-w-[200%] pt-10 pb-5">
            {[...cardsData, ...cardsData].map((card, index) => (
              <CreateCard key={index} card={card} />
            ))}
          </div>
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent" />
        </div>

        {/* Marquee Row 2 */}
        <div className="relative max-w-5xl mx-auto overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-20 z-10 bg-gradient-to-r from-white to-transparent" />
          <div className="marquee-inner marquee-reverse flex min-w-[200%] pt-10 pb-5">
            {[...cardsData, ...cardsData].map((card, index) => (
              <CreateCard key={index} card={card} />
            ))}
          </div>
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent" />
        </div>
      </section>
    </>
  );
}
