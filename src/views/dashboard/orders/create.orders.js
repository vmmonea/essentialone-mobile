import moment from "moment/moment";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from "react-native";
import { Table, Row, Rows } from 'react-native-table-component';
import Icon from "react-native-vector-icons/AntDesign";

import DateTimePicker from '@react-native-community/datetimepicker';
import ClientModalComponent from "../../../components/client.component";
import BranchsModalComponent from "../../../components/branchs.component";

export default function CreateOrders() {

    const [Branch, setBranch] = useState({
        name: 'Selecione uma',
        code: ''
    })

    const [Card, setCard] = useState({
        name: 'Selecione um',
        code: ''
    })

    const [DocDate, setDocDate] = useState(moment())
    const [DocDueDate, setDocDueDate] = useState(moment())

    const [editingDate, setEditingDate] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [branchVisible, setBranchVisible] = useState(true);

    const [DocumentLines, setDocumentLines] = useState([])

    const handleChangeDate = (event) => {
        console.log(event)

        if (event.type === 'dismissed') return setEditingDate(null)

        setEditingDate(null)

        if (editingDate === 'DocDate') setDocDate(moment(event.nativeEvent.timestamp))
        if (editingDate === 'DocDueDate') setDocDueDate(moment(event.nativeEvent.timestamp))

        console.log(DocDate)

    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {
                <ClientModalComponent
                    onSelect={setCard}
                    onClose={() => setModalVisible(false)}
                    visible={modalVisible}
                />

            }
            {
                <BranchsModalComponent
                    onSelect={setBranch}
                    onClose={() => setBranchVisible(false)}
                    visible={branchVisible}
                />
            }
            {
                Platform.OS === 'android' && editingDate !== null &&
                <DateTimePicker
                    style={{ width: '100%' }}
                    value={new Date(DocDate)}
                    onChange={handleChangeDate}
                    mode='date'
                    display='default'
                />

            }
            {
                <>
                    <View style={styles.card}>
                        <TouchableOpacity
                            style={{ marginBottom: 25 }}
                            onPress={() => setBranchVisible(true)}

                        >
                            <View style={styles.select}>
                                <Text style={styles.value}>{Branch.name}</Text>
                                <Icon name="edit" size={24} />
                            </View>
                            <Text style={styles.label}>Filial</Text>
                        </TouchableOpacity>
                        <View style={styles.header}>
                            <Icon name="user" size={44} color="#4D5767" />
                            <TouchableOpacity
                                style={{ marginLeft: 15 }}
                                onPress={() => setModalVisible(true)}
                            >
                                <View style={styles.select}>
                                    <Text style={styles.value}>{Card.name}</Text>
                                    <Icon name="edit" size={24} />
                                </View>
                                <Text style={styles.label}>{Card.code}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.content}>
                            <TouchableOpacity
                                onPress={() => setEditingDate('DocDate')}
                            >
                                <View style={styles.select}>
                                    {
                                        Platform.OS === 'ios' ?
                                            <DateTimePicker
                                                style={{ width: '50%' }}
                                                value={new Date(DocDate)}
                                                mode='date'
                                                display='default'
                                            />
                                            :
                                            <>
                                                <Text style={styles.value}>{moment(DocDate).format('DD/MM/YYYY')}</Text>
                                                <Icon name="edit" size={24} />
                                            </>
                                    }
                                </View >
                                <Text style={styles.label}>Data de Lançamento</Text>
                            </TouchableOpacity >
                            <TouchableOpacity
                                onPress={() => setEditingDate('DocDueDate')}
                            >
                                <View style={styles.select}>
                                    {
                                        Platform.OS === 'ios' ?
                                            <DateTimePicker
                                                style={{ width: '50%' }}
                                                value={new Date(DocDueDate)}
                                                mode='date'
                                                display='default'
                                            />
                                            :
                                            <>
                                                <Text style={styles.value}>{moment(DocDueDate).format('DD/MM/YYYY')}</Text>
                                                <Icon name="edit" size={24} />
                                            </>
                                    }

                                </View>
                                <Text style={styles.label}>Data de Entrega</Text>
                            </TouchableOpacity>
                        </View >
                        <View style={styles.footer}>
                            <View>
                                <Text style={styles.value}>{`R$ 0`}</Text>
                                <Text style={styles.label}>Total do Documento</Text>
                            </View>
                        </View>
                    </View >
                    <View style={styles.items}>
                        <Text style={styles.value}>Linhas</Text>
                        {
                            DocumentLines.map((item, index) => {
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
                                                                <Label text={'Preço'} />,
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

        </ScrollView >
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
    select: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    value: {
        color: '#4D5767',
        fontWeight: 'bold',
        fontSize: 22,
        marginRight: 5
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