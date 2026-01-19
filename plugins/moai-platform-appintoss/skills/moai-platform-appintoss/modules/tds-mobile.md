# TDS Mobile 가이드

TDS (Toss Design System) Mobile은 앱인토스 WebView 미니앱을 위한 공식 디자인 시스템 라이브러리입니다.

---

## 설치

```bash
npm install @toss/tds-mobile @toss/tds-mobile-ait @emotion/react@^11 react@^18 react-dom@^18
```

### 의존성

| 패키지 | 버전 | 설명 |
| ------ | ---- | ---- |
| @toss/tds-mobile | latest | 메인 컴포넌트 라이브러리 |
| @toss/tds-mobile-ait | latest | 앱인토스 전용 인프라 |
| @emotion/react | ^11 | 스타일링 |
| react | ^18 | React 코어 |
| react-dom | ^18 | React DOM |

---

## 설정

### Provider 설정

```tsx
import { TDSMobileAITProvider } from '@toss/tds-mobile-ait';

function App({ Component, pageProps }) {
  return (
    <TDSMobileAITProvider>
      <Component {...pageProps} />
    </TDSMobileAITProvider>
  );
}
```

### 기본 사용

```tsx
import { Button } from '@toss/tds-mobile';

const App = () => <Button>버튼</Button>;
```

---

## Foundation

### Colors

```bash
npm install @toss/tds-colors
```

```tsx
import { colors } from '@toss/tds-colors';

<div style={{ backgroundColor: colors.blue500 }} />
```

#### Primary Colors

| Color | 50 | 500 | 900 |
| ----- | -- | --- | --- |
| Grey | #f9fafb | #8b95a1 | #191f28 |
| Blue | #e8f3ff | #3182f6 | #194aa6 |
| Red | #ffeeee | #f04452 | #a51926 |
| Green | #f0faf6 | #20c997 | #027648 |
| Orange | #fff3e0 | #f97316 | #e45600 |

#### Secondary Colors

| Color | 50 | 500 | 900 |
| ----- | -- | --- | --- |
| Yellow | #fff9e7 | #f59f00 | #dd7d02 |
| Teal | #edf8f8 | #12b886 | #076565 |
| Purple | #f9f0fc | #9c36b5 | #65237b |

#### Background Colors

```tsx
colors.background         // #FFFFFF
colors.greyBackground     // grey100
colors.layeredBackground  // #FFFFFF
colors.floatedBackground  // #FFFFFF
```

### Typography

13단계의 타이포그래피 토큰을 제공합니다.

| Token | Size | Line Height | 용도 |
| ----- | ---- | ----------- | ---- |
| Typography 1 | 30px | 40px | 매우 큰 제목 |
| Typography 3 | 22px | 31px | 일반 제목 |
| Typography 5 | 17px | 25.5px | 본문 텍스트 |
| Typography 7 | 13px | 19.5px | 작은 본문 |
| Typography 13 | 11px | 16.5px | 최소 콘텐츠 |

**접근성 지원:**

- iOS: Large, xLarge, xxLarge, xxxLarge 레벨
- Android: 연속적인 스케일링 (base_value × NN%)

---

## Components

### Button

사용자 액션을 트리거하는 핵심 컴포넌트입니다.

```tsx
import { Button } from '@toss/tds-mobile';

<Button color="primary" variant="fill" size="xlarge">
  확인
</Button>
```

#### Props

| Prop | Type | Default | 설명 |
| ---- | ---- | ------- | ---- |
| as | "button" \| "a" | "button" | HTML 요소 |
| color | "primary" \| "danger" \| "light" \| "dark" | "primary" | 색상 |
| variant | "fill" \| "weak" | "fill" | 스타일 |
| display | "inline" \| "block" \| "full" | "inline" | 레이아웃 |
| size | "small" \| "medium" \| "large" \| "xlarge" | "xlarge" | 크기 |
| loading | boolean | false | 로딩 상태 |
| disabled | boolean | false | 비활성화 |

#### Variants

