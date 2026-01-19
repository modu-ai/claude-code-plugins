import type { PropsWithChildren } from "react";
import type { InitialProps } from "@granite-js/react-native";
import { AppsInToss } from "@apps-in-toss/framework";
import { context } from "../require.context";
import { TDSProvider } from "@toss/tds-react-native";

function AppContainer({ children }: PropsWithChildren<InitialProps>) {
  return <TDSProvider>{children}</TDSProvider>;
}

export default AppsInToss.registerApp(AppContainer, { context });
