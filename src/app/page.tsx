import Image from "next/image";
import Link from "next/link";

const rooms = [
  {
    number: "01",
    title: "Lịch sử Đảng Cộng sản Việt Nam",
    period: "1930 – Nay",
    description:
      "Khám phá các mốc lịch sử quang vinh từ ngày thành lập Đảng (03/02/1930) qua các phong trào cách mạng, hai cuộc kháng chiến đến Công cuộc Đổi mới.",
    images: ["/exhibits/thanh-lap-dang-1930.png"],
    room: "gallery-subsidy",
  },
  {
    number: "02",
    title: "Tiền thân & Sự chuẩn bị thành lập Đảng",
    period: "1920 – 1930",
    description:
      "Tìm hiểu quá trình tiếp cận chủ nghĩa Mác – Lênin, Đại hội Tours, thành lập Hội Việt Nam Cách mạng Thanh niên và xuất bản Đường Kách Mệnh.",
    images: ["/exhibits/anh-sang-cua-con-duong.jpg"],
    room: "gallery-three",
  },
  {
    number: "03",
    title: "Đảng trong hai cuộc Kháng chiến",
    period: "1945 – 1975",
    description:
      "Theo dấu sự lãnh đạo của Đảng trong Tổng khởi nghĩa Tháng Tám 1945, Chiến thắng Điện Biên Phủ 1954 và Đại thắng Mùa Xuân 1975.",
    images: ["/exhibits/dien-bien-phu-1954.png"],
    room: "gallery-ceramics",
  },
  {
    number: "04",
    title: "Đường lối Đổi mới & Hội nhập Quốc tế",
    period: "1986 – Nay",
    description:
      "Khám phá đường lối Đổi mới toàn diện nền kinh tế do Đảng đề ra từ Đại hội VI (1986), đẩy mạnh công nghiệp hóa, hiện đại hóa và hội nhập.",
    images: ["/exhibits/cong-cuoc-doi-moi-1986.png"],
    room: "gallery-market-economy",
  },
  {
    number: "05",
    title: "Các Kỳ Đại hội Đảng & Tầm nhìn Phát triển",
    period: "Đại hội Đảng Toàn quốc",
    description:
      "Tổng quan về các kỳ Đại hội toàn quốc của Đảng Cộng sản Việt Nam và tầm nhìn chiến lược đưa đất nước phát triển phồn vinh, hạnh phúc.",
    images: ["/exhibits/giai-phong-mien-nam-1975.png"],
    room: "gallery-paintings",
  },
];

