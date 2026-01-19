# TDS React Native 가이드

TDS (Toss Design System) React Native는 앱인토스 Granite 미니앱을 위한 공식 디자인 시스템 라이브러리입니다.

---

## 설치

```bash
npm install @toss/tds-react-native
```

### 호환성

- React 18 버전까지 지원
- React 19는 아직 미지원

---

## 설정

### Provider 설정

```tsx
import { TDSProvider } from '@toss/tds-react-native';

function App({ Component, pageProps }) {
  return (
    <TDSProvider>
      <Component {...pageProps} />
    </TDSProvider>
  );
}
```

### 기본 사용

```tsx
import { Button } from '@toss/tds-react-native';

const App = () => <Button>버튼</Button>;
```

---

## Foundation

### Colors

```tsx
import { colors } from '@toss/tds-react-native';

<View style={{ backgroundColor: colors.blue500 }} />
```

#### Primary Colors

| Color | 50 | 500 | 900 |
| ----- | -- | --- | --- |
| Grey | #f9fafb | #8b95a1 | #191f28 |
| Blue | #e8f3ff | #3182f6 | #194aa6 |
| Red | #ffeeee | #f04452 | #a51926 |

#### Extended Colors

| Color | 50 | 500 | 900 |
| ----- | -- | --- | --- |
| Orange | #fff3e0 | #f97316 | #e45600 |
| Yellow | #fff9e7 | #f59f00 | #dd7d02 |
| Green | #f0faf6 | #20c997 | #027648 |
| Teal | #edf8f8 | #12b886 | #076565 |
| Purple | #f9f0fc | #9c36b5 | #65237b |

#### Opacity Colors

Grey Opacity 50-900: 0.02 ~ 0.91 투명도

#### Background Colors

```tsx
colors.background         // #FFFFFF
colors.greyBackground     // Light grey
colors.layeredBackground  // #FFFFFF
colors.floatedBackground  // #FFFFFF
```

---

## Components

### Button

사용자 액션을 트리거하는 핵심 컴포넌트입니다.

```tsx
import { Button } from '@toss/tds-react-native';

<Button type="primary" style="fill" size="big" onPress={handlePress}>
  확인
</Button>
```

#### Props

| Prop | Type | Default | 설명 |
| ---- | ---- | ------- | ---- |
| children | ReactNode | - | 버튼 내용 (필수) |
| onPress | function | - | 클릭 핸들러 |
| type | "primary" \| "danger" \| "light" \| "dark" | "primary" | 색상 타입 |
| style | "fill" \| "weak" | "fill" | 스타일 |
| display | "block" \| "full" | "block" | 레이아웃 |
| size | "big" \| "large" \| "medium" \| "tiny" | "big" | 크기 |
| loading | boolean | false | 로딩 상태 |
| disabled | boolean | false | 비활성화 |
| leftAccessory | ReactNode | - | 왼쪽 아이콘 |
| viewStyle | ViewStyle | - | 외부 컨테이너 스타일 |
| containerStyle | ViewStyle | - | 내부 컨테이너 스타일 |
| textStyle | TextStyle | - | 텍스트 스타일 |
| color | string | - | 텍스트 색상 오버라이드 |

#### Size Options

| Size | 설명 |
| ---- | ---- |
| tiny | 가장 작은 크기 |
| medium | 중간 크기 |
| large | 큰 크기 |
| big | 가장 큰 크기 (기본값) |

#### Style Variants

- **fill**: 고채도, 시각적으로 강조된 Primary 액션
- **weak**: 저채도, 반투명 Secondary 액션

### Toast

사용자에게 간단한 메시지를 표시합니다.

```tsx
import { Toast } from '@toss/tds-react-native';

<Toast
  open={isOpen}
  text="저장되었습니다"
  position="bottom"
  duration={3}
  onClose={() => setIsOpen(false)}
/>
```

#### Props

| Prop | Type | Default | 설명 |
| ---- | ---- | ------- | ---- |
| open | boolean | - | 표시 상태 (필수) |
| text | string | - | 메시지 (필수) |
| onClose | function | - | 닫기 핸들러 (필수) |
| position | "top" \| "bottom" | "bottom" | 위치 |
| duration | number | 3 | 표시 시간 (초) |
| icon | ReactNode | - | 아이콘 |
| button | ReactNode | - | 버튼 (bottom만) |
| bottomOffset | number | 20 | 하단 여백 (px) |
| onEntered | function | - | 표시 후 콜백 |
| onExited | function | - | 사라진 후 콜백 |

