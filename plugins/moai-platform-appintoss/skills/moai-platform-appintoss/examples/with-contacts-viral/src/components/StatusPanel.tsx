import { Asset, Switch } from '@toss/tds-mobile';
import { GAME_MODE } from '@/constants/game';
import { EMOJI_BASE_URL, IMAGE_NAME } from '@/constants/cell';

interface StatusPanelProps {
  lives: number;
  mode: (typeof GAME_MODE)[keyof typeof GAME_MODE];
  onFlagChange: () => void;
  revealedSafe: number;
  totalSafe: number;
}

/**
 * 상태 패널
 * @param lives - 하트 개수
 * @param mode - 게임 모드
 * @param revealedSafe - 발견한 보물 개수
 * @param totalSafe - 총 보물 개수
 * @param onFlagChange - 깃발 변경 핸들러
 */

export function StatusPanel({
  lives,
  mode,
  revealedSafe,
  totalSafe,
  onFlagChange,
}: StatusPanelProps) {
  const iconStyle = { width: '24px', height: '24px' };

  return (
    <div className="status-panel">
      <div className="status-panel-left">
        <div className="status-panel-left-item">
          <Asset.ContentIcon
            name="icon-emoji-red-heart"
            alt="하트 이모지"
            style={iconStyle}
          />
          <p className="status-panel-item-text">: {lives}</p>
        </div>
        <div className="status-panel-left-item">
          <Asset.ContentIcon
            name="icon-diamond"
            alt="보석 이모지"
            style={iconStyle}
          />
          <p className="status-panel-item-text">
            : {revealedSafe}/{totalSafe}
          </p>
        </div>
      </div>
      <div className="status-panel-right">
        <Asset.ContentImage
          src={`${EMOJI_BASE_URL}${IMAGE_NAME.pirateFlag}`}
          alt="해적 깃발 이모지"
          style={iconStyle}
        />
        <Switch
          checked={mode === 'flag'}
          aria-label="깃발 모드"
          onChange={onFlagChange}
        />
      </div>
    </div>
  );
}
