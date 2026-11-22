import { SymbolView } from 'expo-symbols';
import type { ColorValue } from 'react-native';
import { palette } from '../../theme/colors';

const icons = {
  location: { ios: 'location.fill', android: 'location_on', web: 'location_on' },
  bell: { ios: 'bell', android: 'notifications_none', web: 'notifications_none' },
  heart: { ios: 'heart', android: 'favorite_border', web: 'favorite_border' },
  heartFill: { ios: 'heart.fill', android: 'favorite', web: 'favorite' },
  star: { ios: 'star.fill', android: 'star', web: 'star' },
  seats: { ios: 'person.2.fill', android: 'group', web: 'group' },
  gear: { ios: 'gearshape', android: 'settings', web: 'settings' },
  fuel: { ios: 'fuelpump.fill', android: 'local_gas_station', web: 'local_gas_station' },
  bolt: { ios: 'bolt.fill', android: 'bolt', web: 'bolt' },
  check: { ios: 'checkmark', android: 'check', web: 'check' },
  close: { ios: 'xmark', android: 'close', web: 'close' },
  back: { ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' },
  calendar: { ios: 'calendar', android: 'calendar_month', web: 'calendar_month' },
  time: { ios: 'clock', android: 'schedule', web: 'schedule' },
  shield: { ios: 'checkmark.shield.fill', android: 'verified_user', web: 'verified_user' },
  card: { ios: 'creditcard', android: 'credit_card', web: 'credit_card' },
  car: { ios: 'car.fill', android: 'directions_car', web: 'directions_car' },
  pin: { ios: 'mappin.and.ellipse', android: 'place', web: 'place' },
  filter: { ios: 'slider.horizontal.3', android: 'tune', web: 'tune' },
  arrow: { ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' },
  chevron: { ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' },
  person: { ios: 'person.crop.circle', android: 'account_circle', web: 'account_circle' },
  help: { ios: 'questionmark.circle', android: 'help_outline', web: 'help_outline' },
  document: { ios: 'doc.text', android: 'description', web: 'description' },
  logout: { ios: 'rectangle.portrait.and.arrow.right', android: 'logout', web: 'logout' },

} as const;

export type AppIconName = keyof typeof icons;

export function AppIcon({
    name, 
    size=20,
    color= palette.amber,
}: {name: AppIconName;
    size?:number;
    color?:ColorValue;
}){
    return <SymbolView name= {icons[name]} size={size} tintColor={color}/>
}