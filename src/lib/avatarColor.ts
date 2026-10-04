// Màu áo nhân vật theo biệt danh: mọi máy tính ra cùng một màu cho cùng một người
// mà không cần gửi thêm dữ liệu qua mạng.
export const AVATAR_SHIRT_COLORS = [
  '#da291c', // đỏ
  '#2563eb', // xanh dương
  '#16a34a', // xanh lá
  '#f59e0b', // vàng cam
  '#9333ea', // tím
  '#0891b2', // xanh ngọc
  '#db2777', // hồng
  '#ea580c', // cam
  '#4f46e5', // chàm
  '#65a30d', // xanh nõn chuối
  '#0f766e', // xanh rêu
  '#be123c', // đỏ mận
] as const;

/**
 * Ưu tiên chỉ số màu do server cấp (mỗi người một màu khác nhau);
 * chỉ khi chưa có mới tính từ biệt danh.
 */
export function avatarColorFor(name: string | undefined | null, colorIndex?: number | null): string {
  if (typeof colorIndex === 'number' && colorIndex >= 0) {
    return AVATAR_SHIRT_COLORS[colorIndex % AVATAR_SHIRT_COLORS.length];
  }
  const key = (name ?? '').trim().toLowerCase();
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return AVATAR_SHIRT_COLORS[hash % AVATAR_SHIRT_COLORS.length];
}
