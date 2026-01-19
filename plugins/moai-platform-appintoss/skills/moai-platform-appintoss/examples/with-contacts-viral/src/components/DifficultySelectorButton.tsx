import { useCallback, useEffect, useRef } from 'react';
import { Button, Paragraph, useDialog } from '@toss/tds-mobile';
import { DifficultyModalContent } from '@/components/DifficultyModalContent';
import { DIFFICULTY_DENSITY } from '@/constants/game';

interface DifficultySelectorButtonProps {
  version: number;
  currentDifficulty: keyof typeof DIFFICULTY_DENSITY;
  onDifficultyChange: (difficulty: keyof typeof DIFFICULTY_DENSITY) => void;
  showOnMount?: boolean;
  disabled?: boolean;
}

/**
 * 난이도 선택 버튼
 * @param version - 버전
 * @param currentDifficulty - 현재 난이도
 * @param onDifficultyChange - 난이도 변경 핸들러
 * @param showOnMount - 컴포넌트 마운트 시 난이도 선택 모달 표시 여부
 * @param disabled - 버튼 비활성화 여부
 */

export function DifficultySelectorButton({
  version,
  currentDifficulty,
  onDifficultyChange,
  showOnMount = false,
  disabled = false,
}: DifficultySelectorButtonProps) {
  const { openAsyncConfirm } = useDialog();
  const isInitialMount = useRef(true);

  const openDifficultySelector = useCallback(async () => {
    let selectedDifficulty = currentDifficulty;

    await openAsyncConfirm({
      title: '보물 찾기',
      description: (
        <div>
          <Paragraph typography="t7" style={{ marginBottom: '12px' }}>
            <Paragraph.Text>해적을 피해서, 보물을 찾아요.</Paragraph.Text>
          </Paragraph>
          <Paragraph typography="t5" style={{ marginBottom: '12px' }}>
            <Paragraph.Text fontWeight={'bold'}>난이도 선택</Paragraph.Text>
          </Paragraph>
          <DifficultyModalContent
            defaultValue={currentDifficulty}
            onChange={(value) => {
              selectedDifficulty = value as keyof typeof DIFFICULTY_DENSITY;
            }}
          />
        </div>
      ),
      closeOnDimmerClick: true,
      confirmButton: '확인하기',
    });

    // 모달이 닫힌 후에 난이도 적용
    onDifficultyChange(selectedDifficulty);
  }, [openAsyncConfirm, currentDifficulty, onDifficultyChange]);

  // 컴포넌트 마운트 시 난이도 선택 모달 표시
  useEffect(() => {
    if (showOnMount && isInitialMount.current) {
      isInitialMount.current = false;
      openDifficultySelector();
    }
  }, [showOnMount, openDifficultySelector]);

  return (
    <Button
      key={version.toString()}
      onClick={openDifficultySelector}
      disabled={disabled}
      color="dark"
      variant="weak"
      display="block"
    >
      난이도 선택
    </Button>
  );
}
