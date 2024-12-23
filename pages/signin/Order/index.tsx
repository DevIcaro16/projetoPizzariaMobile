import React, { useState, useEffect } from "react";
import { 
        View, 
        Text, 
        StyleSheet, 
        TouchableOpacity, 
        TextInput,
        Modal,
        FlatList
        } from "react-native";

import { useRoute, RouteProp, useNavigation } from "@react-navigation/native"; //RouteProp -> Propiedaes do useRouter
import { Feather } from "@expo/vector-icons";
import { api } from "../../../services/api";
import ModalPicker from "../../../components/ModalPicker";
import ListItem from "../../../components/ListItens";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../../routes/app.routes";


type RouteDetailsParams = {
    Order: {
        number: number | string,
        order_id: string
    }
};

export type CategoryProps = {
    id: string;
    name: string
};

type ProductsProps = {
    id: string;
    name: string
};

type ItensProps = {
    id: string;
    product_id: string;
    name: string
    amount: string | number;
};

type OrderRouteProps = RouteProp<RouteDetailsParams, 'Order'>;

export default function Order() {

    const route = useRoute<OrderRouteProps>();

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const [category, setCategory] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>();

    const [amount, setAmount] = useState<string>("1");

    const [itens, setItens] = useState<ItensProps[] | []>([]);

    const [products, setProdutcs] = useState<ProductsProps[] | []>([]);

    const [productSelected, setProductSelected] = useState<ProductsProps | undefined>();

    const [modalProductVisible, setModalProductVisible] = useState<boolean>(false);

    const [modalCategoryVisible, setModalCategoryVisible] = useState<boolean>(false);


    //useEffect para sempre que abrir a tela de Orders / Pedidos ser Carregada a Lista de Categorias
    useEffect( () => {

        //Método para Realizar a Requisição que Retorna a Lista de Categorias
        async function loadInfo() {

            //Requisição GET
            const response = await api.get('/categories');

            console.log(response.data.categories[0].name);

            setCategory(response.data.categories);
            setCategorySelected(response.data.categories[0]);
        }

        loadInfo();
        // console.log(category)
    }, [] );


    //useEffect com array de dependências categorySelected (sempre que a categoria selecionada mudar, faz a requisição pelo useEffect)
    useEffect( () => {
        async function loadProducts() {
            const response = await api.get("/category/products", {
                params: {
                    category_id: categorySelected?.id
                }
            });

            console.log("====================================================");
            console.log(response.data.findByCategory);

            setProdutcs(response.data.findByCategory);
            setProductSelected(response.data.findByCategory[0]);

        };

        loadProducts();

    }, [categorySelected]);

    async function handleCloseOrder() {

        console.log("CLOSE ORDER!");

        try {

            //Requisição para Fechar a Order / Pedido da Mesa
            const response = await api.delete('/order', {
                params:{
                    order_id: route.params?.order_id
                }
            });

            console.log(response.data);

            //goBack -> Método que Voltar Para a Tela Anterior 
            navigation.goBack();

        } catch (error) {
            console.log(`Error ao Realizar a Requisição: ${error}`);
        }
    }

    function handleChangeCategory(option: CategoryProps) {
        setCategorySelected(option);    
    }

    function handleChangeProduct(option: ProductsProps) {
        setProductSelected(option);
    }

    //Método / Função para Adicionar Itens na Mesa (Order)
    async function handleAddItens() {

        console.log("handleAddItens!");

        console.log({
            order_id: route.params?.order_id,
            product_id: productSelected?.id,
            amount: amount
        });

        const response = await api.post("/order/addItem", {
            order_id: route.params?.order_id,
            product_id: productSelected?.id,
            amount: Number(amount)
        });

        console.log(response.data);

        let data = {
            id: response.data.item.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            amount: amount
        };

        console.log(data);

        //Retorna o array antigo (com os registros de Itens já Existentes e adiciona um novo registro de Item (data) )
        setItens(oldArray => [...oldArray, data]);

    }

    //Função / Método Para Realizar a Requisição que fará a Exclusão / Retirada De um Item do Pedido (Order)
    async function handleDeleteItem(item_id: string) {

        const response = await api.delete("/order/removeItem", {
            params: {
                item_id: item_id
            }
        });

        console.log(response.data);

        //Após a Remoção do Item, Realizar a Atualização com Método Nativo do JS (filter)
        let removeItem = itens.filter( item => { //Percorre Toda a Lista / o Array e Retira Apenas o Que Estamos Mandando
            return(
                item.id !== item_id
            );
        });

        //Adiciona ao State dos Itens
        setItens(removeItem);
    }

    function handleFinishOrder() {
        // alert("handleFinishOrder");
        navigation.navigate("FinishOrder", { 
            number: route.params?.number,
            order_id: route.params?.order_id
         });
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Mesa {route.params.number}
                </Text>
                    {
                        itens.length === 0 && (
                            <TouchableOpacity onPress={handleCloseOrder}>
                                <Feather name="trash-2" size={32} color="#FF3F4b"/>
                            </TouchableOpacity>

                        )
                    }
                    
            </View>     

            {
                category.length !== 0 && (
                    <TouchableOpacity style={styles.input} onPress={ () => setModalCategoryVisible(true) }>
                        <Text style={{ color: '#FFF' }}>
                            {
                                categorySelected?.name
                            }
                        </Text>
                    </TouchableOpacity>
                )
            }

            {
                products.length !== 0 && (
                    <TouchableOpacity style={styles.input} onPress={ () => setModalProductVisible(true) }>
                        <Text style={{ color: '#FFF' }}>
                            {
                                productSelected?.name
                            }
                        </Text>
                    </TouchableOpacity>
                )
            }

            {/* <TouchableOpacity style={styles.input}>
                <Text style={{ color: '#FFF' }}>
                    Pizza De Calabresa
                </Text>
            </TouchableOpacity> */}

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>
                    Quantidade
                </Text>
                <TextInput
                    style={[styles.input, { width: '60%', textAlign: 'center' }]}
                    placeholder='1'
                    placeholderTextColor='#F0F0F0'
                    keyboardType="numeric" 
                    value={amount}
                    onChangeText={ (amount) => setAmount(amount) }       
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAddItens}>
                    <Text style={[styles.buttonText, { fontSize: 28 }]}>
                        +
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                        style={[styles.button, { opacity: (itens.length === 0 ? .3 : 1)}]}
                        disabled={ itens.length === 0 }
                        onPress={handleFinishOrder}
                >
                    <Text style={styles.buttonText}>
                        Avançar
                    </Text>
                </TouchableOpacity>
            </View>

            {/**Recurso do React Native para Trabalhar com Listas Extensas */}
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginTop: 24 }}
                data={itens}
                keyExtractor={ (item) => item.id }
                renderItem={({ item }) => <ListItem data={item} deleteItem={handleDeleteItem}/>}
            />

            <Modal
                transparent={true}
                visible={modalCategoryVisible}
                animationType="fade"    
            >
                <ModalPicker
                    handleCloseModal = { () => setModalCategoryVisible(false) }
                    options={category}
                    selectedItem = { handleChangeCategory }

                />

            </Modal>


            <Modal
                transparent={true}
                visible={modalProductVisible}
                animationType="fade"    
            >
                <ModalPicker
                    handleCloseModal = { () => setModalProductVisible(false) }
                    options={products}
                    selectedItem = { handleChangeProduct }

                />

            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D1D2E',
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%'
    },

    header:{
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24
    },

    title:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginRight: 16
    },

    input:{
        backgroundColor: '#101026',
        borderRadius: 8,
        width: '100%',
        height: 44,
        marginBottom: 16,
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#FFF',
        fontSize: 22
    },

    qtdContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    qtdText:{
        fontSize: 24,
        fontWeight: 'bold',
        color: "#FFF"
    },

    actions:{
        flexDirection: 'row',
        marginTop: 12,
        width: '100%',
        justifyContent: 'space-between',
    },

    buttonAdd:{
        backgroundColor: '#3FD1FF',
        borderRadius: 8,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: '35%'
    },

    buttonText:{
        color: '#101026',
        fontSize: 24,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },

    button: {
        backgroundColor: '#3FFFA3',
        width: '60%',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    }
});