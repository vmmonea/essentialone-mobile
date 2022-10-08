import { ActivityIndicator, View } from "react-native";

export default function LoadingComponent() {
    return (
        <View
            style={style}
        >
            <ActivityIndicator size={'large'} color="##209AFA" />
        </View>
    )
}

const style = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(240, 248, 254, 1)"
}