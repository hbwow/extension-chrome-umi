const storageSet = async (
  obj: { key: string; value: any },
  type: 'sync' | 'local',
) => {
  await chrome?.storage?.[type]?.set(obj);
  // console.log(`<${Object.keys(obj)[0]}> setting success!`);
};

const storageGet = async ([key]: string[], type: 'sync' | 'local') => {
  const result = await chrome?.storage?.[type]?.get([key]);
  // console.log(`${result} get success!`);

  return result;
};

export const storageSyncSet = (obj: { key: string; value: any }) => {
  return storageSet(obj, 'sync');
};
export const storageSyncGet = ([key]: string[]) => {
  return storageGet([key], 'sync');
};

export const storageLocalSet = (obj: { key: string; value: any }) => {
  return storageSet(obj, 'local');
};
export const storageLocalGet = ([key]: string[]) => {
  return storageGet([key], 'local');
};

export const listenerStorage = ({
  key,
  onCallback,
}: {
  key?: string;
  onCallback: (obj: { oldValue: any; newValue: any }) => void;
}) => {
  chrome?.storage?.onChanged?.addListener((changes, namespace) => {
    for (let [_key, { oldValue, newValue }] of Object.entries(changes)) {
      if (key === _key) {
        onCallback({ oldValue, newValue });
      }

      // console.log(
      //   `Storage key "${key}" in namespace "${namespace}" changed.`,
      //   `Old value was "${oldValue}", new value is "${newValue}".`,
      // );
    }
  });
};
