import { ScrollView, View } from "react-native"

import HeaderPrimary from "../../components/Header/HeaderPrimary"
import VerticalSpace from "../../components/VerticalSpace"

import { WHITE } from "../../constants/colors"

const OrderDetailsScreen = ()=>{
    return <View style={{
        flex:1,
        backgroundColor:WHITE
    }}>
        <HeaderPrimary label="Order Details" />

        <VerticalSpace h={2} />

        <ScrollView>

            <View>
                
            </View>

        </ScrollView>
    </View>
}

export default OrderDetailsScreen