- **fill**: 고채도, 시각적으로 강조된 Primary 액션
- **weak**: 저채도, 반투명 Secondary 액션

#### Display Modes

- **inline**: 다른 요소와 함께 배치
- **block**: 화면 너비로 확장
- **full**: 부모 컨테이너 전체 너비

### Badge

아이템 상태를 강조하는 컴포넌트입니다.

```tsx
import { Badge } from '@toss/tds-mobile';

<Badge size="medium" color="blue" variant="fill">
  신규
</Badge>
```

#### Props

| Prop | Type | 설명 |
| ---- | ---- | ---- |
| variant | "fill" \| "weak" | 스타일 |
| size | "xsmall" \| "small" \| "medium" \| "large" | 크기 |
| color | "blue" \| "teal" \| "green" \| "red" \| "yellow" \| "elephant" | 색상 |

### Toast

사용자에게 간단한 메시지를 표시합니다.

```tsx
import { Toast } from '@toss/tds-mobile';

<Toast
  open={isOpen}
  position="bottom"
  text="저장되었습니다"
  duration={3000}
  onClose={() => setIsOpen(false)}
/>
```

#### Props

| Prop | Type | Default | 설명 |
| ---- | ---- | ------- | ---- |
| open | boolean | - | 표시 상태 |
| position | "top" \| "bottom" | - | 위치 |
| text | string | - | 메시지 |
| duration | number | 3000 | 표시 시간 (ms) |
| leftAddon | ReactNode | - | 아이콘 |
| button | ReactNode | - | 버튼 (bottom만) |
| higherThanCTA | boolean | false | CTA 위에 표시 |

### BottomSheet

화면 하단에서 올라오는 패널 컴포넌트입니다.

```tsx
import { BottomSheet } from '@toss/tds-mobile';

<BottomSheet open={isOpen} onClose={() => setIsOpen(false)}>
  <BottomSheet.Header>제목</BottomSheet.Header>
  <BottomSheet.Content>내용</BottomSheet.Content>
  <BottomSheet.CTA>
    <Button>확인</Button>
  </BottomSheet.CTA>
</BottomSheet>
```

#### Props

| Prop | Type | Default | 설명 |
| ---- | ---- | ------- | ---- |
| open | boolean | - | 표시 상태 |
| onClose | function | - | 닫기 핸들러 |
| expandBottomSheet | boolean | false | 전체 높이 확장 |
| hasTextField | boolean | false | 키보드 위로 이동 |
| disableDimmer | boolean | false | 배경 오버레이 숨김 |
| maxHeight | number | - | 최대 높이 (px) |

#### Sub-Components

- `BottomSheet.Header` - 제목
- `BottomSheet.HeaderDescription` - 설명
- `BottomSheet.Content` - 내용
- `BottomSheet.CTA` - 단일 CTA
- `BottomSheet.DoubleCTA` - 이중 CTA
- `BottomSheet.Select` - 선택 옵션

---

## Overlay Extension

Hook을 사용하여 오버레이 컴포넌트를 관리합니다.

### useToast

```tsx
import { useToast } from '@toss/tds-mobile';

function MyComponent() {
  const { toast } = useToast();

  const handleClick = () => {
    toast('저장되었습니다');
  };

  return <Button onClick={handleClick}>저장</Button>;
}
```

### useDialog

```tsx
import { useDialog } from '@toss/tds-mobile';

function MyComponent() {
  const { alert, confirm } = useDialog();

  const handleDelete = async () => {
    const result = await confirm({
      title: '삭제하시겠습니까?',
      description: '이 작업은 되돌릴 수 없습니다.'
    });

    if (result) {
      // 삭제 처리
    }
  };

  return <Button onClick={handleDelete}>삭제</Button>;
}
```

### useBottomSheet

```tsx
import { useBottomSheet } from '@toss/tds-mobile';

function MyComponent() {
  const { openBottomSheet } = useBottomSheet();

  const handleClick = () => {
    openBottomSheet({
      header: '옵션 선택',
      content: <SelectList />,
    });
  };

  return <Button onClick={handleClick}>옵션</Button>;
}
```

