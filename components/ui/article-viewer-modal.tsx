import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { WebView } from 'react-native-webview';
import { Article } from "../article";
import { ThemedText } from "../themed-text";

type ArticleViewProps = {
  article: Article;
  visible: boolean;
  onClose: () => void;
};

export default function ArticleViewerModal({article,visible,onClose}: ArticleViewProps) {
    console.log(article.articleUrl);
    return (<Modal visible={visible}  onRequestClose={() => {
          // This triggers when Android Back button is pressed
          onClose();
        }}>
        <View style={{flex:1}}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
                <ThemedText style={{textAlign:"center"}}>Back</ThemedText>
            </TouchableOpacity>
            <View style={{flex:1}}>
                <WebView
                    source={{ uri: article.articleUrl }}
                    style={StyleSheet.absoluteFillObject}
                    onError={syntheticEvent => {
                        const { nativeEvent } = syntheticEvent;
                        console.warn('WebView error: ', nativeEvent);
                    }}
                />
            </View>
        </View>
    </Modal>)
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        padding: 16
    },
    image: {
        marginTop: 16,
        width: 350,
        height: 250
    },
    description: {
        padding: 10
    },
    button: {
        backgroundColor: '#002884',
        padding: 12,
        paddingLeft: 18,
        paddingRight: 18,
        borderRadius: 8
    }
})