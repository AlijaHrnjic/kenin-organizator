import {
  ref,
  onValue,
  equalTo,
  query,
  orderByChild,
  Query,
  get,
  set,
  push,
} from "firebase/database";
import { database } from "../firebaseConfig";
import { Item } from "../models/item";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../auth/useCurrentUser";
import _ from "lodash";
import { AddedType } from "../components/add/AddItemsDialog";

export const ITEMS_PATH = (userId?: string) => "private/" + userId + "/items/";

// Use this hook only in private components
export function useUserItems(type?: string) {
  const [items, setItems] = useState<Item[] | null>(null);

  const user = useCurrentUser();

  const userItemsRef = ref(database, ITEMS_PATH(user?.uid));
  let searchQuery: Query | null = null;

  if (!_.isNil(type)) {
    searchQuery = query(userItemsRef, orderByChild("type"), equalTo(type));
  }

  useEffect(() => {
    onValue(searchQuery ?? userItemsRef, (snapshot) => {
      const data = snapshot.val();

      setItems(dataFromDbToArray(data));
    });
  }, []);

  return items;
}

export function dataFromDbToArray(data: object | null | undefined) {
  if (_.isNil(data)) return [];

  return Object.values(data);
}

export function changeAvailableItem(
  type: string,
  name: string,
  userId: string
) {
  changeItem(type, name, userId, (items: Item[]) =>
    items?.map((i: Item) => {
      if (i.name === name && i.type === type) {
        return { ...i, available: !i.available };
      }

      return i;
    })
  );
}

export function deleteItem(type: string, name: string, userId: string) {
  changeItem(type, name, userId, (items: Item[]) =>
    items.filter((i: Item) => !(i.name === name && i.type === type))
  );
}

function changeItem(
  type: string,
  name: string,
  userId: string,
  changeFunction: (items: Item[]) => Item[]
) {
  const dbRef = ref(database, ITEMS_PATH(userId));
  get(dbRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const items = dataFromDbToArray(snapshot.val()) as Item[];
        const editedItems = changeFunction(items);
        set(dbRef, editedItems);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function addItemsAndTypes(addedTypes: AddedType[], userId: string) {
  const addedItems: Item[] = [];

  for (const type of addedTypes) {
    for (const item of type.addedItems) {
      addedItems.push({
        name: item.name,
        type: type.type,
        available: item.available,
        link: item.link,
      });
    }
  }

  for (let i = 0; i < addedItems.length; ++i) {
    const dbRef = ref(database, ITEMS_PATH(userId));
    push(dbRef, addedItems[i]);
  }
}
