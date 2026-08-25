import type { RoomFourStationLayout } from './roomFourLayout';

export type RoomFourStationId = RoomFourStationLayout['id'];
export type RoomFourLanguage = 'vi' | 'en';

export interface RoomFourJourneyStep {
  id: string;
  titleVi: string;
  titleEn: string;
  detailVi: string;
  detailEn: string;
}

export interface RoomFourJourneyNarrative {
  vi: string;
  en: string;
}

/** A fixed, contextual illustration shown above the primary station text. */
export interface RoomFourJourneyIllustration {
  src: string;
  altVi: string;
  altEn: string;
  captionVi: string;
  captionEn: string;
}

export interface RoomFourJourneyContent {
  id: RoomFourStationId;
  eyebrowVi: string;
  eyebrowEn: string;
  leadVi: string;
  leadEn: string;
  illustration?: RoomFourJourneyIllustration;
  /** Optional archival material displayed after every historical paragraph. */
  closingIllustration?: RoomFourJourneyIllustration;
  historyVi: readonly string[];
  historyEn: readonly string[];
  /** The fixed exhibition rhythm: see → act → witness → understand. */
  before: RoomFourJourneyNarrative;
  action: RoomFourJourneyNarrative;
  after: RoomFourJourneyNarrative;
  meaning: RoomFourJourneyNarrative;
  steps: readonly RoomFourJourneyStep[];
  sealIds: readonly RoomFourSealId[];
}

export type RoomFourSealId =
  | 'theory'
  | 'relations'
  | 'method'
  | 'organisation'
  | 'press'
  | 'cadres'
  | 'network';

export interface RoomFourSeal {
  id: RoomFourSealId;
  labelVi: string;
  labelEn: string;
}

/**
 * The Soviet imprints are deliberately mapped here, rather than inside the
 * scene components, so the causal links remain part of Room Four's journey
 * data. The route always follows the existing floor spine from source to
 * destination; it does not introduce another historical zone.
 */
export interface RoomFourSealLink {
  sourceStationId: RoomFourStationId;
  targetStationIds: readonly RoomFourStationId[];
}

export const ROOM_FOUR_PROGRESS_PREFIX = 'room4:v2:';

export const ROOM_FOUR_SEALS: readonly RoomFourSeal[] = [
  { id: 'theory', labelVi: 'Đường lối', labelEn: 'Policy' },
  { id: 'relations', labelVi: 'Kinh tế', labelEn: 'Economy' },
  { id: 'method', labelVi: 'Hội nhập', labelEn: 'Integration' },
  { id: 'organisation', labelVi: 'Xã hội', labelEn: 'Society' },
  { id: 'press', labelVi: 'Đối ngoại', labelEn: 'Diplomacy' },
  { id: 'cadres', labelVi: 'Đổi mới', labelEn: 'Renewal' },
  { id: 'network', labelVi: 'Phát triển', labelEn: 'Development' },
] as const;

/**
 * Moscow → Guangzhou cause-and-effect links used by Phase 8.
 *
 * Theory becomes cadre training and the press; international relations become
 * reception and communications; method becomes the Ly Thuy base, clandestine
 * organisation, training, and routes home.
 */
export const ROOM_FOUR_SEAL_LINKS: Readonly<
  Partial<Record<RoomFourSealId, RoomFourSealLink>>
> = {
  theory: {
    sourceStationId: 's1',
    targetStationIds: ['s6', 's7'],
  },
  relations: {
    sourceStationId: 's2',
    targetStationIds: ['s4'],
  },
  method: {
    sourceStationId: 's2',
    targetStationIds: ['s4', 's5', 's7'],
  },
} as const;

export const ROOM_FOUR_JOURNEY_ORDER: readonly RoomFourStationId[] = [
  's1',
  's2',
  's3',
  's4',
  's5',
  's6',
  's7',
] as const;

/** The Room Four journey begins directly at Station 1 and ends at the Guangzhou training class. */
export const ROOM_FOUR_STATION_IDS = ROOM_FOUR_JOURNEY_ORDER;

/**
 * The five outcomes that must remain visible at the Return Map after the
 * finale: learning becomes organisation, press, cadres and a network home.
 */
export const ROOM_FOUR_FINALE_SEAL_IDS = [
  'theory',
  'organisation',
  'press',
  'cadres',
  'network',
] as const satisfies readonly RoomFourSealId[];

