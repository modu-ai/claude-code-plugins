import { useEffect, useState } from 'react';
import { Checkbox } from '@toss/tds-mobile';
import { DIFFICULTY_LABEL, DIFFICULTY_OPTIONS } from '@/constants/game';

interface DifficultyModalContentProps {
  defaultValue: string;
  onChange: (value: string) => void;
}

/**
 * 난이도 모달 컨텐츠
 * @param defaultValue - 기본 난이도
 * @param onChange - 난이도 변경 핸들러
 * @returns null
 */

export function DifficultyModalContent({
  defaultValue,
  onChange,
}: DifficultyModalContentProps) {
  const [checked, setChecked] = useState<string>(defaultValue);

  useEffect(() => {
    onChange(checked);
  }, [checked, onChange]);

  return (
    <div className="difficulty-modal-content">
      <Checkbox.Circle
        inputType="radio"
        value={DIFFICULTY_OPTIONS.easy}
        checked={checked === DIFFICULTY_OPTIONS.easy}
        onChange={(e) => setChecked(e.target.value)}
      >
        {DIFFICULTY_LABEL.easy}
      </Checkbox.Circle>
      <Checkbox.Circle
        inputType="radio"
        value={DIFFICULTY_OPTIONS.normal}
        checked={checked === DIFFICULTY_OPTIONS.normal}
        onChange={(e) => setChecked(e.target.value)}
      >
        {DIFFICULTY_LABEL.normal}
      </Checkbox.Circle>
      <Checkbox.Circle
        inputType="radio"
        value={DIFFICULTY_OPTIONS.hard}
        checked={checked === DIFFICULTY_OPTIONS.hard}
        onChange={(e) => setChecked(e.target.value)}
      >
        {DIFFICULTY_LABEL.hard}
      </Checkbox.Circle>
    </div>
  );
}
