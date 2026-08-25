import type { RoomFourStationId } from './roomFourJourney';

/**
 * Phase 12 keeps the short, at-object reading layer separate from the longer
 * documentation in the station form. Each plaque has one historical moment
 * and a single deliberate way into that form.
 */
export interface RoomFourFootPlaqueContent {
  timeVi: string;
  timeEn: string;
  eventVi: string;
  eventEn: string;
}

export const ROOM_FOUR_FOOT_PLAQUES: Readonly<Record<RoomFourStationId, RoomFourFootPlaqueContent>> = {
  s1: {
    timeVi: 'Hà Nội · 12/1986',
    timeEn: 'Hanoi · Dec 1986',
    eventVi: 'Đại hội VI của Đảng khởi xướng đường lối Đổi mới toàn diện đất nước.',
    eventEn: 'The 6th Party Congress launched the comprehensive Doi Moi policy.',
  },
  s2: {
    timeVi: '1990–1995',
    timeEn: '1990–1995',
    eventVi: 'Bình thường hóa quan hệ quốc tế và gia nhập ASEAN (7/1995).',
    eventEn: 'Normalized international relations and joined ASEAN (July 1995).',
  },
  s3: {
    timeVi: '2007',
    timeEn: '2007',
    eventVi: 'Gia nhập Tổ chức Thương mại Thế giới (WTO), khẳng định vị thế.',
    eventEn: 'Joined the World Trade Organization (WTO), affirming national standing.',
  },
  s4: {
    timeVi: '1994–2010',
    timeEn: '1994–2010',
    eventVi: 'Đẩy mạnh công nghiệp hóa, hiện đại hóa và thu hút dòng vốn FDI.',
    eventEn: 'Accelerated industrialization, modernization and FDI attraction.',
  },
  s5: {
    timeVi: '1992–nay',
    timeEn: '1992–present',
    eventVi: 'Xóa đói giảm nghèo và phát triển hệ thống an sinh xã hội toàn dân.',
    eventEn: 'Poverty reduction and universal social security system development.',
  },
  s6: {
    timeVi: '2007–nay',
    timeEn: '2007–present',
    eventVi: 'Ngoại giao đa phương, đảm nhiệm thành công nhiều trọng trách quốc tế.',
    eventEn: 'Multilateral diplomacy, fulfilling major international roles.',
  },
  s7: {
    timeVi: 'Định hướng 2045',
    timeEn: 'Vision 2045',
    eventVi: 'Phấn đấu trở thành nước phát triển, thu nhập cao theo định hướng XHCN.',
    eventEn: 'Striving to become a developed, high-income nation by 2045.',
  },
  s8: {
    timeVi: '1986–nay',
    timeEn: '1986–present',
    eventVi: 'Mạng lưới Hiệp định Thương mại Tự do (FTA) và hội nhập toàn cầu.',
    eventEn: 'Free Trade Agreement (FTA) network and global integration.',
  },
} as const;
