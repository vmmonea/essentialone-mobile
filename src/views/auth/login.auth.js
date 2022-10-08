import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";
import api from "../../services/api";

export default function LoginView() {

    const [username, setUsername] = useState(null);

    const [email, setEmail ] = useState(null)
    const [password, setPassword ] = useState(null)

    const [base, setBase] = useState(null)
    const [bases, setBases] = useState([])

    async function handleGetBases(email) {
        try {
            const { data } = await api.get(`/company/email/${email}`);
            console.log(data);
            setBases(data)
        } catch (err) {
            console.log(err);
        }
    }

    async function handleGetUsername(email) {
        try {
            const { data } = await api.get(`/users/${email}`, {
                headers: {
                    'company-id': '3'
                }
            });
            console.log(data);
            setUsername(data.UserCode)
        } catch (err) {
            console.log(err);
            console.log(err.response.data);
        }
    }

    async function handleLoginSAP(username, password) {
        try {
            const { data } = await api.post(`/users/login`,
            {
                username,
                password
            },
            {
                headers: {
                    'company-id': '3'
                }
            });
            console.log(data);
            // setUsername(data.UserCode)
            
        } catch (err) {
            console.log(err);
            console.log(err.response.data);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.image} resizeMode='contain'  source={require('../../../assets/logo.png')} />
            <View style={styles.fields}>
                {
                    bases.length === 0 &&
                        <View style={styles.field}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Insira seu email...'
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                }
                {
                    username !== null &&
                        <View style={styles.field}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Insira seu email...'
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                }
                {
                    bases.length > 0 &&
                        <View style={styles.field}>
                            <Text style={styles.label}>Base</Text>
                            <Picker
                                selectedValue={base}
                                onValueChange={(itemValue, itemIndex) =>
                                    setBase(itemValue)
                                }>
                                    <Picker.Item label="Selecione uma base..." value={null} enabled={false} />
                                    {
                                        bases.map((base) => {
                                            return <Picker.Item key={base.id} label={base.nome} value={base.id} />
                                        })
                                    }
                            </Picker>
                        </View>
                }
                {
                    username !== null &&
                        <View style={styles.field}>
                            <Text style={styles.label}>Senha</Text>
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                style={styles.input}
                                placeholder='Insira sua senha...'
                            />
                        </View>
                }
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                    if (bases.length === 0) await handleGetBases(email)
                    else if (username === null) await handleGetUsername(email)
                    else if (username !== null & password !== null) await handleLoginSAP(username, password)
                }}
            >
                <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        paddingVertical: 80,
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
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
        height: 120,
    }
})