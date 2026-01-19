import { useState } from 'react';
import { useToast } from '@toss/tds-react-native';
import { IAP } from '@apps-in-toss/framework';

export function usePurchase() {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const purchaseProduct = async (sku: string) => {
    if (loading) {
      return;
    }

    setLoading(true);

    const cleanup = await IAP.createOneTimePurchaseOrder({
      options: {
        sku,
        processProductGrant: ({ orderId }) => {
          toast.open(`주문번호 ${orderId}의 상품을 지급했어요.`);
          return true;
        },
      },
      onEvent: (event) => {
        toast.open('구매 했어요.');
        console.error(event);
        setLoading(false);

        cleanup();
      },
      onError: (error) => {
        toast.open('구매를 실패했어요.');
        console.error(error);
        setLoading(false);

        cleanup();
      },
    });
  };

  return { purchaseProduct, loading };
}
