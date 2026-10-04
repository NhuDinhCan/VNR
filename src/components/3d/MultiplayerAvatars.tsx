import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useMuseum, MultiplayerUser } from "@/context/MuseumContext";
import { findSceneObject } from "@/lib/sceneLookup";
import { avatarColorFor } from "@/lib/avatarColor";
import { CHAT_BUBBLE_CLASS, syncChatBubble, type ChatBubbleSyncState } from "./chatBubble";

// ─── Kích thước dùng chung (giống PlayerCharacter) ───────────────────────────
const HEAD_R = 0.22;
const TORSO_R = 0.175;
const TORSO_H = 0.3;

const ARM_R = 0.068;
const ARM_LEN = 0.22;

const LEG_R = 0.075;
const LEG_LEN = 0.22;

const TORSO_TOP = 0.28 + TORSO_R + TORSO_H / 2;
const ARM_PIVOT_X = TORSO_R + ARM_R * 0.95; // Đẩy tay dịch ra ngoài để không dính vào thân
const ARM_PIVOT_Y = TORSO_TOP - 0.1;
const ARM_MESH_Y = -(ARM_R + ARM_LEN / 2);

const LEG_PIVOT_Y = 0.28 - TORSO_H / 2 - TORSO_R + LEG_R * 1.6; // Đẩy chân lên cao để ăn khớp mượt mà với thân
const LEG_PIVOT_X = 0.082;
const LEG_MESH_Y = -(LEG_R + LEG_LEN / 2);
// ─────────────────────────────────────────────────────────────────────────────

// Geometry & material dùng chung cho mọi avatar: khi đông người, GPU chỉ giữ
// một bản thay vì mỗi người một bộ, và số đỉnh được giảm vì avatar nhìn từ xa.
const bodyMat = new THREE.MeshStandardMaterial({ color: "#d4c5b0", roughness: 0.6, metalness: 0 });
const eyeMat = new THREE.MeshBasicMaterial({ color: "#000000" });

const headGeom = new THREE.SphereGeometry(HEAD_R, 16, 12);
const eyeGeom = new THREE.SphereGeometry(0.03, 8, 6);
const torsoGeom = new THREE.CapsuleGeometry(TORSO_R, TORSO_H, 4, 12);
const armGeom = new THREE.CapsuleGeometry(ARM_R, ARM_LEN, 3, 8);
const legGeom = new THREE.CapsuleGeometry(LEG_R, LEG_LEN, 3, 8);

const pawnHeadGeom = new THREE.SphereGeometry(0.18, 12, 10);
const pawnEyeGeom = new THREE.SphereGeometry(0.025, 6, 6);
const pawnCollarGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.06, 12);
const pawnBodyGeom = new THREE.CylinderGeometry(0.07, 0.18, 0.5, 12);
const pawnBaseGeom = new THREE.CylinderGeometry(0.22, 0.22, 0.1, 12);

// Mỗi màu áo dùng chung một material (tối đa bằng số màu trong bảng), không tạo mới theo người.
const shirtMats = new Map<string, THREE.MeshStandardMaterial>();
const shirtMatFor = (color: string) => {
  let mat = shirtMats.get(color);
  if (!mat) {
    mat = new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0 });
    shirtMats.set(color, mat);
  }
  return mat;
};

const NAME_TAG_MAX_DISTANCE = 15;

interface MultiplayerAvatarItemProps {
  user: MultiplayerUser;
}

