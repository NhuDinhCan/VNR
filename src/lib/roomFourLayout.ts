import spatial from './roomFourSpatial.json';

export type RoomFourStationKind =
  | 'study-desk'
  | 'forum-globe'
  | 'guangzhou-travel-dossier'
  | 'ly-thuy-identity-desk'
  | 'guangzhou-headquarters'
  | 'thanh-nien-newspaper-photo'
  | 'guangzhou-training-photo'
  | 'secret-classroom'
  | 'return-map';

export interface RoomFourStationLayout {
  id: 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 's7' | 's8';
  index: number;
  section: 'threshold' | 'soviet' | 'guangzhou';
  kind: RoomFourStationKind;
  object: readonly [number, number];
  stop: readonly [number, number];
  footprint: readonly [number, number];
  dateVi: string;
  dateEn: string;
  titleVi: string;
  titleEn: string;
  purposeVi: string;
  purposeEn: string;
  focalLevel: 1 | 2 | 3;
}

export interface RoomFourCollider {
  id: string;
  center: readonly [number, number];
  size: readonly [number, number];
}

export interface RoomFourPortalLayout {
  id: string;
  z: number;
  halfSpan: number;
  skin: 'cold-frame' | 'warm-wood' | 'warm-frame';
}

export const ROOM_FOUR_SPATIAL = spatial;

export const ROOM_FOUR_CENTERLINE: ReadonlyArray<readonly [number, number]> = [
  [0, -74],
  [-2.8, -70.2],
  [1.8, -63],
  [-0.3, -54.8],
  [1.8, -46.2],
  [0.5, -42],
  [-0.5, -34.8],
  [-1.8, -30.7],
  [0.5, -23.2],
  [-1.6, -16.2],
  [1.3, -8.8],
  [-1.6, -1.3],
  [0, 4],
];

export const ROOM_FOUR_PORTALS: readonly RoomFourPortalLayout[] = [
  { id: 'soviet-threshold', z: -67, halfSpan: 7.7, skin: 'cold-frame' },
  { id: 'transition-cold', z: -42, halfSpan: 4.6, skin: 'cold-frame' },
  { id: 'transition-warm', z: -34, halfSpan: 4.6, skin: 'warm-wood' },
  { id: 'exit-threshold', z: 2, halfSpan: 7.7, skin: 'warm-frame' },
] as const;

export const ROOM_FOUR_STATIONS: readonly RoomFourStationLayout[] = [
  {
    id: 's1',
    index: 1,
    section: 'soviet',
    kind: 'study-desk',
    object: [4.9, -63],
    stop: [1.8, -63],
    footprint: [3.6, 3.2],
    dateVi: 'Hà Nội · 12/1986',
    dateEn: 'Hanoi · Dec 1986',
    titleVi: 'Đại hội VI — Khởi xướng đường lối Đổi mới',
    titleEn: '6th Congress — Launching Doi Moi',
    purposeVi: 'Đổi mới tư duy và phát triển kinh tế',
    purposeEn: 'Renewing thinking and economic development',
    focalLevel: 2,
  },
  {
    id: 's2',
    index: 2,
    section: 'soviet',
    kind: 'forum-globe',
    object: [-3.6, -54.8],
    stop: [-0.3, -54.8],
    footprint: [4.4, 4.4],
    dateVi: '1990–1995',
    dateEn: '1990–1995',
    titleVi: 'Bình thường hóa quan hệ & Gia nhập ASEAN',
    titleEn: 'Normalization & Joining ASEAN',
    purposeVi: 'Phá thế bao vây · Mở rộng đối ngoại',
    purposeEn: 'Breaking isolation · Expanding diplomacy',
    focalLevel: 1,
  },
  {
    id: 's3',
    index: 3,
    section: 'soviet',
    kind: 'guangzhou-travel-dossier',
    object: [4.9, -46.2],
    stop: [1.8, -46.2],
    footprint: [3.5, 2.6],
    dateVi: '2007',
    dateEn: '2007',
    titleVi: 'Gia nhập Tổ chức Thương mại Thế giới (WTO)',
    titleEn: 'Accession to World Trade Organization (WTO)',
    purposeVi: 'Hội nhập kinh tế toàn diện',
    purposeEn: 'Comprehensive economic integration',
    focalLevel: 2,
  },
  {
    id: 's4',
    index: 4,
    section: 'guangzhou',
    kind: 'ly-thuy-identity-desk',
    object: [-5, -30.7],
    stop: [-1.8, -30.7],
    footprint: [3.3, 2.8],
    dateVi: '1994–2010',
    dateEn: '1994–2010',
    titleVi: 'Công nghiệp hóa, Hiện đại hóa & Thu hút FDI',
    titleEn: 'Industrialization, Modernization & FDI',
    purposeVi: 'Xây dựng hạ tầng · Phát triển công nghiệp',
    purposeEn: 'Building infrastructure · Industrial growth',
    focalLevel: 2,
  },
  {
    id: 's5',
    index: 5,
    section: 'guangzhou',
    kind: 'guangzhou-headquarters',
    object: [3.9, -23.2],
    stop: [0.5, -23.2],
    footprint: [4.2, 4.2],
    dateVi: '1992–nay',
    dateEn: '1992–present',
    titleVi: 'Xóa đói giảm nghèo & An sinh xã hội',
    titleEn: 'Poverty Reduction & Social Security',
    purposeVi: 'Tăng trưởng kinh tế đi đôi với tiến bộ xã hội',
    purposeEn: 'Economic growth with social progress',
    focalLevel: 2,
  },
  {
    id: 's6',
    index: 6,
    section: 'guangzhou',
    kind: 'thanh-nien-newspaper-photo',
    object: [-5, -16.2],
    stop: [-1.6, -16.2],
    footprint: [3.8, 3],
    dateVi: '2007–nay',
    dateEn: '2007–present',
    titleVi: 'Ngoại giao đa phương & Vị thế quốc tế',
    titleEn: 'Multilateral Diplomacy & Global Standing',
    purposeVi: 'Nâng cao uy tín Việt Nam trên trường quốc tế',
    purposeEn: 'Elevating Vietnam\'s global standing',
    focalLevel: 1,
  },
  {
    id: 's7',
    index: 7,
    section: 'guangzhou',
    kind: 'guangzhou-training-photo',
    object: [4.7, -8.8],
    stop: [1.3, -8.8],
    footprint: [4, 3.2],
    dateVi: 'Tầm nhìn 2045',
    dateEn: 'Vision 2045',
    titleVi: 'Việt Nam phát triển, thu nhập cao',
    titleEn: 'Developed High-Income Vietnam',
    purposeVi: 'Đảng lãnh đạo đất nước hướng tới tương lai',
    purposeEn: 'Party leading the country into the future',
    focalLevel: 1,
  },
] as const;

