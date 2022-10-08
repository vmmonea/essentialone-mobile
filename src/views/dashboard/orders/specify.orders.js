import moment from "moment/moment";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Table, Row, Rows } from 'react-native-table-component';

import api from '../../../services/api';

export default function SpecifyOrders({ route }) {

    const id = route.params.id;
    console.log(route)

    const [order, setOrder] = useState(null);
    const [lines, setLines] = useState([])
    const [editing, setEditing] = useState(false);

    async function getOrder(id) {
        try {

            const prepare = [];

            const { data } = await api.get(`/orders/${id}`, {
                headers: {
                    auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoiNzgxYzJkNjAtNDczZS0xMWVkLTgwMDAtMDA1MDU2ODU4MjUwIiwiY29tcGFueUlkIjoiMyIsInVybCI6Imh0dHBzOi8vaGFuYWRiZGV2LmIxY2xvdWQuY29tLmJyOjUwMDAwL2Ixcy92MS8iLCJpYXQiOjE2NjUyNTY5MTgsImV4cCI6MTY2NTYwMjUxOH0.k12iVcpoH3D80L5ALAl_co8vUwfIAFUk-FHehk1oHy8',
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
                    <View style={styles.field}>
                        <View style={styles.labelView}>
                            <Text style={styles.label}>Fornecedor</Text>
                        </View>
                        <View style={styles.valueView}>
                            <Text style={styles.value}>{order.CardName}</Text>
                        </View>
                    </View>
                    <View style={styles.field}>
                        <View style={styles.labelView}>
                            <Text style={styles.label}>Filial</Text>
                        </View>
                        <View style={styles.valueView}>
                            <TextInput style={styles.value} value={order.BPLName} />
                        </View>
                    </View>
                    <View style={styles.field}>
                        <View style={styles.labelView}>
                            <Text style={styles.label}>Data do Documento</Text>
                        </View>
                        <View style={styles.valueView}>
                            <Text style={styles.value}></Text>
                        </View>
                    </View>
                    <View style={styles.field}>
                        <View style={styles.labelView}>
                            <Text style={styles.label}>Data de Vencimento</Text>
                        </View>
                        <View style={styles.valueView}>
                            <Text style={styles.value}></Text>
                        </View>
                    </View>

                    <View style={{ ...styles.field, flexDirection: 'column' }}>
                        <View style={styles.labelView}>
                            <Text style={styles.label}>Items</Text>
                        </View>
                        <Table style={{ width: '100%', marginTop: 20 }} borderStyle={{}}>
                            <Row data={['Item', 'Quantidade', 'Preço', 'Total']} style={styles.head} textStyle={styles.textHead} />
                            <Rows data={lines} textStyle={styles.text} />

                        </Table>

                    </View>
                </>
            }

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        paddingTop: 20,
        backgroundColor: '#fff'
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    field: {
        width: '100%',
        backgroundColor: '#EEF6FF',
        marginBottom: 10,
        borderRadius: 10,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    labelView: {
        display: 'flex',
        width: '40%',
        alignItems: 'flex-end'
    },
    lineView: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'right',
        color: '#2C2C2C',
    },
    head: {
        marginBottom: 5,
    },
    text: {
        textAlign: 'center',
    },
    textHead: {
        fontWeight: 'bold',
        textAlign: 'center',
    },

})