#### 아이콘 사용

```tsx
<Toast
  open={isOpen}
  text="알림"
  icon={<Toast.Icon name="icn-attention-color" />}
  onClose={() => setIsOpen(false)}
/>
```

#### 버튼 사용 (bottom만)

```tsx
<Toast
  open={isOpen}
  text="작업 완료"
  position="bottom"
  button={<Toast.Button text="확인" onPress={handleConfirm} />}
  onClose={() => setIsOpen(false)}
/>
```

### Dialog

중요한 정보를 표시하거나 사용자 확인을 요청합니다.

#### AlertDialog

단일 버튼으로 정보를 전달합니다.

```tsx
import { AlertDialog } from '@toss/tds-react-native';

overlay.open(({ isOpen, close, exit }) => (
  <AlertDialog
    open={isOpen}
    title="저장 완료"
    description="변경사항이 저장되었습니다"
    buttonText="확인"
    onClose={() => { resolve(); close(); }}
    onExited={exit}
  />
));
```

##### Props

| Prop | Type | Default | 설명 |
| ---- | ---- | ------- | ---- |
| open | boolean | - | 표시 상태 (필수) |
| title | ReactNode | - | 제목 (필수) |
| onClose | function | - | 닫기 핸들러 (필수) |
| description | ReactNode | - | 설명 |
| buttonText | string | "확인" | 버튼 텍스트 |
| onButtonPress | function | - | 버튼 클릭 핸들러 |
| closeOnDimmerClick | boolean | - | 배경 클릭 닫기 |
| onEntered | function | - | 표시 후 콜백 |
| onExited | function | - | 사라진 후 콜백 |

#### ConfirmDialog

두 버튼으로 사용자 선택을 요청합니다.

```tsx
import { ConfirmDialog } from '@toss/tds-react-native';

overlay.open(({ isOpen, close, exit }) => (
  <ConfirmDialog
    open={isOpen}
    title="삭제 확인"
    description="이 항목을 삭제하시겠습니까?"
    leftButton={
      <ConfirmDialog.Button style="weak" onPress={() => resolve(false)}>
        취소
      </ConfirmDialog.Button>
    }
    rightButton={
      <ConfirmDialog.Button type="danger" onPress={() => resolve(true)}>
        삭제
      </ConfirmDialog.Button>
    }
    onClose={() => { resolve(false); close(); }}
  />
));
```

##### Props

| Prop | Type | 설명 |
| ---- | ---- | ---- |
| open | boolean | 표시 상태 (필수) |
| title | ReactNode | 제목 (필수) |
| leftButton | ReactNode | 왼쪽 버튼 (필수) |
| rightButton | ReactNode | 오른쪽 버튼 (필수) |
| onClose | function | 닫기 핸들러 (필수) |
| description | ReactNode | 설명 |
| content | ReactNode | 커스텀 콘텐츠 |
| closeOnDimmerClick | boolean | 배경 클릭 닫기 |

### ListRow

리스트의 개별 행을 표현합니다.

```tsx
import { ListRow } from '@toss/tds-react-native';

<ListRow
  left={<ListRow.Icon name="icn-user" />}
  contents={<ListRow.Texts title="사용자 이름" description="설명 텍스트" />}
  right={<ListRow.RightTexts title="상태" />}
  withArrow
  onPress={handlePress}
/>
```

#### Props

| Prop | Type | Default | 설명 |
| ---- | ---- | ------- | ---- |
| left | ReactNode | - | 왼쪽 콘텐츠 |
| contents | ReactNode | - | 중앙 콘텐츠 |
| right | ReactNode | - | 오른쪽 콘텐츠 |
| withArrow | boolean | false | 화살표 표시 |
| leftAlignment | "top" \| "center" | "center" | 왼쪽 정렬 |
| rightAlignment | "top" \| "center" | "center" | 오른쪽 정렬 |
| verticalPadding | 8 \| 16 \| 24 \| 32 | 24 | 세로 패딩 |
| horizontalPadding | 0 | - | 가로 패딩 제거 |
| disabled | boolean | false | 비활성화 |
| disabledStyle | "type1" \| "type2" | "type1" | 비활성화 스타일 |
| onPress | function | - | 클릭 핸들러 |

