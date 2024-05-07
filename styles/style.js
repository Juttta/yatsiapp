import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    header: {
        marginTop: 30,
        marginBottom: 15,
        backgroundColor: "#FFCE54",
        flexDirection: "row",
    },
    footer: {
        marginTop: 20,
        backgroundColor: "#FFCE54",
        flexDirection: "row",
    },
    title: {
        color: 'black',
        fontWeight: "bold",
        flex: 1,
        fontSize: 23,
        textAlign: 'center',
        margin: 10,
    },
    author:{
        color: "black",
        fontWeight: 'bold',
        flex: 1,
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
    },
    row: {
        marginTop: 20,
        padding: 10,
    },
    flex: {
        flexDirection: "row",
    },
    button:{
        margin: 30,
        flexDirection: "row",
        padding: 10,
        backgroundColor: "#FFCE54",
        width: 150,
        borderRadius: 15,
        justifyContent:"center",
        alignItems: "center",
    },
    buttonText:{
        color: "black",
        fontSize: 20,
    },
    text:{
        textAlign: 'center',

    },

});

//#FCBB42  #FFCE54