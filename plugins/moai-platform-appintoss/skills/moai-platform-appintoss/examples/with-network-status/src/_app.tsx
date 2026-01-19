import type { PropsWithChildren } from 'react';
import type { InitialProps } from "@granite-js/react-native";
import { AppsInToss } from '@apps-in-toss/framework';
import { context } from '../require.context';

function AppContainer({ children }: PropsWithChildren<InitialProps>) {
  return <>{children}</>;
}

export default AppsInToss.registerApp(AppContainer, { context });