export const ROOM_FOUR_JOURNEY_CONTENT: Readonly<Record<RoomFourStationId, RoomFourJourneyContent>> = {
  s1: {
    id: 's1',
    eyebrowVi: 'Trạm 01 · Đại hội VI · Hà Nội · 12/1986',
    eyebrowEn: 'Station 01 · 6th Congress · Hanoi · Dec 1986',
    leadVi: 'Đại hội VI (12/1986) của Đảng đề ra đường lối Đổi mới toàn diện đất nước, chuyển từ cơ chế tập trung quan liêu bao cấp sang nền kinh tế hàng hóa nhiều thành phần.',
    leadEn: 'The 6th Congress (Dec 1986) launched the comprehensive Doi Moi reform, shifting from a centrally planned economy to a multi-sector commodity economy.',
    illustration: {
      src: '/images/room4/anhphong1.jpg',
      altVi: 'Đại hội Đại biểu toàn quốc lần thứ VI của Đảng Cộng sản Việt Nam tháng 12 năm 1986.',
      altEn: 'The 6th National Congress of the Communist Party of Vietnam, December 1986.',
      captionVi: 'Đại hội VI (12/1986) — Đại hội khởi xướng đường lối Đổi mới lịch sử.',
      captionEn: '6th Congress (Dec 1986) — The Congress that launched the historic Doi Moi reform.',
    },
    historyVi: [
      'Tháng 12/1986, Đại hội lần thứ VI của Đảng Cộng sản Việt Nam đã đề ra đường lối Đổi mới toàn diện đất nước.',
      'Đại hội xác định đổi mới kinh tế là trung tâm, chuyển sang nền kinh tế thị trường định hướng xã hội chủ nghĩa.',
      'Đây là bước ngoặt lịch sử, mở ra thời kỳ phát triển mới của đất nước Việt Nam.',
    ],
    historyEn: [
      'In December 1986, the 6th Congress of the Communist Party of Vietnam launched the comprehensive Doi Moi reform.',
      'The Congress determined that economic reform was central, transitioning to a socialist-oriented market economy.',
      'This was a historic turning point, opening a new era of development for Vietnam.',
    ],
    before: {
      vi: 'Đại hội VI (12/1986) — Khởi xướng đường lối Đổi mới lịch sử',
      en: '6th Congress (Dec 1986) — Launching the historic Doi Moi policy',
    },
    action: {
      vi: 'Mở lần lượt ba nội dung đổi mới',
      en: 'Open the three reform pillars in sequence',
    },
    after: {
      vi: 'Ba trụ cột đổi mới về kinh tế, chính trị và tư tưởng hiện ra.',
      en: 'Three reform pillars — economy, politics, and thought — are revealed.',
    },
    meaning: {
      vi: 'Đổi mới để phát triển và hội nhập.',
      en: 'Reform for development and integration.',
    },
    steps: [
      {
        id: 'theory',
        titleVi: 'Đổi mới tư duy',
        titleEn: 'Renew thinking',
        detailVi: 'Nhìn thẳng vào sự thật, đánh giá đúng thực trạng để đổi mới tư duy lãnh đạo.',
        detailEn: 'Face reality squarely and accurately assess the situation to renew leadership thinking.',
      },
      {
        id: 'soviet-practice',
        titleVi: 'Đổi mới kinh tế',
        titleEn: 'Economic reform',
        detailVi: 'Chuyển sang nền kinh tế hàng hóa nhiều thành phần vận hành theo cơ chế thị trường.',
        detailEn: 'Transition to a multi-sector commodity economy operating under market mechanisms.',
      },
      {
        id: 'colonial-peoples',
        titleVi: 'Mở cửa và hội nhập',
        titleEn: 'Opening up and integration',
        detailVi: 'Thực hiện chính sách đối ngoại đa phương hóa, đa dạng hóa quan hệ quốc tế.',
        detailEn: 'Pursue a foreign policy of multilateralisation and diversification of international relations.',
      },
    ],
    sealIds: ['theory'],
  },
  s2: {
    id: 's2',
    eyebrowVi: 'Trạm 02 · Bình thường hóa quan hệ · 1990–1995',
    eyebrowEn: 'Station 02 · Normalization of Relations · 1990–1995',
    leadVi: 'Đảng lãnh đạo phá thế bao vây, cấm vận, bình thường hóa quan hệ với các nước lớn và gia nhập ASEAN, mở ra thời kỳ hội nhập quốc tế toàn diện.',
    leadEn: 'The Party broke the embargo, normalized relations with major powers, and joined ASEAN, opening a comprehensive era of international integration.',
    illustration: {
      src: '/images/room4/anhphong2.jpg',
      altVi: 'Lễ kết nạp Việt Nam vào ASEAN tháng 7 năm 1995.',
      altEn: 'Vietnam joining ASEAN in July 1995.',
      captionVi: 'Việt Nam gia nhập ASEAN (7/1995) — Cột mốc quan trọng trong hội nhập khu vực.',
      captionEn: 'Vietnam joins ASEAN (July 1995) — A landmark in regional integration.',
    },
    historyVi: [
      'Năm 1991, Việt Nam bình thường hóa quan hệ với Trung Quốc sau thời kỳ căng thẳng.',
      'Năm 1994, Mỹ dỡ bỏ lệnh cấm vận kinh tế đối với Việt Nam.',
      'Năm 1995, Việt Nam bình thường hóa quan hệ với Hoa Kỳ và trở thành thành viên chính thức của ASEAN.',
    ],
    historyEn: [
      'In 1991, Vietnam normalized relations with China after a period of tension.',
      'In 1994, the United States lifted the economic embargo on Vietnam.',
      'In 1995, Vietnam normalized relations with the United States and became a full member of ASEAN.',
    ],
    before: {
      vi: 'Phá thế bao vây, bình thường hóa quan hệ quốc tế',
      en: 'Breaking the embargo and normalizing international relations',
    },
    action: {
      vi: 'Mở lần lượt ba mốc bình thường hóa',
      en: 'Open the three normalization milestones in sequence',
    },
    after: {
      vi: 'Ba mốc quan hệ sáng lên, Việt Nam hội nhập với khu vực và thế giới.',
      en: 'Three diplomatic milestones illuminate as Vietnam integrates with the region and world.',
    },
    meaning: {
      vi: 'Hội nhập quốc tế mở ra cơ hội phát triển mới.',
      en: 'International integration opens new opportunities for development.',
    },
    steps: [
      {
        id: 'peasant-international',
        titleVi: 'Bình thường hóa với Trung Quốc · 1991',
        titleEn: 'Normalization with China · 1991',
        detailVi: 'Bình thường hóa quan hệ Việt – Trung, mở đường phát triển giao thương biên giới.',
        detailEn: 'Normalizing Vietnam-China relations, opening border trade development.',
      },
      {
        id: 'comintern-v',
        titleVi: 'Mỹ dỡ bỏ cấm vận · 1994',
        titleEn: 'US lifts embargo · 1994',
        detailVi: 'Hoa Kỳ dỡ bỏ lệnh cấm vận kinh tế, mở ra cơ hội đầu tư nước ngoài lớn.',
        detailEn: 'The US lifted the economic embargo, opening major foreign investment opportunities.',
      },
      {
        id: 'red-labour-unions',
        titleVi: 'Gia nhập ASEAN · 7/1995',
        titleEn: 'Join ASEAN · July 1995',
        detailVi: 'Việt Nam trở thành thành viên chính thức thứ 7 của Hiệp hội các quốc gia Đông Nam Á.',
        detailEn: 'Vietnam became the 7th full member of the Association of Southeast Asian Nations.',
      },
    ],
    sealIds: ['relations', 'method'],
  },
  s3: {
    id: 's3',
    eyebrowVi: 'Trạm 03 · Hành trình đến Quảng Châu · 11/1924',
    eyebrowEn: 'Station 03 · Journey to Guangzhou · Nov 1924',
    leadVi: 'Hồ sơ hành trình đánh dấu bước chuyển từ Liên Xô đến Quảng Châu, nơi một nhiệm vụ tổ chức mới bắt đầu.',
    leadEn: 'The travel dossier marks the move from the Soviet Union to Guangzhou, where a new organisational mission began.',
    historyVi: [
      'Tháng 11/1924, Nguyễn Ái Quốc được cử đến Quảng Châu với tư cách Ủy viên Ban Phương Đông Quốc tế Cộng sản và Ủy viên Đoàn Chủ tịch Quốc tế Nông dân.',
    ],
    historyEn: [
      'In November 1924, Nguyen Ai Quoc was sent to Guangzhou as a member of the Eastern Bureau of the Communist International and of the Presidium of the Peasant International.',
    ],
    before: {
      vi: 'Hồ sơ hành trình đến Quảng Châu',
      en: 'Travel dossier to Guangzhou',
    },
    action: {
      vi: 'Quan sát tuyến Liên Xô – Quảng Châu',
      en: 'View the Soviet Union–Guangzhou route',
    },
    after: {
      vi: 'Dấu Lý Thụy tại điểm đến mở ra trạm kế tiếp ở Quảng Châu.',
      en: 'The Ly Thuy mark at the destination opens the next station in Guangzhou.',
    },
    meaning: {
      vi: 'Hành trình đưa sự chuẩn bị quốc tế vào thực tiễn cách mạng Việt Nam.',
      en: 'The journey brought international preparation into the practice of Vietnam’s revolution.',
    },
    steps: [
      {
        id: 'soviet-to-guangzhou-route',
        titleVi: 'Liên Xô → Quảng Châu · 11/1924',
        titleEn: 'Soviet Union → Guangzhou · Nov 1924',
        detailVi: 'Tuyến hành trình đưa Nguyễn Ái Quốc từ môi trường học tập quốc tế tới căn cứ hoạt động mới.',
        detailEn: 'The route carried Nguyen Ai Quoc from the international learning environment to a new operational base.',
      },
      {
        id: 'ly-thuy-destination-mark',
        titleVi: 'Dấu đến · Lý Thụy',
        titleEn: 'Arrival mark · Ly Thuy',
        detailVi: 'Bí danh Lý Thụy được nhấn tại điểm đến, dẫn sang câu chuyện của Trạm 04.',
        detailEn: 'The Ly Thuy alias is marked at the destination, leading into Station 04.',
      },
    ],
    sealIds: [],
  },
  s4: {
    id: 's4',
    eyebrowVi: 'Trạm 04 · Công nghiệp hóa, Hiện đại hóa · 1994–2010',
    eyebrowEn: 'Station 04 · Industrialization & Modernization · 1994–2010',
    leadVi: 'Đảng lãnh đạo đẩy mạnh công nghiệp hóa, hiện đại hóa đất nước, thu hút đầu tư nước ngoài và phát triển các khu công nghiệp, khu kinh tế.',
    leadEn: 'The Party led the drive for industrialization and modernization, attracting foreign investment and developing industrial zones and economic zones.',
    historyVi: [
      'Từ những năm 1990, Việt Nam đẩy mạnh thu hút đầu tư trực tiếp nước ngoài (FDI), xây dựng các khu công nghiệp, khu chế xuất.',
      'Nhiều tập đoàn đa quốc gia lớn như Samsung, Intel, LG đã đầu tư vào Việt Nam, biến Việt Nam thành trung tâm sản xuất của khu vực.',
    ],
    historyEn: [
      'From the 1990s, Vietnam accelerated attraction of foreign direct investment, building industrial zones and export processing zones.',
      'Major multinationals such as Samsung, Intel, and LG invested in Vietnam, making it a regional manufacturing hub.',
    ],
    before: {
      vi: 'Công nghiệp hóa, hiện đại hóa — Thu hút FDI và xây dựng khu công nghiệp',
      en: 'Industrialization and modernization — Attracting FDI and building industrial zones',
    },
    action: {
      vi: 'Quan sát quá trình công nghiệp hóa đất nước',
      en: 'View the country\'s industrialization process',
    },
    after: {
      vi: 'Các khu công nghiệp và dòng vốn FDI làm rõ sự chuyển đổi cơ cấu kinh tế Việt Nam.',
      en: 'Industrial zones and FDI flows illustrate the structural transformation of Vietnam\'s economy.',
    },
    meaning: {
      vi: 'Công nghiệp hóa đưa Việt Nam trở thành công xưởng của khu vực.',
      en: 'Industrialization made Vietnam a regional manufacturing hub.',
    },
    steps: [
      {
        id: 'ly-thuy-alias',
        titleVi: 'Thu hút FDI · 1988–nay',
        titleEn: 'Attracting FDI · 1988–present',
        detailVi: 'Luật Đầu tư nước ngoài (1987) mở đường thu hút hàng trăm tỷ USD vốn FDI vào Việt Nam.',
        detailEn: 'The Foreign Investment Law (1987) paved the way for attracting hundreds of billions of USD in FDI.',
      },
      {
        id: 'public-interpreter-role',
        titleVi: 'Khu công nghiệp, khu chế xuất',
        titleEn: 'Industrial and export processing zones',
        detailVi: 'Hàng trăm khu công nghiệp, khu chế xuất được xây dựng trên cả nước, thu hút các tập đoàn đa quốc gia.',
        detailEn: 'Hundreds of industrial and export processing zones were built nationwide, attracting multinational corporations.',
      },
    ],
    sealIds: [],
  },
  s5: {
    id: 's5',
    eyebrowVi: 'Trạm 05 · Xóa đói giảm nghèo & An sinh xã hội · 1992–nay',
    eyebrowEn: 'Station 05 · Poverty Reduction & Social Security · 1992–present',
    leadVi: 'Đảng lãnh đạo triển khai các chương trình xóa đói giảm nghèo quy mô lớn, phát triển hệ thống bảo hiểm xã hội, y tế và giáo dục toàn dân.',
    leadEn: 'The Party led large-scale poverty reduction programs and developed universal social insurance, healthcare and education systems.',
    illustration: {
      src: '/images/room4/anhphong3.jpg',
      altVi: 'Chương trình xóa đói giảm nghèo và phát triển kinh tế xã hội vùng nông thôn Việt Nam.',
      altEn: 'Vietnam\'s poverty reduction program and rural socioeconomic development.',
      captionVi: 'Chương trình xóa đói giảm nghèo — Thành tựu nổi bật của Đảng và Nhà nước.',
      captionEn: 'Poverty reduction program — A outstanding achievement of the Party and State.',
    },
    historyVi: [
      'Việt Nam đã giảm tỷ lệ hộ nghèo từ hơn 60% (1990) xuống còn dưới 3% (2023), được Liên Hợp Quốc ghi nhận là điểm sáng về xóa đói giảm nghèo.',
      'Hệ thống bảo hiểm y tế toàn dân được triển khai, đến năm 2023 độ bao phủ đạt trên 93% dân số.',
      'Giáo dục phổ cập được thực hiện từ tiểu học đến trung học cơ sở, tỷ lệ xóa mù chữ đạt trên 97%.',
    ],
    historyEn: [
      'Vietnam reduced the poverty rate from over 60% (1990) to below 3% (2023), recognized by the UN as a shining example of poverty reduction.',
      'A universal health insurance system was deployed, reaching over 93% population coverage by 2023.',
      'Compulsory education from primary to lower secondary was implemented, with a literacy rate exceeding 97%.',
    ],
    before: {
      vi: 'Xóa đói giảm nghèo — Thành tựu vĩ đại của Đảng vì dân',
      en: 'Poverty reduction — A great Party achievement for the people',
    },
    action: {
      vi: 'Kết nối ba trụ cột an sinh xã hội',
      en: 'Connect the three social security pillars in sequence',
    },
    after: {
      vi: 'Ba trụ cột xã hội nối thành mạng lưới an sinh toàn diện.',
      en: 'Three social pillars connect into a comprehensive social safety net.',
    },
    meaning: {
      vi: 'Phát triển vì con người là mục tiêu tối thượng của Đảng.',
      en: 'Human-centered development is the Party\'s supreme goal.',
    },
    steps: [
      {
        id: 'communist-group',
        titleVi: 'Xóa đói giảm nghèo · 1992–nay',
        titleEn: 'Poverty reduction · 1992–present',
        detailVi: 'Tỷ lệ hộ nghèo giảm từ hơn 60% (1990) xuống dưới 3% (2023).',
        detailEn: 'Poverty rate reduced from over 60% (1990) to below 3% (2023).',
      },
      {
        id: 'youth-league',
        titleVi: 'Bảo hiểm y tế toàn dân',
        titleEn: 'Universal health insurance',
        detailVi: 'Hệ thống bảo hiểm y tế toàn dân bao phủ trên 93% dân số vào năm 2023.',
        detailEn: 'Universal health insurance covering over 93% of the population by 2023.',
      },
      {
        id: 'domestic-bases',
        titleVi: 'Phổ cập giáo dục',
        titleEn: 'Universal education',
        detailVi: 'Tỷ lệ xóa mù chữ đạt trên 97%, giáo dục phổ cập đến hết trung học cơ sở.',
        detailEn: 'Literacy rate exceeds 97%, with compulsory education through lower secondary school.',
      },
    ],
    sealIds: ['organisation'],
  },
  s6: {
    id: 's6',
    eyebrowVi: 'Trạm 06 · Ngoại giao đa phương · 2007–nay',
    eyebrowEn: 'Station 06 · Multilateral Diplomacy · 2007–present',
    leadVi: 'Việt Nam chủ động hội nhập quốc tế sâu rộng, đảm nhiệm thành công nhiều trọng trách quốc tế: Ủy viên không thường trực HĐBA LHQ, Chủ tịch ASEAN và đăng cai nhiều hội nghị quốc tế lớn.',
    leadEn: 'Vietnam proactively deepened international integration, successfully fulfilling major international roles: UN Security Council non-permanent member, ASEAN Chair, and hosting major international conferences.',
    illustration: {
      src: '/images/room4/anhphong4.jpg',
      altVi: 'Việt Nam chủ trì Hội nghị Thượng đỉnh ASEAN và các diễn đàn quốc tế lớn.',
      altEn: 'Vietnam chairing the ASEAN Summit and major international forums.',
      captionVi: 'Việt Nam — Thành viên tích cực và có trách nhiệm trong cộng đồng quốc tế.',
      captionEn: 'Vietnam — An active and responsible member of the international community.',
    },
    historyVi: [
      'Năm 2007 và 2020, Việt Nam được bầu làm Ủy viên không thường trực Hội đồng Bảo an Liên Hợp Quốc.',
      'Năm 2010 và 2020, Việt Nam giữ vai trò Chủ tịch ASEAN, thúc đẩy đoàn kết và hợp tác khu vực.',
      'Năm 2006 và 2017, Việt Nam đăng cai tổ chức Hội nghị cấp cao APEC, khẳng định vị thế quốc tế.',
    ],
    historyEn: [
      'In 2007 and 2020, Vietnam was elected as a non-permanent member of the UN Security Council.',
      'In 2010 and 2020, Vietnam served as ASEAN Chair, promoting regional solidarity and cooperation.',
      'In 2006 and 2017, Vietnam hosted the APEC Leaders\' Summit, affirming its international standing.',
    ],
    before: {
      vi: 'Việt Nam — Thành viên tích cực và có trách nhiệm của cộng đồng quốc tế',
      en: 'Vietnam — An active and responsible member of the international community',
    },
    action: {
      vi: 'Quan sát các mốc ngoại giao đa phương của Việt Nam',
      en: 'View Vietnam\'s multilateral diplomacy milestones',
    },
    after: {
      vi: 'Các mốc ngoại giao cho thấy vị thế và uy tín quốc tế ngày càng nâng cao của Việt Nam.',
      en: 'The diplomatic milestones show Vietnam\'s increasingly elevated international standing and prestige.',
    },
    meaning: {
      vi: 'Đảng xây dựng Việt Nam trở thành thành viên tích cực và có trách nhiệm trong cộng đồng quốc tế.',
      en: 'The Party built Vietnam into an active and responsible member of the international community.',
    },
    steps: [
      {
        id: 'view-newspaper-page',
        titleVi: 'Ủy viên HĐBA LHQ · 2007 & 2020',
        titleEn: 'UN Security Council member · 2007 & 2020',
        detailVi: 'Việt Nam được bầu vào HĐBA LHQ hai lần, thể hiện uy tín và vị thế quốc tế.',
        detailEn: 'Vietnam was elected to the UN Security Council twice, demonstrating international prestige and standing.',
      },
    ],
    sealIds: ['press'],
  },
  s7: {
    id: 's7',
    eyebrowVi: 'Trạm 07 · Quảng Châu · 1926–1927',
    eyebrowEn: 'Station 07 · Guangzhou · 1926–1927',
    leadVi: 'Từ đầu năm 1926 đến tháng 4/1927, Nguyễn Ái Quốc trực tiếp mở ba lớp huấn luyện chính trị cho 75 thanh niên Việt Nam ưu tú tại Quảng Châu.',
    leadEn: 'From early 1926 to April 1927, Nguyen Ai Quoc directly led three political training classes for 75 outstanding Vietnamese youths in Guangzhou.',
    illustration: {
      src: '/images/room4/station7/nguyen-ai-quoc-guangzhou-training.png',
      altVi: 'Nguyễn Ái Quốc đứng giảng bài cho học viên trong lớp huấn luyện chính trị ở Quảng Châu.',
      altEn: 'Nguyen Ai Quoc teaching students in a political training class in Guangzhou.',
      captionVi: 'Nguyễn Ái Quốc và lớp huấn luyện chính trị ở Quảng Châu.',
      captionEn: 'Nguyen Ai Quoc and the political training class in Guangzhou.',
    },
    historyVi: [
      'Ba lớp đã bồi dưỡng những thanh niên yêu nước về chủ nghĩa cộng sản và phương pháp cách mạng mới.',
      'Nhiều học viên sau đó trở về nước tổ chức, phát triển phong trào cách mạng Việt Nam.',
    ],
    historyEn: [
      'The three classes prepared patriotic young people in communism and a new revolutionary method.',
      'Many students later returned to Vietnam to organise and develop the revolutionary movement.',
    ],
    closingIllustration: {
      src: '/images/room4/station7/duong-kach-menh-cover.png',
      altVi: 'Bìa sách Đường Kách mệnh.',
      altEn: 'The cover of The Revolutionary Path.',
      captionVi: 'Sách “Đường Kách mệnh” tập hợp những bài giảng của Nguyễn Ái Quốc trong những năm 1925-1927 tại các lớp huấn luyện đào tạo cán bộ cho cách mạng Việt Nam tại Quảng Châu, Trung Quốc.',
      captionEn: 'The Revolutionary Path collected Nguyen Ai Quoc’s lectures from 1925 to 1927 for cadre-training classes in Guangzhou, China.',
    },
    before: {
      vi: 'Nguyễn Ái Quốc và lớp huấn luyện chính trị ở Quảng Châu',
      en: 'Nguyen Ai Quoc and the political training class in Guangzhou',
    },
    action: {
      vi: 'Quan sát lớp huấn luyện chính trị',
      en: 'View the political training class',
    },
    after: {
      vi: 'Ảnh tư liệu làm rõ vai trò đào tạo cán bộ tại Quảng Châu.',
      en: 'The archival photo highlights the cadre-training work in Guangzhou.',
    },
    meaning: {
      vi: 'Những hạt giống đỏ được bồi dưỡng để trở về phục vụ cách mạng Việt Nam.',
      en: 'The first revolutionary cadres were prepared to return and serve Vietnam’s revolution.',
    },
    steps: [
      {
        id: 'view-training-class',
        titleVi: 'Ba lớp huấn luyện · 75 học viên',
        titleEn: 'Three classes · 75 students',
        detailVi: 'Các học viên được chuẩn bị để trở về gây dựng phong trào cách mạng trong nước.',
        detailEn: 'The students were prepared to return and build the revolutionary movement in Vietnam.',
      },
    ],
    sealIds: ['cadres'],
  },
  s8: {
    id: 's8',
    eyebrowVi: 'Trạm 08 · Mạng lưới hội nhập toàn cầu',
    eyebrowEn: 'Station 08 · Global Integration Network',
    leadVi: 'Việt Nam đã ký kết hơn 17 Hiệp định Thương mại Tự do (FTA), trở thành một trong những nền kinh tế mở nhất thế giới, kết nối chặt chẽ với nền kinh tế toàn cầu.',
    leadEn: 'Vietnam has signed over 17 Free Trade Agreements (FTAs), becoming one of the world\'s most open economies, closely connected to the global economy.',
    historyVi: [
      'Việt Nam đã tham gia và ký kết hơn 17 FTA với các đối tác chiếm hơn 90% GDP toàn cầu.',
      'Các FTA thế hệ mới như CPTPP, EVFTA đã mở ra thị trường rộng lớn cho hàng xuất khẩu Việt Nam.',
      'Kim ngạch xuất nhập khẩu của Việt Nam đạt gần 700 tỷ USD (2022), gấp hơn 100 lần so với năm 1986.',
    ],
    historyEn: [
      'Vietnam has participated in and signed over 17 FTAs with partners accounting for over 90% of global GDP.',
      'Next-generation FTAs like CPTPP and EVFTA opened vast markets for Vietnamese exports.',
      'Vietnam\'s total trade value reached nearly 700 billion USD (2022), more than 100 times that of 1986.',
    ],
    before: {
      vi: 'Mạng lưới FTA kết nối Việt Nam với nền kinh tế toàn cầu.',
      en: 'The FTA network connects Vietnam to the global economy.',
    },
    action: {
      vi: 'Kích hoạt bốn trục hội nhập kinh tế quốc tế',
      en: 'Activate the four international economic integration axes',
    },
    after: {
      vi: 'Bản đồ mạng lưới FTA trở thành một hệ thống hội nhập hoàn chỉnh.',
      en: 'The FTA network map becomes a complete integration system.',
    },
    meaning: {
      vi: 'Đảng đưa Việt Nam trở thành quốc gia hội nhập sâu rộng với nền kinh tế thế giới.',
      en: 'The Party brought Vietnam into deep and extensive integration with the world economy.',
    },
    steps: [
      {
        id: 'route-mong-cai',
        titleVi: 'ASEAN & AFTA',
        titleEn: 'ASEAN & AFTA',
        detailVi: 'Thương mại tự do trong khối ASEAN tạo nền tảng hội nhập khu vực.',
        detailEn: 'Free trade within ASEAN created the foundation for regional integration.',
      },
      {
        id: 'route-lang-son',
        titleVi: 'CPTPP · 2018',
        titleEn: 'CPTPP · 2018',
        detailVi: 'Hiệp định Đối tác Toàn diện và Tiến bộ xuyên Thái Bình Dương mở ra thị trường 500 triệu dân.',
        detailEn: 'The CPTPP opened a market of 500 million people across the Asia-Pacific region.',
      },
      {
        id: 'route-hong-kong',
        titleVi: 'EVFTA · 2020',
        titleEn: 'EVFTA · 2020',
        detailVi: 'Hiệp định Thương mại Tự do EU – Việt Nam mở cửa thị trường EU với 450 triệu người tiêu dùng.',
        detailEn: 'The EU-Vietnam FTA opened the EU market with 450 million consumers.',
      },
      {
        id: 'route-siam',
        titleVi: 'Quan hệ đối tác chiến lược toàn diện',
        titleEn: 'Comprehensive strategic partnerships',
        detailVi: 'Việt Nam thiết lập quan hệ Đối tác Chiến lược Toàn diện với 7 đối tác lớn nhất thế giới.',
        detailEn: 'Vietnam established Comprehensive Strategic Partnerships with the 7 largest global partners.',
      },
    ],
    sealIds: ['network'],
  },
} as const;

