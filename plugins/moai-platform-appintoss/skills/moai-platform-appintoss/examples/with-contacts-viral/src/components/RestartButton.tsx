import {
  contactsViral,
  getOperationalEnvironment,
} from '@apps-in-toss/web-framework';
import { Button, useDialog, useToast } from '@toss/tds-mobile';
import { useHeartOverlay } from '@/hooks/useHeartOverlay';
import { useAudio } from '@/hooks/useAudio';
import { useVisibilityChange } from '@/hooks/useVisibilityChange';
import { CONTACTS_VIRAL_MODULE_ID } from '@/constants/external';
import { ANIMATION } from '@/constants/animation';

interface RestartButtonProps {
  version: number;
  onRestart: () => void;
  onAddLife: (amount?: number) => void;
  lives: number;
}

/**
 * 다시 시작 버튼
 * @param version - 버전
 * @param onRestart - 다시 시작 핸들러
 * @param onAddLife - 하트 추가 핸들러
 * @param lives - 하트 개수
 */

export function RestartButton({
  version,
  onRestart,
  onAddLife,
  lives,
}: RestartButtonProps) {
  const { openConfirm } = useDialog();
  const toast = useToast();
  const heart = useHeartOverlay();
  const { waitForVisibility } = useVisibilityChange();
  const { playAudio: playHeartAudio } = useAudio({
    src: '/heart.wav',
    volume: 0.6,
  });
  const isSandbox = getOperationalEnvironment() === 'sandbox';

  const handleClick = async () => {
    if (lives === 0) {
      const result = await openConfirm({
        title: '친구 초대하고 하트 받기',
        description: '친구 초대하고 하트를 1개 받아요.',
        confirmButton: '친구 초대하기',
        cancelButton: '취소',
      });

      if (result) {
        handleContactsViral();
      }
    } else {
      onRestart();
    }
  };

  const handleContactsViral = () => {
    try {
      contactsViral({
        options: { moduleId: CONTACTS_VIRAL_MODULE_ID.trim() },
        onEvent: (event) => {
          if (event.type === 'sendViral') {
            // 샌드박스 환경에서는 1개로 고정
            const rewardAmount = isSandbox ? 1 : event.data.rewardAmount;
            onAddLife(rewardAmount);
            // 앱이 다시 포그라운드가 될 때 하트 애니메이션과 사운드를 재생
            waitForVisibility('visible', ANIMATION.HEART_DELAY_MS).then(() => {
              heart.play();
              playHeartAudio();
            });
          }
        },
        onError: (error) => {
          console.error('친구 초대 에러:', error);
          toast.openToast('친구 초대 중 문제가 발생했어요.');
        },
      });
    } catch (error) {
      console.error('친구 초대 에러:', error);
      toast.openToast('친구 초대 중 문제가 발생했어요.');
    }
  };

  return (
    <>
      <heart.Portal />
      <Button
        key={version.toString()}
        onClick={handleClick}
        variant="weak"
        display="block"
      >
        다시 시작하기
      </Button>
    </>
  );
}
