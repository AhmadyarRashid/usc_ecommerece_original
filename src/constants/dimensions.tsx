import { Dimensions } from "react-native";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const wR = width / 100
const hR = height / 100
const sR = wR + hR;

export {
    width,
    height,
    wR,
    hR,
    sR
}