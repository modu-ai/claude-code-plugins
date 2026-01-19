import { useCallback, useState } from "react";
import { ContactEntity, fetchContacts } from "@apps-in-toss/framework";
import { usePermissionGate } from "./usePermissionGate";
import { useToast } from "@toss/tds-react-native";

interface ContactsResponse {
  result: ContactEntity[];
  nextOffset: number | null;
  done: boolean;
}

export function useContacts() {
  const [contacts, setContacts] = useState<ContactsResponse>({
    result: [],
    nextOffset: 0,
    done: false,
  });
  const toast = useToast();
  const permissionGate = usePermissionGate({
    getPermission: () => fetchContacts.getPermission(),
    openPermissionDialog: () => fetchContacts.openPermissionDialog(),
    onPermissionRequested: (status) => console.log(`권한 요청 결과: ${status}`),
  });

  const loadContacts = useCallback(async () => {
    try {
      if (contacts.done) {
        return;
      }

      const response = await permissionGate.ensureAndRun(() =>
        fetchContacts({
          size: 10,
          offset: contacts.nextOffset ?? 0,
        })
      );

      if (!response) {
        return;
      }

      setContacts((prev) => ({
        result: [...prev.result, ...response.result],
        nextOffset: response.nextOffset,
        done: response.done,
      }));
    } catch (error) {
      let errorMessage = "연락처를 가져오는 데 실패했어요";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.open(`${errorMessage}`);
    }
  }, [contacts.done, contacts.nextOffset]);

  return {
    contacts: contacts.result,
    done: contacts.done,
    permission: permissionGate.permission,
    reloadContacts: loadContacts,
  };
}
