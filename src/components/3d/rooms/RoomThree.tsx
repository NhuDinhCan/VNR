import React, { Component, ReactNode } from 'react';
import { BaseRoom, BaseRoomProps } from './BaseRoom';
import { VideoPillar } from '../VideoPillar';
import { RoomThreeHistoricExhibits } from './RoomThreeHistoricExhibits';

class RoomThreeErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn('RoomThree element error caught safely:', error);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

/**
 * Room Three deliberately inherits the same clear BaseRoom shell as Room Two.
 * Its only room-specific meshes are historic exhibits and the video pillar,
 * which keeps the route through the room open and the displays easy to identify.
 */
export const RoomThree: React.FC<BaseRoomProps> = ({
  galleryId,
  customSettings,
  isVisible = true,
}) => (
  <BaseRoom
    galleryId={galleryId}
    customSettings={customSettings}
    isVisible={isVisible}
  >
    <RoomThreeErrorBoundary>
      <VideoPillar isVisible={isVisible} />
      <RoomThreeHistoricExhibits isVisible={isVisible} />
    </RoomThreeErrorBoundary>
  </BaseRoom>
);

export default RoomThree;
