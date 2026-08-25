import { describe, expect, it } from 'vitest';
import { ROOM_THREE_DISPLAY_NAME } from './roomThreeNarrative';

describe('Room Three narrative', () => {
  it('uses the approved display name', () => {
    expect(ROOM_THREE_DISPLAY_NAME).toBe('Phòng 03: Đảng lãnh đạo các cuộc kháng chiến (1945–1975)');
  });
});