const COLLIDER_PADDING = 0.35;
const PORTAL_POST_COLLIDER_SIZE: readonly [number, number] = [0.5, 0.62];

export const ROOM_FOUR_PLAYER_COLLISION_MARGIN = 0.28;
export const ROOM_FOUR_WALL_INSET = 0.3;

export const ROOM_FOUR_COLLIDERS: readonly RoomFourCollider[] = [
  ...ROOM_FOUR_STATIONS.map((station) => ({
    id: station.id,
    center: station.object,
    size: [
      station.footprint[0] + COLLIDER_PADDING * 2,
      station.footprint[1] + COLLIDER_PADDING * 2,
    ] as const,
  })),
  { id: 'transition-wing-left-a', center: [-6.6, -40.1], size: [2.5, 0.7] },
  { id: 'transition-wing-right-a', center: [6.6, -38.1], size: [2.5, 0.7] },
  { id: 'transition-wing-left-b', center: [-6.6, -36.1], size: [2.5, 0.7] },
  ...ROOM_FOUR_PORTALS.flatMap((portal) => [
    {
      id: `${portal.id}-left-post`,
      center: [-portal.halfSpan, portal.z] as const,
      size: PORTAL_POST_COLLIDER_SIZE,
    },
    {
      id: `${portal.id}-right-post`,
      center: [portal.halfSpan, portal.z] as const,
      size: PORTAL_POST_COLLIDER_SIZE,
    },
  ]),
] as const;

export function isPointWithinRoomFourBounds(localX: number, localZ: number, margin = 0): boolean {
  const halfWidth = ROOM_FOUR_SPATIAL.roomWidth / 2 - ROOM_FOUR_WALL_INSET - margin;
  return (
    Math.abs(localX) <= halfWidth &&
    localZ >= ROOM_FOUR_SPATIAL.localStartZ + ROOM_FOUR_WALL_INSET + margin &&
    localZ <= ROOM_FOUR_SPATIAL.localEndZ - ROOM_FOUR_WALL_INSET - margin
  );
}

export function isPointInsideRoomFourCollider(localX: number, localZ: number, extraMargin = 0): boolean {
  return ROOM_FOUR_COLLIDERS.some((collider) => {
    const halfWidth = collider.size[0] / 2 + extraMargin;
    const halfDepth = collider.size[1] / 2 + extraMargin;
    return (
      Math.abs(localX - collider.center[0]) < halfWidth &&
      Math.abs(localZ - collider.center[1]) < halfDepth
    );
  });
}

export function worldToRoomFourLocalZ(worldZ: number): number {
  return worldZ - spatial.worldOffsetZ;
}