---

## 컴포넌트 목록

### Basic Elements

| 컴포넌트 | 설명 |
| -------- | ---- |
| Badge | 상태 표시 |
| Border | 테두리 |
| Button | 버튼 |
| Icon Button | 아이콘 버튼 |
| Text Button | 텍스트 버튼 |
| Switch | 토글 스위치 |
| Checkbox | 체크박스 |

### Navigation & Layout

| 컴포넌트 | 설명 |
| -------- | ---- |
| Tab | 탭 네비게이션 |
| Menu | 메뉴 |
| Top | 상단 바 |
| List Header | 리스트 헤더 |
| List Footer | 리스트 푸터 |
| Board Row | 게시판 행 |
| Table Row | 테이블 행 |

### Input Controls

| 컴포넌트 | 설명 |
| -------- | ---- |
| TextField | 텍스트 입력 |
| SplitTextField | 분할 입력 |
| TextArea | 멀티라인 입력 |
| Numeric Spinner | 숫자 조절 |
| Stepper | 단계 조절 |
| Slider | 슬라이더 |
| Segmented Control | 세그먼트 선택 |
| Search Field | 검색 필드 |

### Feedback & Display

| 컴포넌트 | 설명 |
| -------- | ---- |
| Toast | 토스트 메시지 |
| Tooltip | 툴팁 |
| Progress Bar | 진행 바 |
| Progress Stepper | 진행 단계 |
| Loader | 로딩 인디케이터 |
| Skeleton | 스켈레톤 로딩 |
| Rating | 별점 |
| Result | 결과 페이지 |

### Overlay Components

| 컴포넌트 | 설명 |
| -------- | ---- |
| Modal | 모달 |
| Bottom Sheet | 바텀시트 |
| Bottom Info | 하단 정보 |
| Dialog | 다이얼로그 |
| AlertDialog | 알림 다이얼로그 |
| ConfirmDialog | 확인 다이얼로그 |

### Special Components

| 컴포넌트 | 설명 |
| -------- | ---- |
| Agreement | 약관 동의 |
| Asset | 에셋 표시 |
| BottomCTA | 하단 CTA |
| Chart | 차트 (Bar Chart) |
| Keypad | 키패드 (숫자, 영문, 보안) |
| ListRow | 리스트 행 |

---

## CSS 커스터마이징

Button 컴포넌트의 CSS 변수:

```css
--button-color                      /* 텍스트 색상 */
--button-background-color           /* 배경색 */
--button-disabled-opacity-color     /* 비활성화 투명도 */
--button-disabled-text-opacity      /* 비활성화 텍스트 투명도 */
--button-gradient-color             /* 로딩 그라데이션 */
--button-loader-color               /* 로딩 인디케이터 색상 */
--button-loading-background-color   /* 로딩 오버레이 */
--button-loading-opacity            /* 로딩 투명도 */
--button-pressed-background-color   /* 눌림 상태 오버레이 */
--button-pressed-opacity            /* 눌림 상태 투명도 */
```

---

## 접근성

TDS Mobile은 다음 접근성 기능을 내장합니다:

- 스크린 리더 지원 (`role` 속성)
- `disabled` 상태 전달
- `aria-busy` 로딩 상태
- 시맨틱 HTML 요소 사용

### 권장 사항

- 아이콘 전용 버튼에 `aria-label` 제공
- `as="a"` 사용 시 `href` 속성 포함
- 모호한 버튼에 `aria-label` 추가
- 로딩 작업에 설명적 레이블 제공

---

## 리소스

- 공식 문서: https://tossmini-docs.toss.im/tds-mobile/
- 시작 가이드: https://tossmini-docs.toss.im/tds-mobile/start/
- 컴포넌트 목록: https://tossmini-docs.toss.im/tds-mobile/components/

---

Version: 1.0.0
Last Updated: 2026-01-19
Platform: TDS Mobile for Apps in Toss WebView
