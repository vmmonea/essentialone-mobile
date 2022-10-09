import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import LoadingComponent from "./loading.component";

import api from '../services/api';

const BranchsModalComponent = ({ onClose, onSelect, visible }) => {

    const [branchs, setBranchs] = useState([]);
    const [search, setSearch] = useState(null);
    const [loading, setLoading] = useState(true);


    async function getBranchs(search = null) {
        setLoading(true);
        try {
            const url = `/branches${search ? `/${search}` : ''}`
            console.log(url)
            const { data } = await api.get(url, {
                headers: {
                    auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoiZjJiNmZmOWMtNDc3ZS0xMWVkLTgwMDAtMDA1MDU2ODU4MjUwIiwiY29tcGFueUlkIjoiMyIsInVybCI6Imh0dHBzOi8vaGFuYWRiZGV2LmIxY2xvdWQuY29tLmJyOjUwMDAwL2Ixcy92MS8iLCJpYXQiOjE2NjUyODQ2MTEsImV4cCI6MTY2NTYzMDIxMX0.OSsTDp_2hDTkfMbk6Vac9U3gbevj-x8ZK-8gerjZYXE',
                    'x-api-key': 'zq6pl6e36F7r05EkZQMuB7ExnHKI2BHl7pFlf5bn'
                }
            });
            console.log(data)

            setBranchs(data)

        } catch (error) {
            console.log(error);
            console.log(error.response.data)
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        getBranchs()
    }, [])

    return (
        <View style={styles.centeredView}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >

                <View style={styles.centeredView}>
                    {
                        loading && <LoadingComponent />
                    }
                    <View style={styles.modalView}>
                        <View style={styles.searchView}>
                            <TextInput
                                style={styles.search}
                                placeholder="Pesquisar filial"
                                placeholderTextColor="#209AFA"
                                value={search}
                                onChangeText={setSearch}
                            />
                            <TouchableOpacity
                                style={styles.searchButton}
                                onPress={() => getBranchs(search)}
                            >
                                <Icon name="search1" color="#209AFA" size={24} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{ width: '100%' }}>
                            {
                                branchs.map((branch) => {
                                    return (
                                        <TouchableOpacity
                                            style={styles.branch}
                                            onPress={() => {
                                                onSelect({ code: branch.Code, name: branch.Name })
                                                onClose()
                                            }}
                                        >
                                            <Text style={styles.value}>{branch.Name}</Text>
                                            <Text style={styles.label}>{branch.Description}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                        <View style={styles.cancelView}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={onClose}
                            >
                                <Icon name="close" color="white" size={24} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(240, 248, 254, 0.7)"
    },
    modalView: {
        width: '85%',
        height: '85%',
        alignItems: 'center',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalContentView: {
        width: '100%',
    },
    searchView: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    search: {
        flex: 1,
        backgroundColor: '#F0F8FE',
        height: 48,
        marginRight: 10,
        borderRadius: 8,
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: 'bold',
    },
    searchButton: {
        backgroundColor: '#F0F8FE',
        height: 48,
        width: 48,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    branch: {
        marginTop: 10,
        width: '100%'
    },
    value: {
        color: '#4D5767',
        fontWeight: 'bold',
        fontSize: 20,
        marginRight: 5
    },
    label: {
        color: '#4D5767',
        fontSize: 16,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    cancelView: {
        width: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    cancelButton: {
        backgroundColor: "#rgba(255,0,0, 0.7)",
        height: 44,
        width: '40%',
        borderRadius: 10,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center"
    },
    cancel: {
        color: '#fff'
    }
});

export default BranchsModalComponent;