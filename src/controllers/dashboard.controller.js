import HomeDashboard from "../views/dashboard/home.dashboard";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrdersController from "./orders.controller";

const Stack = createNativeStackNavigator();

export default function DashboardController() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
                name="Home"
                component={HomeDashboard}
            />
            <Stack.Screen
                options={{
                    headerTitle: 'Pedidos de Venda'
                }}
                name="SalesOrders"
                component={OrdersController} />
        </Stack.Navigator>
    )
}