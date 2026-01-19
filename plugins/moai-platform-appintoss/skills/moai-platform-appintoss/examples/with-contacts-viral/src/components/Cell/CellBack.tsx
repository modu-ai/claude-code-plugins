import { colors } from "@toss/tds-colors";
import { Asset, IconButton } from "@toss/tds-mobile";
import type { MouseEventHandler } from "react";
import {
  EMOJI_BASE_URL,
  IMAGE_NAME,
  KIND_LABEL,
  CELL_KIND,
} from "@/constants/cell";

export type CellKind = (typeof CELL_KIND)[keyof typeof CELL_KIND];

interface CellBackProps {
  kind: CellKind;
  bgColor: string;
  ariaLabel?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  adjacentMines?: number;
  isRevealed: boolean;
}

export function CellBack({
  kind,
  bgColor,
  ariaLabel,
  onClick,
  adjacentMines,
  isRevealed,
}: CellBackProps) {
  return (
    <IconButton
      variant="fill"
      className="cell-button"
      bgColor={bgColor}
      aria-label={ariaLabel ?? KIND_LABEL[kind]}
      onClick={onClick}
      disabled={isRevealed}
      name=""
    >
      {(() => {
        switch (kind) {
          case "treasure":
            return (
              <Asset.ContentIcon className="cell-icon" name="icon-diamond" />
            );
          case "number":
            return (
              <span
                className="cell-number"
                style={{ color: colors.blue500 }}
                aria-hidden
              >
                {adjacentMines}
              </span>
            );
          case "box":
            return (
              <Asset.ContentIcon className="cell-icon" name="icon-safe-box" />
            );
          case "pirate":
            return (
              <Asset.ContentImage
                className="cell-icon"
                src={`${EMOJI_BASE_URL}${IMAGE_NAME.pirate}`}
                alt={KIND_LABEL.pirate}
              />
            );
          case "pirateFlag":
            return (
              <Asset.ContentImage
                className="cell-icon"
                src={`${EMOJI_BASE_URL}${IMAGE_NAME.pirateFlag}`}
                alt={KIND_LABEL.pirateFlag}
              />
            );
          default:
            return null;
        }
      })()}
    </IconButton>
  );
}