const MultiplayerAvatarItem: React.FC<MultiplayerAvatarItemProps> = ({
  user,
}) => {
  const { otherUsersPositions, chatBubbles, settings } = useMuseum();
  const groupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const nameTagRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const bubbleSync = useRef<ChatBubbleSyncState>({ seq: 0, shown: false }).current;
  const tagVisible = useRef(true);

  const isPawn = settings.preset === 'low';
  const baseY = isPawn ? 0.24 : 0.472; // Phóng to 1.6x (0.15 * 1.6 và 0.295 * 1.6)
  const shirtColor = avatarColorFor(user.nickname, user.colorIndex);
  const shirtMat = shirtMatFor(shirtColor);

  const lastPos = useRef(new THREE.Vector3(user.x, user.y + baseY, user.z));
  const isMoving = useRef(false);
  const targetPos = useRef(new THREE.Vector3(user.x, user.y + baseY, user.z));
  const targetYaw = useRef(user.yaw);

  const headRef = useRef<THREE.Group>(null);
  const targetHeadYaw = useRef(user.headYaw || 0);

  useEffect(() => {
    targetPos.current.set(user.x, user.y + baseY, user.z);
    targetYaw.current = user.yaw;
    targetHeadYaw.current = user.headYaw || 0;
  }, [user.x, user.y, user.z, user.yaw, user.headYaw, baseY]);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(user.x, user.y + baseY, user.z);
      groupRef.current.rotation.set(0, user.yaw, 0);
    }
  }, [baseY]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Đọc dữ liệu tọa độ thời gian thực trực tiếp từ ref
    const realTimeData = otherUsersPositions.current[user.id];
    if (realTimeData) {
      targetPos.current.set(realTimeData.x, realTimeData.y + baseY, realTimeData.z);
      targetYaw.current = realTimeData.yaw;
      targetHeadYaw.current = realTimeData.headYaw || 0;
    }

    // Giảm từ 12 xuống 7 để nội suy vị trí mượt hơn khi tần suất sync qua mạng giảm
    const lf = Math.min(1, 7 * delta);
    groupRef.current.position.lerp(targetPos.current, lf);

    let diff = targetYaw.current - groupRef.current.rotation.y;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    groupRef.current.rotation.y += diff * lf;

    const isSitting = !!(realTimeData?.isSitting || user.isSitting);

    // Nội suy mượt mà cho xoay ngang của đầu
    if (headRef.current) {
      const targetHY = isSitting ? targetHeadYaw.current : 0;
      let hDiff = targetHY - headRef.current.rotation.y;
      hDiff = Math.atan2(Math.sin(hDiff), Math.cos(hDiff));
      headRef.current.rotation.y += hDiff * lf;
    }

    const dist = groupRef.current.position.distanceTo(lastPos.current);
    isMoving.current = dist > 0.002;
    lastPos.current.copy(groupRef.current.position);

    // Tối ưu hiệu năng: Ẩn nhãn tên + bong bóng của người chơi ở quá xa (15m) để tránh lag reflow trình duyệt
    if (nameTagRef.current) {
      const localPlayer = findSceneObject(state.scene, 'lobby-player');
      if (localPlayer) {
        const near = groupRef.current.position.distanceTo(localPlayer.position) <= NAME_TAG_MAX_DISTANCE;
        if (near !== tagVisible.current) {
          nameTagRef.current.style.visibility = near ? 'visible' : 'hidden';
          tagVisible.current = near;
        }
      }
    }

    syncChatBubble(bubbleRef.current, chatBubbles.current[user.id], bubbleSync, Date.now());

    const t = state.clock.getElapsedTime();
    const amp = 0.45,
      spd = 10;

    if (isSitting) {
      if (leftLegRef.current) leftLegRef.current.rotation.x = -Math.PI / 2.0;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -Math.PI / 2.0;
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = -Math.PI / 4.0;
        leftArmRef.current.rotation.z = 0.1;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = -Math.PI / 4.0;
        rightArmRef.current.rotation.z = -0.1;
      }
    } else if (isMoving.current && settings.animations) {
      leftLegRef.current &&
        (leftLegRef.current.rotation.x = Math.sin(t * spd) * amp);
      rightLegRef.current &&
        (rightLegRef.current.rotation.x = -Math.sin(t * spd) * amp);
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = -Math.sin(t * spd) * amp * 0.75;
        leftArmRef.current.rotation.z = 0.2;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = Math.sin(t * spd) * amp * 0.75;
        rightArmRef.current.rotation.z = -0.2;
      }
    } else {
      leftLegRef.current && (leftLegRef.current.rotation.x *= 0.85);
      rightLegRef.current && (rightLegRef.current.rotation.x *= 0.85);
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x *= 0.85;
        leftArmRef.current.rotation.z +=
          (0.2 - leftArmRef.current.rotation.z) * 0.15;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x *= 0.85;
        rightArmRef.current.rotation.z +=
          (-0.2 - rightArmRef.current.rotation.z) * 0.15;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {isPawn ? (
        <group scale={1.6}>
          {/* MÔ HÌNH CON CỜ (CHESS PAWN) - Tối ưu hiệu năng tối đa cho cấu hình Thấp */}
          <group ref={headRef} position={[0, 0.7, 0]}>
            <mesh geometry={pawnHeadGeom} material={bodyMat} />
            <mesh geometry={pawnEyeGeom} material={eyeMat} position={[-0.06, 0.04, 0.16]} />
            <mesh geometry={pawnEyeGeom} material={eyeMat} position={[0.06, 0.04, 0.16]} />
          </group>
          <mesh geometry={pawnCollarGeom} material={bodyMat} position={[0, 0.48, 0]} />
          <mesh geometry={pawnBodyGeom} material={shirtMat} position={[0, 0.2, 0]} />
          <mesh geometry={pawnBaseGeom} material={bodyMat} position={[0, -0.1, 0]} />
        </group>
      ) : (
        <group scale={1.6}>
          {/* MÔ HÌNH CON NGƯỜI (HUMANOID MANNEQUIN) - Cấu hình Trung bình / Cao */}
          <group ref={headRef} position={[0, 0.7, 0]}>
            <mesh geometry={headGeom} material={bodyMat} />
            <mesh geometry={eyeGeom} material={eyeMat} position={[-0.07, 0.05, 0.20]} />
            <mesh geometry={eyeGeom} material={eyeMat} position={[0.07, 0.05, 0.20]} />
          </group>

          <mesh geometry={torsoGeom} material={shirtMat} position={[0, 0.28, 0]} />

          <group ref={leftArmRef} position={[-ARM_PIVOT_X, ARM_PIVOT_Y, 0]}>
            <mesh geometry={armGeom} material={shirtMat} position={[0, ARM_MESH_Y, 0]} />
          </group>
          <group ref={rightArmRef} position={[ARM_PIVOT_X, ARM_PIVOT_Y, 0]}>
            <mesh geometry={armGeom} material={shirtMat} position={[0, ARM_MESH_Y, 0]} />
          </group>

          <group ref={leftLegRef} position={[-LEG_PIVOT_X, LEG_PIVOT_Y, 0]}>
            <mesh geometry={legGeom} material={bodyMat} position={[0, LEG_MESH_Y, 0]} />
          </group>
          <group ref={rightLegRef} position={[LEG_PIVOT_X, LEG_PIVOT_Y, 0]}>
            <mesh geometry={legGeom} material={bodyMat} position={[0, LEG_MESH_Y, 0]} />
          </group>
        </group>
      )}

      {/* Nhãn tên + bong bóng chat của người chơi */}
      <Html
        position={[0, 1.8, 0]}
        center
        distanceFactor={8}
        className="pointer-events-none select-none"
      >
        <div ref={nameTagRef} className="text-center flex flex-col items-center gap-1">
          <div ref={bubbleRef} className={CHAT_BUBBLE_CLASS} style={{ display: 'none' }} />
          {user.status === 'playing-game' && (
            <div className="bg-amber-500/95 text-slate-950 text-[8px] font-black px-2 py-0.5 rounded-full border border-amber-300 shadow-md animate-pulse">
              🎮 ĐANG CHƠI GAME
            </div>
          )}
          <div
            className="text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap border border-white/40 [text-shadow:0_1px_2px_rgba(0,0,0,.6)]"
            style={{ backgroundColor: shirtColor }}
          >
            {user.nickname}
          </div>
        </div>
      </Html>
    </group>
  );
};

