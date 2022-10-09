import moment from "moment/moment";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Table, Row, Rows } from 'react-native-table-component';

import Icon from 'react-native-vector-icons/AntDesign';
import LoadingComponent from "../../../components/loading.component";

import api from '../../../services/api';

const Label = ({ text }) => {
    return (
        <Text style={styles.label}>
            {text}
        </Text>
    )
}

const Value = ({ text }) => {
    return (
        <Text style={styles.value}>
            {text}
        </Text>
    )
}



export default function AllOrders({ navigation }) {

    const ViewAction = ({ id }) => {
        return (
            <TouchableOpacity
                style={styles.action}
                onPress={() => navigation.navigate('SpecifyOrders', { id })}
            >
                <Icon name="eyeo" color="#209AFA" size={20} />
            </TouchableOpacity>
        )
    }

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewing, setViewing] = useState(-1);

    async function getOrders() {
        setLoading(true);
        try {
            const { data } = await api.get('/orders?page=1', {
                headers: {
                    auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoiM2U2YjEzZDItNDc1My0xMWVkLTgwMDAtMDA1MDU2ODU4MjUwIiwiY29tcGFueUlkIjoiMyIsInVybCI6Imh0dHBzOi8vaGFuYWRiZGV2LmIxY2xvdWQuY29tLmJyOjUwMDAwL2Ixcy92MS8iLCJpYXQiOjE2NjUyNjU4NDAsImV4cCI6MTY2NTYxMTQ0MH0.ZOkNOjj_JugtCIchB0Qu2Xg3nc8FJMT0JcVgIQCdYN8',
                    'x-api-key': 'zq6pl6e36F7r05EkZQMuB7ExnHKI2BHl7pFlf5bn'
                }
            });
            console.log(data)

            setOrders(data)

        } catch (error) {
            console.log(error);
            console.log(error.response.data)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <View style={styles.container}>
            {
                loading && <LoadingComponent />
            }
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.contentScroll}
            >
                {
                    orders.map((item, index) => {
                        return (
                            <View style={styles.card}>
                                <TouchableOpacity
                                    style={styles.showButton}
                                    onPress={() => {
                                        if (index === viewing) return setViewing(-1)
                                        setViewing(index)
                                    }}
                                >
                                    {
                                        viewing === index
                                            ?
                                            <Icon name="down" color="white" />
                                            :
                                            <Icon name="right" color="white" />
                                    }
                                </TouchableOpacity>
                                <Table style={{ width: '80%' }}>
                                    <Row
                                        data={[
                                            <Label text={'Pedido'} />,
                                            <Value text={`${item.DocEntry} - ${item.CardName}`} />
                                        ]}
                                    />
                                    {
                                        viewing === index ?
                                            <>
                                                <Row
                                                    style={styles.row}
                                                    data={[
                                                        <Label text={'Data Venda'} />,
                                                        <Value text={`${moment(item.DocDate).format('DD/MM/YYYY')}`} />
                                                    ]}
                                                />
                                                <Row
                                                    style={styles.row}
                                                    data={[
                                                        <Label text={'Total'} />,
                                                        <Value text={`R$ ${item.DocTotal}`} />]}
                                                />
                                                <Row
                                                    style={styles.row}
                                                    data={[
                                                        <Label text={'Ações'} />,
                                                        <ViewAction id={item.DocEntry} />]}
                                                />
                                            </>
                                            :
                                            <></>
                                    }
                                </Table>
                            </View>
                        )
                    })
                }

            </ScrollView>


            <TouchableOpacity
                style={styles.footer}
                onPress={() => navigation.navigate('CreateOrders')}
            >
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
        backgroundColor: '#fff'
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingBottom: 10,
        borderBottomWidth: 0.4,
        borderColor: '#4D5767'
    },
    action: {
        backgroundColor: '#F0F8FE',
        height: 32,
        width: 32,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    row: {
        marginTop: 10
    },
    text: {
        margin: 6,
        textAlign: 'center'
    },
    scroll: {
        marginBottom: 80,
        paddingBottom: 80,
    },
    contentScroll: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    showButton: {
        backgroundColor: '#209AFA',
        width: 40,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    showButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    label: {
        color: '#4D5767',
        fontWeight: 'bold',
        fontSize: 18,
    },
    value: {
        color: '#4D5767',
        fontSize: 16,
        marginBottom: 4
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#4F6FF5',
        height: 48,
        width: 48,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    }
})