export function roomFourStepToken(stationId: RoomFourStationId, stepId: string): string {
  return `${ROOM_FOUR_PROGRESS_PREFIX}step:${stationId}:${stepId}`;
}

export function roomFourCompletionToken(stationId: RoomFourStationId): string {
  return `${ROOM_FOUR_PROGRESS_PREFIX}complete:${stationId}`;
}

export function roomFourSealToken(sealId: RoomFourSealId): string {
  return `${ROOM_FOUR_PROGRESS_PREFIX}seal:${sealId}`;
}

/** Persisted only after the one-time Station 8 convergence has finished. */
export function roomFourFinaleToken(): string {
  return `${ROOM_FOUR_PROGRESS_PREFIX}finale:return-map`;
}

export function isRoomFourJourneyToken(token: string): boolean {
  return token.startsWith(ROOM_FOUR_PROGRESS_PREFIX);
}

export function getNextRoomFourStation(progress: readonly string[]): RoomFourStationId | null {
  return (
    ROOM_FOUR_JOURNEY_ORDER.find(
      (stationId) => !progress.includes(roomFourCompletionToken(stationId)),
    ) ?? null
  );
}

export function getRoomFourStationProgress(
  progress: readonly string[],
  stationId: RoomFourStationId,
): number {
  const station = ROOM_FOUR_JOURNEY_CONTENT[stationId];
  return station.steps.filter((step) => progress.includes(roomFourStepToken(stationId, step.id))).length;
}

/**
 * Phase 9 guard. A finale can never be unlocked by merely finishing the four
 * map routes: every one of the eight stations must already be complete.
 */
export function isRoomFourFinaleReady(progress: readonly string[]): boolean {
  return ROOM_FOUR_STATION_IDS.every((stationId) =>
    progress.includes(roomFourCompletionToken(stationId)),
  );
}
