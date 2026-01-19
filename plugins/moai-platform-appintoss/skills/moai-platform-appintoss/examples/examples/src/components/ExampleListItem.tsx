import { openURL, share } from "@apps-in-toss/framework";
import { Spacing } from "@granite-js/react-native";
import { Button, ListRow } from "@toss/tds-react-native";
import { getTossShareLink } from "@apps-in-toss/framework";

interface ExampleListItemProps {
  icon: string;
  label: string;
  path: string;
}

export function ExampleListItem({ icon, label, path }: ExampleListItemProps) {
  const deepLink = `intoss://${path}`;

  const openDeepLink = () => {
    openURL(deepLink);
  };

  const shareLink = async () => {
    try {
      const link = await getTossShareLink(deepLink);
      await share({ message: link });
    } catch (error) {
      console.error("링크를 공유하는 도중 문제가 발생했어요.", error);
    }
  };

  return (
    <ListRow
      left={<ListRow.Image type="circle" source={{ uri: icon }} />}
      contents={<ListRow.Texts type="1RowTypeA" top={label} />}
      right={
        <>
          <Button size="tiny" style="weak" onPress={openDeepLink}>
            보기
          </Button>
          <Spacing size={6} direction="horizontal" />
          <Button size="tiny" style="weak" type="dark" onPress={shareLink}>
            공유
          </Button>
        </>
      }
    />
  );
}
