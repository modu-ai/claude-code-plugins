import { useEffect, useState } from 'react';
import { IAP, IapProductListItem } from '@apps-in-toss/framework';
import { useToast } from '@toss/tds-react-native';

export function useIapProductList() {
  const toast = useToast();
  const [products, setProducts] = useState<IapProductListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const response = await IAP.getProductItemList();
        setProducts(response?.products ?? []);
      } catch (error) {
        toast.open('상품 목록을 가져오는 데 실패했어요.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading };
}
