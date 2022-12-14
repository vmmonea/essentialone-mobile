import moment from "moment/moment";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Table, Row, Rows } from 'react-native-table-component';
import Icon from "react-native-vector-icons/AntDesign";

import api from '../../../services/api';


const Label = ({ text }) => {
    return (
        <Text style={styles.itemLabel}>
            {text}
        </Text>
    )
}

const Value = ({ text }) => {
    return (
        <Text style={styles.itemValue}>
            {text}
        </Text>
    )
}

export default function SpecifyOrders({ route }) {

    const id = route.params.id;
    console.log(route)

    const [order, setOrder] = useState(null);
    const [lines, setLines] = useState([])
    const [viewing, setViewing] = useState(-1)

    async function getOrder(id) {
        try {

            const prepare = [];

            const { data } = await api.get(`/orders/${id}`, {
                headers: {
                    auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoiM2U2YjEzZDItNDc1My0xMWVkLTgwMDAtMDA1MDU2ODU4MjUwIiwiY29tcGFueUlkIjoiMyIsInVybCI6Imh0dHBzOi8vaGFuYWRiZGV2LmIxY2xvdWQuY29tLmJyOjUwMDAwL2Ixcy92MS8iLCJpYXQiOjE2NjUyNjU4NDAsImV4cCI6MTY2NTYxMTQ0MH0.ZOkNOjj_JugtCIchB0Qu2Xg3nc8FJMT0JcVgIQCdYN8',
                    'x-api-key': 'zq6pl6e36F7r05EkZQMuB7ExnHKI2BHl7pFlf5bn'
                }
            });
            console.log(data)

            data.DocumentLines.map((item) => {
                prepare.push([item.ItemCode, item.Quantity, `R$ ${item.Price}`, `R$ ${item.LineTotal}`])
            })

            setLines(prepare)
            setOrder(data)



        } catch (error) {
            console.log(error);
            console.log(error.request)
        }
    }

    useEffect(() => {
        getOrder(id)
    }, [id])

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {
                order &&
                <>
                    <View style={styles.card}>
                        <View style={{ marginBottom: 25 }}>
                            <Text style={styles.value}>{order.BPLName}</Text>
                            <Text style={styles.label}>Filial</Text>
                        </View>
                        <View style={styles.header}>
                            <Icon name="user" size={44} color="#4D5767" />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={styles.value}>{order.CardName}</Text>
                                <Text style={styles.label}>{order.CardCode}</Text>
                            </View>
                        </View>
                        <View style={styles.content}>
                            <View>
                                <Text style={styles.value}>{moment(order.DocDate).format('DD/MM/YYYY')}</Text>
                                <Text style={styles.label}>Data de Lan??amento</Text>
                            </View>
                            <View>
                                <Text style={styles.value}>{moment(order.DocDueDate).format('DD/MM/YYYY')}</Text>
                                <Text style={styles.label}>Data de Entrega</Text>
                            </View>
                        </View>
                        <View style={styles.footer}>
                            <View>
                                <Text style={styles.value}>{`R$ ${order.DocTotal}`}</Text>
                                <Text style={styles.label}>Total do Documento</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.items}>
                        <Text style={styles.value}>Linhas</Text>
                        {
                            order.DocumentLines.map((item, index) => {
                                return (
                                    <View style={styles.item}>
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
                                                style={{ textAlign: 'center' }}
                                                data={[
                                                    <Label text={`${item.ItemCode}`} />,
                                                    <Value text={`${item.ItemName}`} />
                                                ]}
                                            />
                                            {
                                                viewing === index ?
                                                    <>
                                                        <Row
                                                            style={styles.row}
                                                            data={[
                                                                <Label text={'Quantidade'} />,
                                                                <Value text={item.Quantity} />
                                                            ]}
                                                        />
                                                        <Row
                                                            style={styles.row}
                                                            data={[
                                                                <Label text={'Pre??o'} />,
                                                                <Value text={`R$ ${item.Price}`} />]}
                                                        />
                                                        <Row
                                                            style={styles.row}
                                                            data={[
                                                                <Label text={'Total'} />,
                                                                <Value text={`R$ ${item.LineTotal}`} />]}
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
                    </View>
                </>
            }

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff'
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 40
    },
    card: {
        width: '100%',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 15,
    },
    value: {
        color: '#4D5767',
        fontWeight: 'bold',
        fontSize: 22,
    },
    label: {
        color: '#4D5767',
        fontSize: 16,
    },
    itemLabel: {
        color: '#4D5767',
        fontWeight: 'bold',
        fontSize: 18,
    },
    itemValue: {
        color: '#4D5767',
        fontSize: 16,
        marginBottom: 4
    },
    items: {
        width: '100%',
        marginTop: 30,
        marginBottom: 15,
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
    item: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingBottom: 10,
        borderBottomWidth: 0.4,
        borderColor: '#4D5767'
    },
})