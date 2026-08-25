export type RoomFourFlagFrameId = 'soviet-zone' | 'guangdong-zone';

export interface RoomFourFlagFrame {
  id: RoomFourFlagFrameId;
  /** The existing two-part room structure; this is not a new station. */
  zone: 'soviet' | 'guangzhou';
  position: readonly [number, number, number];
  rotation: readonly [number, number, number];
  /** Both user-provided images are normalized to the same 3:2 display size. */
  dimensions: readonly [number, number];
  textureSrc: string;
  titleVi: string;
  titleEn: string;
  timelineVi: string;
  timelineEn: string;
}

export type RoomFourQuotePanelId = 'soviet-quote' | 'guangzhou-quote';

/**
 * Wall text for the two existing historical zones. These are visual markers
 * only: neither one adds a station, interaction, collider, or route choice.
 */
export interface RoomFourQuotePanel {
  id: RoomFourQuotePanelId;
  zone: 'soviet' | 'guangzhou';
  /** Mounted on the wall opposite the flag within the same existing zone. */
  position: readonly [number, number, number];
  rotation: readonly [number, number, number];
  dimensions: readonly [number, number];
  quoteLinesVi: readonly string[];
  quoteLinesEn: readonly string[];
  attributionVi: string;
  attributionEn: string;
}

/**
 * Exactly two framed walls are reserved. Every other Room 4 wall is left
 * untouched so it can be customized independently without changing the route,
 * station layout, travel corridor, progress logic, or colliders.
 */
export const ROOM_FOUR_FLAG_FRAMES: readonly RoomFourFlagFrame[] = [
  {
    id: 'soviet-zone',
    zone: 'soviet',
    // Left side in the visitor's entry view of the existing Soviet section.
    // Scene X is mirrored against the entrance camera, hence the +X wall.
    position: [8.72, 3.82, -49.8],
    rotation: [0, -Math.PI / 2, 0],
    dimensions: [6.2, 4.133333333333334],
    textureSrc: '/images/room4/flags/soviet-flag-framed.png',
    titleVi: 'ĐẠI HỘI VI · ĐỔI MỚI',
    titleEn: '6TH CONGRESS · DOI MOI',
    timelineVi: '12/1986',
    timelineEn: 'Dec 1986',
  },
  {
    id: 'guangdong-zone',
    zone: 'guangzhou',
    // Right side in the visitor's entry view of the existing Guangzhou/
    // Guangdong section, clear of the central route and Stations 4–5.
    position: [-8.72, 3.82, -27.4],
    rotation: [0, Math.PI / 2, 0],
    dimensions: [6.2, 4.133333333333334],
    textureSrc: '/images/room4/flags/china-flag-framed.png',
    titleVi: 'HỘI NHẬP QUỐC TẾ',
    titleEn: 'INTERNATIONAL INTEGRATION',
    timelineVi: '1986–NAY',
    timelineEn: '1986–PRESENT',
  },
] as const;

/**
 * The paired quotations turn each side wall into a distinct reading moment:
 * Moscow foregrounds international solidarity; Guangzhou foregrounds the
 * organisational work that carries the journey home.
 */
export const ROOM_FOUR_QUOTE_PANELS: readonly RoomFourQuotePanel[] = [
  {
    id: 'soviet-quote',
    zone: 'soviet',
    // Opposite the Soviet flag; it faces the room rather than the corridor.
    position: [-8.72, 3.5, -49.8],
    rotation: [0, Math.PI / 2, 0],
    // Slightly oversized to give the three-line quotation a clear margin on all sides.
    dimensions: [13.2, 2.95],
    quoteLinesVi: [
      '“Nhìn thẳng vào sự thật, đánh giá đúng sự thật,',
      'nói rõ sự thật — Khởi xướng đường lối Đổi mới',
      'toàn diện và sâu sắc nền kinh tế đất nước.”',
    ],
    quoteLinesEn: [
      '“Look directly at the truth, evaluate truth accurately,',
      'and state the truth clearly — Initiating comprehensive',
      'and deep economic reform for the country.”',
    ],
    attributionVi: 'Tổng Bí thư Nguyễn Văn Linh — Đại hội VI của Đảng (12/1986)',
    attributionEn: '— General Secretary Nguyen Van Linh (1986)',
  },
  {
    id: 'guangzhou-quote',
    zone: 'guangzhou',
    // Opposite the Guangzhou flag; it remains clear of Stations 4–5.
    position: [8.72, 3.5, -27.4],
    rotation: [0, -Math.PI / 2, 0],
    // Match the Soviet quote panel so both opposing-wall displays align.
    dimensions: [13.2, 2.95],
    quoteLinesVi: [
      '“Việt Nam sẵn sàng là bạn, là đối tác tin cậy',
      'và là thành viên có trách nhiệm trong cộng đồng',
      'quốc tế vì hòa bình, hợp tác và phát triển.”',
    ],
    quoteLinesEn: [
      '“Vietnam is ready to be a friend, a reliable partner',
      'and a responsible member of the international community',
      'for peace, cooperation, and development.”',
    ],
    attributionVi: 'Đường lối đối ngoại của Đảng Cộng sản Việt Nam',
    attributionEn: '— Foreign Policy of the Communist Party of Vietnam',
  },
] as const;

export const ROOM_FOUR_PHASE_ELEVEN_TYPE_SCALE = {
  thresholdPx: 42,
  exitThresholdPx: 34,
  stationTitlePx: {
    focal: 22,
    standard: 20,
  },
  overlayTitleClass: 'text-3xl sm:text-4xl',
} as const;
