import { LinearGradient } from 'expo-linear-gradient';
import { useState } from "react";
import { Image, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { Article } from "../article";
import ParallaxScrollView from "../parallax-scroll-view";
import { ThemedText } from "../themed-text";
import ArticleViewerModal from './article-viewer-modal';

type ArticleViewProps = {
  article: Article;
  onClose: () => void;
  visible: boolean;
};

export default function ArticleModal({ article,onClose,visible }: ArticleViewProps) {
    const [viewerVisible, setViewerVisible] = useState(false);
    return (
        <Modal visible={visible} onRequestClose={() => {
          // This triggers when Android Back button is pressed
          onClose();
        }}>
            <ParallaxScrollView 
                headerImage={
                    <>
                        <Image source={
    article.imageUrl
      ? { uri: article.imageUrl }
      : require('../../assets/placeholder.webp')
  } style={styles.image} resizeMode="contain" />
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.3)']}
                            style={StyleSheet.absoluteFillObject}
                        />
                        <ThemedText style={{textAlign:'left', position:'absolute', bottom: 8,left:16}}>Source: {article.source}</ThemedText>
                        <TouchableOpacity onPress={onClose} style={[styles.button,{position: 'absolute',left:12,top:12}]}>
                            <ThemedText>Back</ThemedText>
                        </TouchableOpacity>
                    </>
                }
                headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            >
                <ThemedText type="title" style={styles.title}>{article.title}</ThemedText>
                <ThemedText style={styles.description}>{article.description}</ThemedText>
                <TouchableOpacity onPress={() => {setViewerVisible(true)}}>
                    <ThemedText style={{textAlign:'center'}}>Read more...</ThemedText>
                </TouchableOpacity>
            </ParallaxScrollView>
            <ArticleViewerModal article={article} visible={viewerVisible} onClose={() => {setViewerVisible(false)}}/>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        padding: 8
    },
    image: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
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