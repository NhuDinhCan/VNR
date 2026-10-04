import type { Object3D } from 'three';

// scene.getObjectByName duyệt toàn bộ cây cảnh; gọi trong useFrame của nhiều
// component (hiện vật, avatar, camera, culling phòng) khiến mỗi khung hình
// phải duyệt hàng chục lần. Cache tham chiếu theo tên và chỉ tìm lại khi
// đối tượng bị gỡ khỏi cảnh.
const cache = new Map<string, Object3D>();
const lastMissAt = new Map<string, number>();
const MISS_RETRY_MS = 250;

const isAttachedTo = (object: Object3D, root: Object3D) => {
  let node: Object3D = object;
  while (node.parent) node = node.parent;
  return node === root;
};

export function findSceneObject(scene: Object3D, name: string): Object3D | undefined {
  const cached = cache.get(name);
  if (cached && isAttachedTo(cached, scene)) return cached;
  cache.delete(name);

  // Tránh duyệt lại liên tục khi đối tượng chưa tồn tại (vd: chưa đăng nhập).
  const now = performance.now();
  const missedAt = lastMissAt.get(name);
  if (missedAt !== undefined && now - missedAt < MISS_RETRY_MS) return undefined;

  const found = scene.getObjectByName(name);
  if (found) {
    cache.set(name, found);
    lastMissAt.delete(name);
  } else {
    lastMissAt.set(name, now);
  }
  return found;
}
