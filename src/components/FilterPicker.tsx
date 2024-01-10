import {Picker} from '@react-native-picker/picker';
import {enumToObject} from '../models/model-utils.ts';
import {None} from '../models/show-enums.ts';
export const FilterPicker = <T,>({
  items,
  selectedItem,
  setSelectedItem,
}: {
  items: Record<string, any>;
  selectedItem?: T;
  setSelectedItem: (item?: T) => void;
}) => {
  const _items = enumToObject(items);
  return (
    <Picker
      selectedValue={selectedItem}
      onValueChange={itemValue => {
        console.log(itemValue);
        setSelectedItem(itemValue);
      }}>
      {Object.keys(_items).map(k => (
        <Picker.Item key={k} label={k} value={items[k]} />
      ))}
    </Picker>
  );
};
