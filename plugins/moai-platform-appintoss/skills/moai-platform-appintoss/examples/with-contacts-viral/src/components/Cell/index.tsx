import type { MouseEventHandler } from 'react';
import { colors } from '@toss/tds-colors';
import { FlipCard } from './FlipCard';
import { CellFront } from './CellFront';
import { CellBack, type CellKind } from './CellBack';
import { ANIMATION } from '@/constants/animation';

export type { CellKind } from './CellBack';

export interface CellProps {
  kind: CellKind;
  bgColor?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
  adjacentMines?: number;
  index: number;
  disabled: boolean;
  isRevealed?: boolean;
  isFlagged?: boolean;
}

/**
 * 셀
 * @param kind - 셀 종류
 * @param bgColor - 배경 색상
 * @param onClick - 클릭 이벤트
 * @param ariaLabel - 접근성 레이블
 * @param adjacentMines - 인접 지뢰 수
 * @param index - 셀 인덱스
 * @param disabled - 셀 비활성화 여부
 * @param isRevealed - 셀 공개 여부
 * @param isFlagged - 셀 깃발 여부
 */
export function Cell({
  kind,
  bgColor = colors.greyOpacity100,
  onClick,
  ariaLabel,
  adjacentMines,
  index,
  disabled,
  isRevealed = false,
  isFlagged = false,
}: CellProps) {
  const shouldShowFlag = isRevealed === false && isFlagged;

  return (
    <div
      className="cell-container cell-enter"
      style={{
        opacity: disabled ? 0 : 1,
        animationDelay: `${index * ANIMATION.CELL_DELAY_MS}ms`,
      }}
    >
      <FlipCard
        isFlipped={isRevealed}
        frontContent={
          <CellFront
            bgColor={bgColor}
            ariaLabel={ariaLabel}
            onClick={onClick}
            shouldShowFlag={shouldShowFlag}
          />
        }
        backContent={
          <CellBack
            kind={kind}
            bgColor={bgColor}
            ariaLabel={ariaLabel}
            onClick={onClick}
            adjacentMines={adjacentMines}
            isRevealed={isRevealed}
          />
        }
      />
    </div>
  );
}
