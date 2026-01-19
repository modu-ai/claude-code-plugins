import { getSafeAreaInsets } from '@apps-in-toss/web-framework';
import { colors } from '@toss/tds-colors';

interface SafeAreaProps {
  children: React.ReactNode;
}

/**
 * 안전 영역
 * @param children - 자식 컴포넌트
 */

export function SafeArea({ children }: SafeAreaProps) {
  const insets = getSafeAreaInsets();

  return (
    <div
      className="safe-area"
      style={{
        paddingTop: insets.top + 48,
        paddingBottom: insets.bottom + 48,
        backgroundColor: colors.background,
      }}
    >
      {children}
    </div>
  );
}
