import { ref, onValue } from "firebase/database";
import { database } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../auth/useCurrentUser";
import { Item } from "../models/item";
import { onlyUnique } from "../arrayHelper";
import { dataFromDbToArray, ITEMS_PATH } from "./useUserItems";
import _ from "lodash";

export function useUserItemTypes() {
  const user = useCurrentUser();
  const userItemsRef = ref(database, ITEMS_PATH(user?.uid));
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    onValue(userItemsRef, (snapshot) => {
      const data = dataFromDbToArray(snapshot.val()) as Item[];

      if (!_.isNil(data)) {
        setTypes(data?.map((i: Item) => i.type).filter(onlyUnique));
      }
    });
  }, []);

  return types;
}
