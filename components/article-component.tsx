import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Article } from "./article";
import { ThemedText } from "./themed-text";

type ArticleViewProps = {
  article: Article;
  onPress: () => void;
};

export default function ArticleComponent({ article, onPress }: ArticleViewProps) {
    const colorScheme = useColorScheme();

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View>
            <Image source={
    article.imageUrl
      ? { uri: article.imageUrl }
      : require('../assets/placeholder.webp')
  } style={styles.articleImage} />
                <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)']}
                    style={styles.background}
                />
                <ThemedText type="subtitle" style={styles.articleTitle}>{article.title}</ThemedText>
                <ThemedText style={styles.articleSource}>
                    {article.source?.length > 30 ? article.source.slice(0, 30) + "…" : article.source}
                </ThemedText>

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        margin: 8,
        overflow: 'hidden',  // IMPORTANT! prevents gradient/image from overflowing
        borderRadius:4
    },
    articleImage: {
        height:200,
        width:300,
    },
    articleTitle: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        padding:10,
    },
    background: {
         ...StyleSheet.absoluteFillObject, // makes it exactly cover the parent
    },
    articleSource: {
        position:'absolute',
        top:8,left:16,
    }
})