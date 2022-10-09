import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginView from "../views/auth/login.auth";
import AllOrders from "../views/dashboard/orders/all.orders";
import CreateOrders from '../views/dashboard/orders/create.orders';
import SpecifyOrders from '../views/dashboard/orders/specify.orders';

const Stack = createNativeStackNavigator();

export default function OrdersController() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="AllOrders"
                component={AllOrders}
            />
            <Stack.Screen
                name="SpecifyOrders"
                component={SpecifyOrders}
            />
            <Stack.Screen
                name="CreateOrders"
                component={CreateOrders}
            />
        </Stack.Navigator>
    )
}