const features = [
  ["360", "Trải nghiệm 3D sống động", "Không gian trưng bày chân thực, tái hiện các địa danh và sự kiện lịch sử."],
  ["menu_book", "Tư liệu & hiện vật", "Hình ảnh, tài liệu và hiện vật quý giá được sưu tầm, số hóa."],
  ["groups", "Tương tác & khám phá", "Hệ thống tương tác và câu hỏi giúp hành trình trở nên thú vị, dễ nhớ."],
  ["favorite", "Giá trị và cảm hứng", "Khơi dậy lòng yêu nước, tự hào dân tộc và khát vọng cống hiến."],
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#e9dcc2] text-[#26160f]">
      <header className="relative z-30 border-b border-[#6f1d13]/20 bg-[#f7f0e2]/95 shadow-[0_3px_18px_rgba(69,35,16,.12)]">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-5 px-5 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center border-y-2 border-[#741e13] text-[#741e13]">
              <span className="material-symbols-outlined text-[42px]">account_balance</span>
            </div>
            <div className="uppercase leading-tight">
              <p className="text-[10px] font-bold tracking-[.18em] text-[#741e13]">Bảo tàng 3D</p>
              <p className="mt-1 max-w-[320px] font-label-sm text-sm font-extrabold tracking-wide sm:text-base">
                Lịch sử Đảng Cộng sản Việt Nam
              </p>
              <p className="mt-1 text-[10px] font-bold tracking-[.15em]">1930 – NAY</p>
            </div>
          </div>
          <Link
            href="/lobby"
            className="group inline-flex shrink-0 items-center gap-2 rounded-md bg-[#741e13] px-4 py-3 text-[11px] font-bold uppercase tracking-[.08em] text-[#fff8e9] shadow-[0_8px_22px_rgba(79,20,13,.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#56140d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#741e13] sm:px-6"
          >
            <span className="material-symbols-outlined text-base">museum</span>
            <span className="hidden sm:inline">Bắt đầu hành trình</span>
            <span className="sm:hidden">Bắt đầu</span>
          </Link>
        </div>
      </header>

      <main>
        <section className="relative isolate min-h-[610px] overflow-hidden border-b border-[#6f1d13]/20 lg:min-h-[590px]">
          <Image
            src="/exhibits/thanh-lap-dang-1930.png"
            alt="Thành lập Đảng Cộng sản Việt Nam 1930"
            fill
            priority
            className="object-cover object-center sepia-[.15]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,19,12,.16)_0%,rgba(241,226,195,.70)_38%,rgba(239,224,192,.92)_100%)]" />
          <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(#6d3e20_.65px,transparent_.65px)] [background-size:5px_5px]" />

          <div className="relative mx-auto grid min-h-[610px] max-w-[1500px] items-center px-5 py-16 sm:px-8 lg:min-h-[590px] lg:grid-cols-[.76fr_1.24fr] lg:px-12">
            <div className="hidden lg:block" />
            <div className="max-w-[780px] text-center lg:pl-10">
              <p className="mb-4 text-xs font-extrabold uppercase tracking-[.22em] text-[#552117]">
                Bảo tàng 3D trải nghiệm
              </p>
              <h1 className="font-headline-lg text-[clamp(2.5rem,5.5vw,5.5rem)] font-bold uppercase leading-[.9] tracking-[-.045em] text-[#741e13] [text-shadow:0_2px_0_#ead9b8]">
                Lịch sử Đảng<br />Cộng sản Việt Nam
              </h1>
              <p className="mt-6 font-headline-lg text-2xl italic text-[#3e2418] sm:text-3xl">
                Hành trình quang vinh lãnh đạo cách mạng
              </p>
              <div className="mx-auto mt-4 flex max-w-sm items-center gap-4 text-[#741e13]">
                <span className="h-px flex-1 bg-current/50" />
                <span className="font-headline-lg text-xl font-bold tracking-[.14em]">1930 – NAY</span>
                <span className="h-px flex-1 bg-current/50" />
              </div>
              <p className="mx-auto mt-7 max-w-xl text-sm font-medium leading-7 text-[#321f16] sm:text-[15px]">
                Khám phá các mốc lịch sử vĩ đại của Đảng Cộng sản Việt Nam từ Hội nghị thành lập Đảng năm 1930, các cuộc kháng chiến giải phóng dân tộc đến Công cuộc Đổi mới và hội nhập phát triển đất nước.
              </p>
              <Link
                href="/lobby"
                className="group mt-7 inline-flex items-center gap-3 rounded-md bg-[#741e13] px-7 py-3.5 text-xs font-bold uppercase tracking-[.1em] text-[#fff7e8] shadow-[0_8px_25px_rgba(82,24,15,.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#56140d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#741e13]"
              >
                <span className="material-symbols-outlined text-lg">directions_walk</span>
                Bắt đầu hành trình
                <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="relative px-4 pb-10 pt-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-8 flex items-center justify-center gap-4 text-[#3e2016]">
              <span className="hidden h-px w-24 bg-[#741e13]/30 sm:block" />
              <h2 className="font-headline-lg text-3xl font-bold uppercase tracking-tight sm:text-4xl">5 phòng triển lãm</h2>
              <span className="hidden h-px w-24 bg-[#741e13]/30 sm:block" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5 xl:gap-5">
              {rooms.map((room) => (
                <Link
                  key={room.number}
                  href={`/lobby?room=${room.room}`}
                  className="group relative flex min-h-[460px] flex-col overflow-hidden rounded-[10px] border border-[#795033]/25 bg-[#f6ecd9] shadow-[0_6px_16px_rgba(66,39,20,.13)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(66,39,20,.2)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#741e13]"
                  aria-label={`Khám phá phòng ${room.number}: ${room.title}`}
                >
                  <div className="flex min-h-[92px] items-start gap-3 px-4 pb-3 pt-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#741e13] font-headline-lg text-[27px] font-bold leading-none text-[#fff1d6] shadow-[inset_0_0_0_1px_rgba(255,240,211,.18)]">
                      {room.number}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="text-[15px] font-extrabold uppercase leading-[1.15] tracking-[-.015em] text-[#24140e]">
                        {room.title}
                      </h3>
                      <p className="mt-2 text-[12px] font-semibold leading-tight text-[#4d3124]">{room.period}</p>
                    </div>
                  </div>

                  <div className="relative h-[190px] shrink-0 overflow-hidden border-y border-[#6e452b]/20 bg-[#cbb58e] sm:h-[210px] xl:h-[165px] 2xl:h-[185px]">
                    <div className={`absolute inset-0 grid ${room.images.length > 1 ? "grid-cols-2 gap-px" : "grid-cols-1"}`}>
                      {room.images.map((image, imageIndex) => (
                        <div key={image} className="relative overflow-hidden">
                          <Image
                            src={image}
                            alt={`${room.title} — tư liệu ${imageIndex + 1}`}
                            fill
                            className="object-cover sepia-[.15] contrast-[.94] saturate-[.85] transition duration-500 group-hover:scale-[1.035] group-hover:sepia-0 group-hover:saturate-100"
                            sizes="(min-width: 1280px) 280px, (min-width: 768px) 50vw, 100vw"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#28130d]/20 via-transparent to-[#f4e8d2]/5" />
                  </div>

                  <p className="px-4 pb-4 pt-4 text-[13px] font-medium leading-[1.6] text-[#38251b]">
                    {room.description}
                  </p>

                  <span className="mt-auto flex items-center justify-between border-t border-[#6e452b]/20 px-4 py-3.5 text-[13px] font-extrabold uppercase tracking-[.08em] text-[#741e13]">
                    Khám phá
                    <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#6e452b]/20 bg-[#ddc9a7]/75 px-5 py-8 sm:px-8">
          <div className="mx-auto grid max-w-[1400px] gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map(([icon, title, copy]) => (
              <div key={title} className="flex gap-4 xl:border-r xl:border-[#6e452b]/20 xl:pr-6 xl:last:border-r-0">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#741e13] text-[#f5ddb2]">
                  <span className="material-symbols-outlined text-3xl">{icon}</span>
                </div>
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-[.05em]">{title}</h3>
                  <p className="mt-2 text-[12px] leading-5 text-[#4b3326]">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="relative overflow-hidden bg-[#671b13] px-5 py-8 text-[#f7e8c9] sm:px-8">
          <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(#f5ddb2_.7px,transparent_.7px)] [background-size:6px_6px]" />
          <div className="relative mx-auto grid max-w-[1200px] items-center gap-7 md:grid-cols-[1fr_auto]">
            <blockquote className="text-center font-headline-lg text-lg leading-7 md:text-left md:text-xl">
              “Đảng ta là một Đảng cầm quyền. Mỗi đảng viên và cán bộ phải thật sự thấm nhuần đạo đức cách mạng, thật sự cần kiệm liêm chính, chí công vô tư.”
              <cite className="mt-2 block font-label-sm text-[10px] not-italic uppercase tracking-[.16em] text-[#e9c98d]">— Chủ tịch Hồ Chí Minh —</cite>
            </blockquote>
            <div className="relative mx-auto h-28 w-44 overflow-hidden rounded-sm border border-[#f5ddb2]/20 grayscale md:mx-0">
              <Image
                src="/exhibits/thanh-lap-dang-1930.png"
                alt="Thành lập Đảng Cộng sản Việt Nam 1930"
                fill
                className="object-cover object-center"
                sizes="176px"
              />
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
