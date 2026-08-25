export interface RoomOneQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number | number[];
  isMulti?: boolean;
}

export interface RoomOneGameplayData {
  hasTimer: boolean;
  timerDuration: number;
  quizzes: RoomOneQuizQuestion[];
  historyText: string;
  clueText: string;
  isFinalRound?: boolean;
}

export const ROOM_ONE_REQUIRED_CLUE_IDS = [
  'exhibit-coupon',
  'exhibit-world-1911-1917',
  'exhibit-versailles-1919',
  'exhibit-lenin-theses-1920',
  'exhibit-tours-1920',
  'exhibit-guangzhou-1925-1927',
] as const;

export const ROOM_ONE_FINAL_ARCHIVE_IMAGE_ID = 'exhibit-convergence-1930';
export const ROOM_ONE_FINAL_EXHIBIT_ID = 'room-one-final-archive';

export const ROOM_ONE_GAMEPLAY: Record<string, RoomOneGameplayData> = {
  'exhibit-coupon': {
    hasTimer: false,
    timerDuration: 0,
    quizzes: [
      {
        question: 'Đảng Cộng sản Việt Nam được chính thức thành lập vào thời gian nào?',
        options: ['Ngày 3/2/1930', 'Ngày 5/6/1911', 'Ngày 2/9/1945', 'Ngày 30/4/1975'],
        correctIndex: 0,
      },
      {
        question: 'Ý nghĩa lịch sử quan trọng nhất của sự kiện thành lập Đảng Cộng sản Việt Nam năm 1930 là gì?',
        options: [
          'Kết thúc phong trào công nhân Việt Nam',
          'Tạo ra bước ngoặt vĩ đại, chấm dứt khủng hoảng về đường lối lãnh đạo cách mạng',
          'Đánh dấu sự rút lui của quân Pháp khỏi Việt Nam',
          'Chính thức thành lập Nhà nước Việt Nam Dân chủ Cộng hòa',
        ],
        correctIndex: 1,
      },
    ],
    historyText: 'THÀNH LẬP ĐẢNG — Hồng Kông, 03/02/1930. Ngày 3/2/1930, Hội nghị hợp nhất các tổ chức cộng sản do Nguyễn Ái Quốc chủ trì tại Cửu Long (Hồng Kông) đã thông qua Chánh cương tắt, Sách lược tắt, Điều lệ tắt, chính thức thành lập Đảng Cộng sản Việt Nam. Sự kiện này chấm dứt thời kỳ khủng hoảng bế tắc về đường lối và giai cấp lãnh đạo cách mạng.',
    clueText: 'HỒNG KÔNG 1930 · CHÁNH CƯƠNG TẮT · CỬU LONG · THÀNH LẬP ĐẢNG',
  },
  'exhibit-world-1911-1917': {
    hasTimer: false,
    timerDuration: 0,
    quizzes: [
      {
        question: 'Đỉnh cao của phong trào cách mạng 1930–1931 do Đảng lãnh đạo là gì?',
        options: [
          'Chiến dịch Điện Biên Phủ',
          'Phong trào Xô viết Nghệ Tĩnh',
          'Tổng khởi nghĩa Tháng Tám',
          'Chiến dịch Hồ Chí Minh',
        ],
        correctIndex: 1,
      },
      {
        question: 'Ý nghĩa của phong trào Xô viết Nghệ Tĩnh 1930–1931 là gì?',
        options: [
          'Khẳng định quyền lãnh đạo và năng lực thực tiễn của Đảng và giai cấp công nhân',
          'Giải phóng hoàn toàn miền Nam Việt Nam',
          'Buộc Pháp phải ký Hiệp định Giơ-ne-vơ',
          'Thành lập hệ thống ngân hàng nhà nước',
        ],
        correctIndex: 0,
      },
    ],
    historyText: 'XÔ VIẾT NGHỆ TĨNH — 1930–1931. Phong trào cách mạng 1930–1931 đỉnh cao là Xô viết Nghệ Tĩnh là cuộc diễn tập đầu tiên của Đảng và nhân dân ta, khẳng định năng lực lãnh đạo cách mạng của giai cấp công nhân Việt Nam.',
    clueText: 'XÔ VIẾT NGHỆ TĨNH · 1930-1931 · CAO TRÀO CÁCH MẠNG · CÔNG NÔNG',
  },
  'exhibit-versailles-1919': {
    hasTimer: false,
    timerDuration: 0,
    quizzes: [
      {
        question: 'Mục tiêu chủ yếu của Phong trào Dân chủ 1936–1939 là gì?',
        options: [
          'Đòi tự do, dân sinh, dân chủ, cơm áo và hòa bình',
          'Đánh đuổi quân Nhật ra khỏi Việt Nam',
          'Thực hiện Đổi mới nền kinh tế',
          'Xây dựng các tập đoàn tài chính',
        ],
        correctIndex: 0,
      },
      {
        question: 'Phong trào Dân chủ 1936–1939 có vai trò gì đối với Cách mạng Tháng Tám 1945?',
        options: [
          'Là cuộc chuẩn bị lực lượng quần chúng rộng lớn cho Cách mạng Tháng Tám',
          'Là chiến dịch quân sự trực tiếp giải phóng thủ đô',
          'Không có liên quan gì đến Cách mạng Tháng Tám',
          'Là sự kiện ký kết hòa bình với các cường quốc',
        ],
        correctIndex: 0,
      },
    ],
    historyText: 'PHONG TRÀO DÂN CHỦ — 1936–1939. Đảng phát động phong trào đấu tranh rộng lớn đòi quyền tự do, dân sinh, dân chủ, hòa bình, chống phát xít. Phong trào đã tập hợp hàng triệu quần chúng nhân dân, chuẩn bị lực lượng cho cuộc đấu tranh giành chính quyền.',
    clueText: 'DÂN CHỦ 1936-1939 · DÂN SINH · TỰ DO · CƠM ÁO · HÒA BÌNH',
  },
  'exhibit-lenin-theses-1920': {
    hasTimer: false,
    timerDuration: 0,
    quizzes: [
      {
        question: 'Ngày 2/9/1945 đã ghi dấu sự kiện lịch sử trọng đại nào của dân tộc?',
        options: [
          'Bác Hồ đọc Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa',
          'Đại hội Đảng lần thứ nhất tại Hà Nội',
          'Ký kết Hiệp định Giơ-ne-vơ',
          'Chiến thắng Điện Biên Phủ',
        ],
        correctIndex: 0,
      },
      {
        question: 'Thắng lợi của Cách mạng Tháng Tám năm 1945 đã lật đổ hệ thống thống trị nào?',
        options: [
          'Thực dân Pháp và phát xít Nhật cùng chế độ phong kiến ngàn năm',
          'Các công ty tư nhân nước ngoài',
          'Chế độ tư bản chủ nghĩa hiện đại',
          'Liên minh các quốc gia phương Tây',
        ],
        correctIndex: 0,
      },
    ],
    historyText: 'CÁCH MẠNG THÁNG TÁM — 1945. Dưới sự lãnh đạo của Đảng và Mặt trận Việt Minh, nhân dân cả nước thực hiện Tổng khởi nghĩa Tháng Tám năm 1945 thành công. Ngày 2/9/1945, Tuyên ngôn Độc lập được tuyên đọc, mở ra kỷ nguyên độc lập, tự do cho dân tộc Việt Nam.',
    clueText: 'TỔNG KHỞI NGHĨA · THÁNG TÁM 1945 · TUYÊN NGÔN ĐỘC LẬP · 2/9/1945',
  },
  'exhibit-tours-1920': {
    hasTimer: false,
    timerDuration: 0,
    quizzes: [
      {
        question: 'Chiến thắng Điện Biên Phủ ngày 7/5/1954 đã dẫn tới kết quả ngoại giao nào?',
        options: [
          'Pháp phải ký Hiệp định Giơ-ne-vơ năm 1954 công nhận độc lập, chủ quyền của Việt Nam',
          'Việt Nam gia nhập Liên Hợp Quốc ngay trong năm 1954',
          'Ký kết Hiệp định Paris 1973',
          'Thành lập Cộng đồng ASEAN',
        ],
        correctIndex: 0,
      },
      {
        question: 'Ý nghĩa lịch sử của Chiến thắng Điện Biên Phủ 1954 là gì?',
        options: [
          'Lừng lẫy năm châu, chấn động địa cầu, kết thúc chiến tranh xâm lược của thực dân Pháp',
          'Mở đầu phong trào Đổi mới đất nước',
          'Đánh dấu sự thành lập của Đảng Cộng sản',
          'Giải phóng hoàn toàn miền Nam ngay năm 1954',
        ],
        correctIndex: 0,
      },
    ],
    historyText: 'ĐIỆN BIÊN PHỦ 1954 — 07/05/1954. Chiến thắng Điện Biên Phủ lừng lẫy năm châu, chấn động địa cầu dưới sự lãnh đạo của Đảng đã chấm dứt 9 năm kháng chiến chống Pháp, buộc thực dân Pháp phải rút quân và công nhận chủ quyền Việt Nam.',
    clueText: 'ĐIỆN BIÊN PHỦ 1954 · LỪNG LẪY NĂM CHÂU · GIƠ-NE-VƠ · ĐỘC LẬP',
  },
  'exhibit-guangzhou-1925-1927': {
    hasTimer: false,
    timerDuration: 0,
    quizzes: [
      {
        question: 'Chiến dịch lịch sử nào đã kết thúc thắng lợi cuộc kháng chiến chống Mỹ cứu nước ngày 30/4/1975?',
        options: [
          'Chiến dịch Hồ Chí Minh',
          'Chiến dịch Điện Biên Phủ',
          'Chiến dịch Việt Bắc 1947',
          'Chiến dịch Biên giới 1950',
        ],
        correctIndex: 0,
      },
      {
        question: 'Ý nghĩa của Đại thắng Mùa Xuân 1975 là gì?',
        options: [
          'Giải phóng hoàn toàn miền Nam, thống nhất đất nước, đưa cả nước bước vào kỷ nguyên độc lập chủ nghĩa xã hội',
          'Mở đầu cuộc đấu tranh chống thực dân Pháp',
          'Thành lập Mặt trận Việt Minh',
          'Bắt đầu thực hiện công cuộc Đổi mới',
        ],
        correctIndex: 0,
      },
    ],
    historyText: 'ĐẠI THẮNG MÙA XUÂN 1975 — 30/04/1975. Cuộc Tổng tiến công và nổi dậy Mùa Xuân 1975 đỉnh cao là Chiến dịch Hồ Chí Minh đã giải phóng hoàn toàn miền Nam, thu giang sơn về một mối, mở ra kỷ nguyên độc lập và thống nhất cho Tổ quốc.',
    clueText: '30 THÁNG 4 1975 · ĐẠI THẮNG MÙA XUÂN · CHIẾN DỊCH HỒ CHÍ MINH · THỐNG NHẤT',
  },
  [ROOM_ONE_FINAL_EXHIBIT_ID]: {
    hasTimer: false,
    timerDuration: 0,
    isFinalRound: true,
    quizzes: [
      {
        question: 'Đại hội Đảng lần thứ mấy (năm 1986) đã đề ra đường lối Đổi mới toàn diện đất nước?',
        options: ['Đại hội VI (1986)', 'Đại hội III (1960)', 'Đại hội I (1935)', 'Đại hội XII (2016)'],
        correctIndex: 0,
      },
      {
        question: 'Thành tựu to lớn của công cuộc Đổi mới do Đảng lãnh đạo từ năm 1986 đến nay là gì?',
        options: [
          'Đưa đất nước thoát khỏi khủng hoảng, phát triển kinh tế mạnh mẽ, nâng cao đời sống nhân dân và vị thế quốc tế',
          'Quay trở lại nền kinh tế bao cấp hoàn toàn',
          'Chấm dứt việc giao lưu thương mại quốc tế',
          'Giải thể các ngành công nghiệp hiện đại',
        ],
        correctIndex: 0,
      },
    ],
    historyText: 'ĐỔI MỚI & PHÁT TRIỂN — Từ Đại hội VI (1986) đến nay. Đường lối Đổi mới do Đảng đề ra đã khẳng định bản lĩnh, trí tuệ và sự lãnh đạo đúng đắn của Đảng Cộng sản Việt Nam, đưa đất nước phát triển vượt bậc và hội nhập sâu rộng.',
    clueText: 'Vòng cuối đã hoàn thành',
  },
};
