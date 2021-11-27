import React, { useContext } from "react";
import { StyleSheet, View, Button } from "react-native";
import AuthContext from "../../contexts/auth";

const Home: React.FC = () => {
    const { signOut } = useContext(AuthContext);

    async function handleSignOut() {
      signOut();
    }
    return (
    <View style={styles.container}>
        <Button title="Sign Out" onPress={handleSignOut} />
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    }
});  

export default Home;