#### Sub-Components

- `ListRow.Texts` - 텍스트 콘텐츠
- `ListRow.Icon` - 아이콘
- `ListRow.Image` - 이미지
- `ListRow.RightTexts` - 오른쪽 정렬 텍스트

#### 애니메이션 메서드

ref를 통해 사용:
- `blink()` - 깜빡임 효과
- `shine()` - 반짝임 효과

---

## 컴포넌트 목록

### UI Controls

| 컴포넌트 | 설명 |
| -------- | ---- |
| Button | 버튼 |
| Icon Button | 아이콘 버튼 |
| Text Button | 텍스트 버튼 |
| Checkbox | 체크박스 |
| Radio | 라디오 버튼 |
| Switch | 토글 스위치 |
| TextField | 텍스트 입력 |
| Search Field | 검색 필드 |
| Dropdown | 드롭다운 |
| Segmented Control | 세그먼트 선택 |
| Slider | 슬라이더 |
| Stepper | 단계 조절 |
| Numeric Spinner | 숫자 조절 |

### Display Elements

| 컴포넌트 | 설명 |
| -------- | ---- |
| Badge | 상태 표시 |
| Border | 테두리 |
| Shadow | 그림자 |
| Gradient | 그라데이션 |
| Highlight | 하이라이트 |
| Skeleton | 스켈레톤 로딩 |
| Loader | 로딩 인디케이터 |
| Progress Bar | 진행 바 |
| Rating | 별점 |
| Toast | 토스트 메시지 |
| Dialog | 다이얼로그 |

### Content Organization

| 컴포넌트 | 설명 |
| -------- | ---- |
| List | 리스트 |
| ListRow | 리스트 행 |
| List Header | 리스트 헤더 |
| List Footer | 리스트 푸터 |
| Table Row | 테이블 행 |
| Board Row | 게시판 행 |
| Grid List | 그리드 리스트 |
| Carousel | 캐러셀 |
| Tab | 탭 |
| Post | 게시물 |
| Asset | 에셋 표시 |
| Amount Top | 금액 상단 |

### Navigation

| 컴포넌트 | 설명 |
| -------- | ---- |
| Navbar | 네비게이션 바 |
| Bottom Info | 하단 정보 |

### Special Components

| 컴포넌트 | 설명 |
| -------- | ---- |
| Keypad | 키패드 |
| Error Page | 에러 페이지 |
| Result | 결과 페이지 |
| Bar Chart | 막대 차트 |

---

## useToast Hook

```tsx
import { useToast } from '@toss/tds-react-native';

function MyComponent() {
  const toast = useToast();

  const handleSave = () => {
    // 저장 로직
    toast.show('저장되었습니다');
  };

  return <Button onPress={handleSave}>저장</Button>;
}
```

---

## Overlay 패턴

Dialog와 같은 오버레이 컴포넌트는 overlay 패턴을 사용합니다:

```tsx
import { overlay } from '@toss/tds-react-native';

const result = await overlay.open(({ isOpen, close, exit }) => (
  <ConfirmDialog
    open={isOpen}
    title="확인"
    onClose={close}
    onExited={exit}
    // ...
  />
));
```

---

## TDS Mobile vs TDS React Native

| 항목 | TDS Mobile | TDS React Native |
| ---- | ---------- | ---------------- |
| 플랫폼 | WebView | Granite (RN) |
| 패키지 | @toss/tds-mobile | @toss/tds-react-native |
| Provider | TDSMobileAITProvider | TDSProvider |
| 스타일링 | CSS, Emotion | StyleSheet |
| 이벤트 | onClick | onPress |

---

## 리소스

- 공식 문서: https://tossmini-docs.toss.im/tds-react-native/
- 시작 가이드: https://tossmini-docs.toss.im/tds-react-native/start/
- 컴포넌트 목록: https://tossmini-docs.toss.im/tds-react-native/components/
- npm 토큰 설정: https://tossmini-docs.toss.im/tds-react-native/setup-npm/

---

Version: 1.0.0
Last Updated: 2026-01-19
Platform: TDS React Native for Apps in Toss Granite
