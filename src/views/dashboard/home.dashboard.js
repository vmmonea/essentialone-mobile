import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function HomeDashboard({ navigation }) {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Olá, Vitor Monéa</Text>
                    <TouchableOpacity>
                        <Icon name="setting" size={32} color="#209AFA" />

                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.subTitle}>Vendas</Text>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('SalesOrders')}
                    >
                        <Text style={styles.cardText}>Pedidos de Venda</Text>
                    </TouchableOpacity>
                    <Text style={styles.subTitle}>Compras</Text>
                </View>
            </View>
            <Image style={styles.image} resizeMode='contain' source={require('../../../assets/logo.png')} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        paddingVertical: 40,
        alignItems: 'center',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        width: '90%'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        width: '90%',
    },
    subTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#9A9A9A',
        marginBottom: 10,
        marginTop: 20
    },
    card: {
        backgroundColor: '#92D4F7',
        width: '45%',
        height: 220,
        borderRadius: 20,
        padding: 20,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    cardText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 20,
        textAlign: 'right'

    },
    fields: {
        width: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    field: {
        width: '100%',
        height: 100,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5
    },
    input: {
        borderColor: '#000',
        borderWidth: 2,
        paddingLeft: 15,
        height: 50,
        borderRadius: 5
    },
    button: {
        backgroundColor: '#5F9EFF',
        width: '40%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    image: {
        width: '60%',
        height: 80,
    }
})