// Chu kỳ đối chiếu phòng thời gian thực của người khác (vị trí nằm trong ref, không có state).
const ROOM_MEMBERSHIP_REFRESH_MS = 500;

export const MultiplayerAvatars: React.FC = () => {
  const { otherUsers, otherUsersPositions, settings, activeGallery } = useMuseum();
  const currentRoomId = activeGallery?.id || 'lobby';
  const [sameRoomIds, setSameRoomIds] = useState<string>('');

  // Chỉ dựng avatar của người đang ở CÙNG PHÒNG theo vị trí thời gian thực từ server,
  // giúp nhiều người online mà mỗi máy chỉ phải vẽ những người thực sự nhìn thấy.
  useEffect(() => {
    const refresh = () => {
      const ids = otherUsers
        .filter((u) => {
          if (!u.nickname) return false;
          const live = otherUsersPositions.current[u.id];
          return (live?.galleryId || u.galleryId || 'lobby') === currentRoomId;
        })
        .map((u) => u.id)
        .join('|');
      setSameRoomIds((prev) => (prev === ids ? prev : ids));
    };
    refresh();
    const timer = window.setInterval(refresh, ROOM_MEMBERSHIP_REFRESH_MS);
    return () => window.clearInterval(timer);
  }, [otherUsers, otherUsersPositions, currentRoomId]);

  const visibleIdSet = new Set(sameRoomIds ? sameRoomIds.split('|') : []);
  const visibleUsers = otherUsers
    .filter((u) => visibleIdSet.has(u.id))
    .slice(0, settings.maxAvatars);

  return (
    <group>
      {visibleUsers.map((u) => (
        <MultiplayerAvatarItem key={u.id} user={u} />
      ))}
    </group>
  );
};
