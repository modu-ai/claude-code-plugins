import type { MouseEventHandler } from 'react';
import { Asset, IconButton } from '@toss/tds-mobile';
import { EMOJI_BASE_URL, IMAGE_NAME, KIND_LABEL } from '@/constants/cell';

interface CellFrontProps {
  bgColor: string;
  ariaLabel?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  shouldShowFlag: boolean;
}

export function CellFront({
  bgColor,
  ariaLabel,
  onClick,
  shouldShowFlag,
}: CellFrontProps) {
  return (
    <IconButton
      variant="fill"
      className="cell-button"
      bgColor={bgColor}
      aria-label={ariaLabel ?? KIND_LABEL.box}
      onClick={onClick}
      name=""
    >
      {shouldShowFlag ? (
        <Asset.ContentImage
          className="cell-icon"
          src={`${EMOJI_BASE_URL}${IMAGE_NAME.pirateFlag}`}
          alt={KIND_LABEL.pirateFlag}
        />
      ) : (
        <Asset.ContentIcon className="cell-icon" name="icon-safe-box" />
      )}
    </IconButton>
  );
}
