export interface RoomOneQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number | number[];
  isMulti?: boolean;
  /** Giải thích hiện sau khi trả lời đúng, giúp ôn tập lại kiến thức. */
  explanation?: string;
}

export interface RoomOneGameplayData {
  hasTimer: boolean;
  timerDuration: number;
  quizzes: RoomOneQuizQuestion[];
  /** Nội dung bài học hiện cùng câu hỏi; chứa đủ kiến thức để trả lời. */
  historyText: string;
  clueText: string;
  isFinalRound?: boolean;
}

// Thứ tự theo lối đi trong phòng: Chương 1 (khái niệm → đối tượng, phương pháp)
// rồi Chương 2 (thực tiễn → truyền thống → tinh hoa nhân loại & Mác – Lênin → nhân tố chủ quan).
export const ROOM_ONE_REQUIRED_CLUE_IDS = [
  'exhibit-coupon',
  'exhibit-lenin-theses-1920',
  'exhibit-world-1911-1917',
  'exhibit-tours-1920',
  'exhibit-versailles-1919',
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
        question: 'Đại hội nào của Đảng lần đầu tiên nêu định nghĩa tương đối toàn diện về tư tưởng Hồ Chí Minh?',
        options: ['Đại hội IX (2001)', 'Đại hội VI (1986)', 'Đại hội III (1960)', 'Đại hội XII (2016)'],
        correctIndex: 0,
        explanation: 'Đại hội IX (2001) lần đầu nêu định nghĩa tương đối toàn diện; các Đại hội sau tiếp tục bổ sung, hoàn thiện khái niệm.',
      },
      {
        question: 'Theo định nghĩa, tư tưởng Hồ Chí Minh là kết quả của sự vận dụng và phát triển sáng tạo học thuyết nào vào điều kiện Việt Nam?',
        options: ['Chủ nghĩa Mác – Lênin', 'Chủ nghĩa Tam dân', 'Nho giáo', 'Chủ nghĩa tự do phương Tây'],
        correctIndex: 0,
        explanation: 'Tư tưởng Hồ Chí Minh là kết quả của sự vận dụng và phát triển sáng tạo chủ nghĩa Mác – Lênin, đồng thời kế thừa truyền thống dân tộc và tiếp thu tinh hoa văn hóa nhân loại.',
      },
      {
        question: 'Đại hội nào khẳng định lấy chủ nghĩa Mác – Lênin và tư tưởng Hồ Chí Minh làm nền tảng tư tưởng, kim chỉ nam cho hành động của Đảng?',
        options: ['Đại hội VII (1991)', 'Đại hội II (1951)', 'Đại hội IV (1976)', 'Đại hội VI (1986)'],
        correctIndex: 0,
        explanation: 'Đại hội VII (1991) lần đầu khẳng định lấy chủ nghĩa Mác – Lênin và tư tưởng Hồ Chí Minh làm nền tảng tư tưởng, kim chỉ nam cho hành động.',
      },
    ],
    historyText: 'KHÁI NIỆM TƯ TƯỞNG HỒ CHÍ MINH — Chương 1. Đại hội IX (2001) lần đầu nêu định nghĩa tương đối toàn diện: tư tưởng Hồ Chí Minh là hệ thống quan điểm toàn diện, sâu sắc về những vấn đề cơ bản của cách mạng Việt Nam, kết quả của sự vận dụng và phát triển sáng tạo chủ nghĩa Mác – Lênin vào điều kiện cụ thể nước ta, kế thừa và phát triển các giá trị truyền thống tốt đẹp của dân tộc, tiếp thu tinh hoa văn hóa nhân loại; là tài sản tinh thần to lớn, mãi mãi soi đường cho cách mạng Việt Nam. Từ Đại hội VII (1991), Đảng khẳng định lấy chủ nghĩa Mác – Lênin và tư tưởng Hồ Chí Minh làm nền tảng tư tưởng, kim chỉ nam cho hành động.',
    clueText: 'CHƯƠNG 1 · HỆ THỐNG QUAN ĐIỂM · ĐẠI HỘI IX · NỀN TẢNG TƯ TƯỞNG',
  },
  'exhibit-lenin-theses-1920': {
    hasTimer: false,
    timerDuration: 0,
    quizzes: [
      {
        question: 'Đối tượng nghiên cứu của môn học Tư tưởng Hồ Chí Minh là gì?',
        options: [
          'Hệ thống quan điểm, lý luận của Hồ Chí Minh về cách mạng Việt Nam và quá trình hiện thực hóa các quan điểm đó',
          'Tiểu sử gia đình và quê hương của Hồ Chí Minh',
          'Diễn biến quân sự của các cuộc kháng chiến',
          'Các tác phẩm văn học nước ngoài mà Hồ Chí Minh đã đọc',
        ],
        correctIndex: 0,
        explanation: 'Môn học nghiên cứu hệ thống quan điểm, lý luận của Hồ Chí Minh và quá trình vận động, hiện thực hóa các quan điểm ấy trong thực tiễn cách mạng Việt Nam.',
      },
      {
        question: 'Nguyên tắc phương pháp luận nào là yêu cầu hàng đầu khi nghiên cứu tư tưởng Hồ Chí Minh?',
        options: [
          'Thống nhất tính đảng và tính khoa học',
          'Chỉ nghiên cứu các tác phẩm viết bằng tiếng Việt',
          'Tách rời lý luận khỏi thực tiễn cách mạng',
          'Chỉ xem xét từng quan điểm riêng lẻ, không cần hệ thống',
        ],
        correctIndex: 0,
        explanation: 'Các nguyên tắc gồm: thống nhất tính đảng và tính khoa học; lý luận gắn với thực tiễn; quan điểm lịch sử – cụ thể; toàn diện, hệ thống; kế thừa và phát triển.',
      },
      {
        question: 'Ý nghĩa của việc học tập môn Tư tưởng Hồ Chí Minh đối với sinh viên là gì?',
        options: [
          'Nâng cao năng lực tư duy lý luận, bồi dưỡng đạo đức cách mạng và vận dụng vào cuộc sống',
          'Chỉ để thi qua môn học',
          'Thay thế cho các môn chuyên ngành',
          'Chỉ để ghi nhớ niên đại các sự kiện',
        ],
        correctIndex: 0,
        explanation: 'Học tập giúp nâng cao năng lực tư duy lý luận, giáo dục và thực hành đạo đức cách mạng, củng cố niềm tin khoa học và vận dụng vào công việc, cuộc sống.',
      },
    ],
    historyText: 'ĐỐI TƯỢNG, PHƯƠNG PHÁP & Ý NGHĨA HỌC TẬP — Chương 1. Đối tượng nghiên cứu là hệ thống quan điểm, lý luận của Hồ Chí Minh về cách mạng Việt Nam và quá trình hiện thực hóa các quan điểm đó. Nghiên cứu phải bảo đảm thống nhất tính đảng và tính khoa học (yêu cầu hàng đầu), lý luận gắn với thực tiễn, quan điểm lịch sử – cụ thể, toàn diện và hệ thống, kế thừa và phát triển; dựa trên nguồn tư liệu gốc là các bài nói, bài viết, tác phẩm của Người như "Nhật ký trong tù". Với sinh viên, học tập môn học giúp nâng cao năng lực tư duy lý luận, bồi dưỡng đạo đức cách mạng và vận dụng vào công việc, cuộc sống.',
    clueText: 'CHƯƠNG 1 · ĐỐI TƯỢNG · TÍNH ĐẢNG & TÍNH KHOA HỌC · Ý NGHĨA HỌC TẬP',
  },
  'exhibit-world-1911-1917': {
    hasTimer: false,
    timerDuration: 0,
    quizzes: [
      {
        question: 'Ai là người khởi xướng phong trào Đông Du với chủ trương dựa vào Nhật Bản để cứu nước?',
        options: ['Phan Bội Châu', 'Phan Châu Trinh', 'Hoàng Hoa Thám', 'Nguyễn Thái Học'],
        correctIndex: 0,
        explanation: 'Phan Bội Châu chủ trương dựa vào Nhật (Đông Du); Phan Châu Trinh chủ trương cải cách, nâng cao dân trí. Cả hai khuynh hướng đều thất bại.',
      },
      {
        question: 'Đầu thế kỷ XX, cách mạng Việt Nam lâm vào tình trạng gì?',
        options: [
          'Khủng hoảng về đường lối cứu nước và giai cấp lãnh đạo',
          'Đã giành được độc lập hoàn toàn',
          'Có Đảng Cộng sản lãnh đạo thống nhất',
          'Không còn phong trào yêu nước nào',
        ],
        correctIndex: 0,
        explanation: 'Các phong trào theo khuynh hướng phong kiến và dân chủ tư sản đều thất bại, cách mạng Việt Nam khủng hoảng về đường lối – yêu cầu tìm con đường cứu nước mới.',
      },
      {
        question: 'Sự kiện nào trên thế giới mở ra thời đại mới, ảnh hưởng lớn đến sự hình thành tư tưởng Hồ Chí Minh?',
        options: [
          'Cách mạng Tháng Mười Nga (1917)',
          'Cách mạng tư sản Anh (1640)',
          'Cách mạng Minh Trị ở Nhật Bản (1868)',
          'Chiến tranh Nha phiến (1840)',
        ],
        correctIndex: 0,
        explanation: 'Cách mạng Tháng Mười Nga (1917) mở ra thời đại quá độ từ chủ nghĩa tư bản lên chủ nghĩa xã hội, cổ vũ phong trào giải phóng dân tộc ở các nước thuộc địa.',
      },
    ],
    historyText: 'CƠ SỞ THỰC TIỄN — Chương 2. Cuối thế kỷ XIX, Việt Nam trở thành thuộc địa của thực dân Pháp. Các phong trào yêu nước theo khuynh hướng phong kiến (Cần Vương) và dân chủ tư sản – tiêu biểu là Phan Bội Châu với chủ trương dựa vào Nhật (phong trào Đông Du) và Phan Châu Trinh với chủ trương cải cách, nâng cao dân trí – đều thất bại. Cách mạng Việt Nam lâm vào khủng hoảng về đường lối cứu nước và giai cấp lãnh đạo. Trên thế giới, chủ nghĩa tư bản chuyển sang chủ nghĩa đế quốc; Cách mạng Tháng Mười Nga (1917) mở ra thời đại mới, cổ vũ các dân tộc thuộc địa.',
    clueText: 'CHƯƠNG 2 · KHỦNG HOẢNG ĐƯỜNG LỐI · ĐÔNG DU · CÁCH MẠNG THÁNG MƯỜI',
  },
  'exhibit-tours-1920': {
    hasTimer: false,
    timerDuration: 0,
    quizzes: [
      {
        question: 'Giá trị cốt lõi trong truyền thống dân tộc mà Hồ Chí Minh kế thừa là gì?',
        options: ['Chủ nghĩa yêu nước', 'Tư tưởng trọng thương', 'Tinh thần thượng võ phong kiến', 'Lối sống khép kín'],
        correctIndex: 0,
        explanation: 'Chủ nghĩa yêu nước là giá trị cốt lõi, dòng chủ lưu của lịch sử dân tộc; cùng với tinh thần nhân nghĩa, đoàn kết, cần cù, hiếu học, lạc quan.',
      },
      {
        question: 'Thân phụ của Chủ tịch Hồ Chí Minh là ai?',
        options: ['Cụ Phó bảng Nguyễn Sinh Sắc', 'Cụ Phan Bội Châu', 'Cụ Phan Châu Trinh', 'Cụ Hoàng Xuân Đường'],
        correctIndex: 0,
        explanation: 'Cụ Phó bảng Nguyễn Sinh Sắc là nhà nho yêu nước, thương dân, có ảnh hưởng lớn đến nhân cách và chí hướng của Hồ Chí Minh.',
      },
      {
        question: 'Quê nội của Chủ tịch Hồ Chí Minh ở đâu?',
        options: [
          'Làng Kim Liên (làng Sen), huyện Nam Đàn, tỉnh Nghệ An',
          'Phan Thiết, Bình Thuận',
          'Thành phố Huế',
          'Sài Gòn',
        ],
        correctIndex: 0,
        explanation: 'Quê nội là làng Kim Liên (làng Sen), Nam Đàn, Nghệ An – vùng quê giàu truyền thống yêu nước, hiếu học.',
      },
    ],
    historyText: 'GIÁ TRỊ TRUYỀN THỐNG DÂN TỘC — Chương 2. Chủ nghĩa yêu nước là giá trị cốt lõi, là dòng chủ lưu của lịch sử dân tộc Việt Nam; cùng với tinh thần nhân nghĩa, đoàn kết, cần cù, hiếu học và lạc quan. Hồ Chí Minh sinh ra ở Nghệ An – vùng quê giàu truyền thống yêu nước; quê nội là làng Kim Liên (làng Sen), huyện Nam Đàn. Thân phụ là cụ Phó bảng Nguyễn Sinh Sắc, một nhà nho yêu nước, thương dân, có ảnh hưởng lớn đến nhân cách và chí hướng của Người.',
    clueText: 'CHƯƠNG 2 · CHỦ NGHĨA YÊU NƯỚC · LÀNG SEN · NGUYỄN SINH SẮC',
  },
  'exhibit-versailles-1919': {
    hasTimer: false,
    timerDuration: 0,
    quizzes: [
      {
        question: 'Trong các tiền đề lý luận, yếu tố nào quyết định bản chất cách mạng và khoa học của tư tưởng Hồ Chí Minh?',
        options: [
          'Chủ nghĩa Mác – Lênin',
          'Giá trị truyền thống dân tộc',
          'Tư tưởng Nho giáo',
          'Chủ nghĩa Tam dân của Tôn Trung Sơn',
        ],
        correctIndex: 0,
        explanation: 'Chủ nghĩa Mác – Lênin là cơ sở lý luận quyết định; truyền thống dân tộc là nền tảng, tinh hoa văn hóa nhân loại là nguồn bổ sung quan trọng.',
      },
      {
        question: 'Từ Phật giáo, Hồ Chí Minh tiếp thu những giá trị nào?',
        options: [
          'Tư tưởng từ bi, vị tha, bác ái, cứu khổ cứu nạn',
          'Chủ trương xuất thế, xa lánh đời sống xã hội',
          'Tư tưởng đẳng cấp, phân biệt giàu nghèo',
          'Lối sống hưởng thụ cá nhân',
        ],
        correctIndex: 0,
        explanation: 'Người tiếp thu tư tưởng từ bi, vị tha, bác ái, cứu khổ cứu nạn, lối sống giản dị, đề cao lao động của Phật giáo.',
      },
      {
        question: 'Hồ Chí Minh tiếp thu tư tưởng về quyền con người, quyền bình đẳng từ văn kiện nào của phương Tây?',
        options: [
          'Tuyên ngôn Độc lập của Mỹ (1776)',
          'Bộ luật Hồng Đức',
          'Hiệp ước Patơnốt (1884)',
          'Hiến chương Liên Hợp Quốc (1945)',
        ],
        correctIndex: 0,
        explanation: 'Người tiếp thu tư tưởng quyền con người từ Tuyên ngôn Độc lập của Mỹ (1776) và Tuyên ngôn Nhân quyền và Dân quyền của Pháp – sau này trích dẫn trong Tuyên ngôn Độc lập 1945.',
      },
    ],
    historyText: 'TINH HOA NHÂN LOẠI & CHỦ NGHĨA MÁC – LÊNIN — Chương 2. Từ phương Đông, Hồ Chí Minh tiếp thu mặt tích cực của Nho giáo (tu thân, trọng đạo đức), Phật giáo (từ bi, vị tha, bác ái, cứu khổ cứu nạn) và chủ nghĩa Tam dân của Tôn Trung Sơn. Từ phương Tây, Người tiếp thu tư tưởng tự do, bình đẳng, bác ái và quyền con người trong Tuyên ngôn Độc lập của Mỹ (1776), Tuyên ngôn Nhân quyền và Dân quyền của Pháp. Chủ nghĩa Mác – Lênin là cơ sở lý luận quyết định bước phát triển mới về chất, quyết định bản chất cách mạng và khoa học của tư tưởng Hồ Chí Minh.',
    clueText: 'CHƯƠNG 2 · PHƯƠNG ĐÔNG · PHƯƠNG TÂY · MÁC – LÊNIN',
  },
  'exhibit-guangzhou-1925-1927': {
    hasTimer: false,
    timerDuration: 0,
    quizzes: [
      {
        question: 'Trước khi vào Sài Gòn (1911), Nguyễn Tất Thành dạy học ở trường nào?',
        options: ['Trường Dục Thanh (Phan Thiết)', 'Trường Quốc học Huế', 'Trường Đông Kinh nghĩa thục', 'Trường Pháp – Việt Vinh'],
        correctIndex: 0,
        explanation: 'Sau thời gian học ở Trường Quốc học Huế và tham gia phong trào chống thuế (1908), Người dạy học ở Trường Dục Thanh (Phan Thiết) rồi vào Sài Gòn.',
      },
      {
        question: 'Giai đoạn trước năm 1911 có ý nghĩa gì trong quá trình hình thành tư tưởng Hồ Chí Minh?',
        options: [
          'Hình thành tư tưởng yêu nước và chí hướng cứu nước',
          'Hình thành cơ bản tư tưởng về cách mạng Việt Nam',
          'Tìm thấy con đường cách mạng vô sản',
          'Thành lập Đảng Cộng sản Việt Nam',
        ],
        correctIndex: 0,
        explanation: 'Năm giai đoạn: trước 1911 (tư tưởng yêu nước, chí hướng cứu nước); 1911–1920 (tìm thấy con đường cứu nước); 1921–1930 (hình thành cơ bản); 1930–1941 (vượt thử thách); 1941–1969 (phát triển, hoàn thiện).',
      },
      {
        question: 'Đâu là một nhân tố chủ quan góp phần hình thành tư tưởng Hồ Chí Minh?',
        options: [
          'Khả năng tư duy độc lập, tự chủ, sáng tạo, có óc phê phán',
          'Sự giúp đỡ của chính quyền thực dân',
          'Xuất thân từ gia đình quan lại giàu có',
          'Chỉ học tập trong nhà trường phong kiến',
        ],
        correctIndex: 0,
        explanation: 'Nhân tố chủ quan: tư duy độc lập, tự chủ, sáng tạo, óc phê phán; khổ công học tập; tâm hồn của nhà yêu nước chân chính, chiến sĩ cộng sản nhiệt thành.',
      },
    ],
    historyText: 'NHÂN TỐ CHỦ QUAN & TUỔI TRẺ TRƯỚC 1911 — Chương 2. Nhân tố chủ quan gồm: khả năng tư duy độc lập, tự chủ, sáng tạo, có óc phê phán; sự khổ công học tập để chiếm lĩnh tri thức nhân loại; tâm hồn của một nhà yêu nước chân chính. Trước 1911, Nguyễn Tất Thành học ở Trường Quốc học Huế, tham gia phong trào chống thuế ở Trung Kỳ (1908), rồi dạy học ở Trường Dục Thanh (Phan Thiết) trước khi vào Sài Gòn. Đây là giai đoạn hình thành tư tưởng yêu nước và chí hướng cứu nước – giai đoạn đầu trong 5 giai đoạn hình thành tư tưởng Hồ Chí Minh.',
    clueText: 'CHƯƠNG 2 · QUỐC HỌC HUẾ · TRƯỜNG DỤC THANH · CHÍ HƯỚNG CỨU NƯỚC',
  },
  [ROOM_ONE_FINAL_EXHIBIT_ID]: {
    hasTimer: false,
    timerDuration: 0,
    isFinalRound: true,
    quizzes: [
      {
        question: 'Nguyễn Tất Thành ra đi tìm đường cứu nước vào ngày nào, từ đâu?',
        options: [
          'Ngày 5/6/1911, từ Bến Nhà Rồng (Sài Gòn)',
          'Ngày 3/2/1930, từ Hồng Kông',
          'Ngày 2/9/1945, từ Hà Nội',
          'Ngày 5/6/1911, từ cảng Hải Phòng',
        ],
        correctIndex: 0,
        explanation: 'Ngày 5/6/1911, với tên Văn Ba, Người rời Bến Nhà Rồng trên tàu Amiral Latouche-Tréville – hành trình tiếp tục ở Phòng 02.',
      },
      {
        question: 'Vì sao Nguyễn Tất Thành chọn sang phương Tây thay vì đi theo con đường của các bậc tiền bối?',
        options: [
          'Muốn tìm hiểu thực chất "tự do, bình đẳng, bác ái" ở chính nước Pháp để tìm con đường cứu nước mới',
          'Để làm quan cho chính quyền thuộc địa',
          'Để du lịch và buôn bán',
          'Vì được chính phủ Pháp mời sang học',
        ],
        correctIndex: 0,
        explanation: 'Thấy các con đường cũ thất bại, Người muốn sang Pháp và các nước khác xem họ làm thế nào, rồi trở về giúp đồng bào.',
      },
      {
        question: 'Cơ sở lý luận của tư tưởng Hồ Chí Minh gồm những yếu tố nào?',
        options: [
          'Giá trị truyền thống dân tộc, tinh hoa văn hóa nhân loại và chủ nghĩa Mác – Lênin',
          'Chỉ có chủ nghĩa Mác – Lênin',
          'Chỉ có Nho giáo và Phật giáo',
          'Chỉ có tư tưởng dân chủ tư sản phương Tây',
        ],
        correctIndex: 0,
        explanation: 'Cơ sở lý luận gồm ba yếu tố: truyền thống dân tộc (nền tảng), tinh hoa văn hóa nhân loại và chủ nghĩa Mác – Lênin (quyết định bản chất).',
      },
    ],
    historyText: 'HÀNH TRANG LÊN ĐƯỜNG — Cơ sở lý luận của tư tưởng Hồ Chí Minh gồm ba yếu tố: giá trị truyền thống dân tộc, tinh hoa văn hóa nhân loại và chủ nghĩa Mác – Lênin. Thấy các con đường cứu nước cũ thất bại, Nguyễn Tất Thành muốn sang Pháp và các nước khác tìm hiểu thực chất "tự do, bình đẳng, bác ái", xem họ làm thế nào rồi trở về giúp đồng bào. Ngày 5/6/1911, với tên Văn Ba, Người rời Bến Nhà Rồng (Sài Gòn) trên tàu Amiral Latouche-Tréville – hành trình tiếp tục ở Phòng 02.',
    clueText: 'Vòng cuối đã hoàn thành',
  },
};
