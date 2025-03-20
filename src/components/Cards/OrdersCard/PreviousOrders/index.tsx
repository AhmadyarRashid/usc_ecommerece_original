import {Image, View} from 'react-native';

import {BLACK, GREY, THEME, WHITE} from '../../../../constants/colors';
import {hR, sR, wR} from '../../../../constants/dimensions';
import images from '../../../../constants/images';
import {Text} from 'react-native';
import HorizontalSpace from '../../../HorizontalSpace';
import HorizontalLine from '../../../HorizontalLine';
import VerticalSpace from '../../../VerticalSpace';
import Rating from '../../../Rating';
import SolidButton from '../../../Button/SolidButton';

const PreviousOrders = () => {
  return (
    <View
      style={{
        backgroundColor: WHITE,
        width: wR * 92,
        borderRadius: sR,

        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,

        paddingVertical: hR,
        paddingHorizontal: wR * 2,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: WHITE,
              paddingVertical: hR,
              paddingHorizontal: wR,
              borderRadius: sR,

              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,

              elevation: 24,
            }}>
            <Image
              source={images.SHAMPOO}
              style={{
                height: sR * 6,
                width: sR * 6,
                resizeMode: 'contain',
              }}
            />
          </View>

          <HorizontalSpace w={4} />

          <View
            style={{
              height: sR * 6,
              justifyContent: 'space-around',
            }}>
            <Text
              style={{
                fontSize: sR * 1.2,
                fontWeight: 'bold',
              }}>
              #2786903578
            </Text>
            <Text
              style={{
                color: GREY,
                fontSize: sR,
              }}>
              245, I-8/3, Islamabad
            </Text>
            <Text
              style={{
                color: GREY,
                fontSize: sR,
              }}>
              2 Items
            </Text>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: wR * 6,
            height: hR * 3,
            justifyContent: 'center',
            borderRadius: sR,
            backgroundColor: WHITE,

            shadowColor: THEME,
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,

            elevation: 24,
          }}>
          <Text
            style={{
              color: GREY,
              fontSize: sR,
            }}>
            Delivered
          </Text>
        </View>
      </View>

      <VerticalSpace h={2} />

      <HorizontalLine />

      <VerticalSpace h={1} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: wR * 4,
        }}>
        <Text
          style={{
            color: GREY,
            fontSize: sR * 1.2,
          }}>
          10 Apr 2024 at 07:45 PM
        </Text>

        <Text
          style={{
            color: BLACK,
            fontSize: sR * 1.2,
            fontWeight: 'bold',
          }}>
          PKR 1050
        </Text>
      </View>

      <VerticalSpace h={1} />

      <HorizontalLine />

      <VerticalSpace h={2} />

      <View style={{flexDirection:'row',alignItems:"center",justifyContent:"space-between"}}>
        <Rating  />

        <SolidButton label='Reorder' size='sm' customLabelStyle={{fontSize:sR*1.2}} customButtonStyle={{paddingVertical:hR}}  />
      </View>
    </View>
  );
};

export default PreviousOrders;
