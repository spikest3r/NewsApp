import { Image, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Article } from "./article";
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

type ArticleViewProps = {
  article: Article;
  onPress: () => void;
};

export default function ListArticleComponent({ article, onPress }: ArticleViewProps) {
    const colorScheme = useColorScheme();

    return (
        <TouchableOpacity onPress={onPress} style={{paddingBottom: 12}}>
            <ThemedView lightColor='#F5F5F5' darkColor='#313131ff'>
                <ThemedText style={styles.source}>
                    {article.source?.length > 30 ? article.source.slice(0, 30) + "…" : article.source}
                </ThemedText>
                <View style={styles.container}>
                    <Image source={
    article.imageUrl
      ? { uri: article.imageUrl }
      : require('../assets/placeholder.webp')
  }  style={styles.articleImage} />
                    <View style={{width: 24}}></View>
                    <ThemedText style={styles.articleTitle}>
                        {article.title?.length > 72 ? article.title.slice(0, 72) + "…" : article.title}
                    </ThemedText>
                </View>
            </ThemedView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        margin: 8,
        overflow: 'hidden',  // IMPORTANT! prevents gradient/image from overflowing
        borderRadius:4,
        display: 'flex',
        flexDirection: 'row',
    },
    articleImage: {
        height:110,
        width:130,
    },
    articleTitle: {
        width: '50%',
    },
    background: {
         ...StyleSheet.absoluteFillObject, // makes it exactly cover the parent
    },
    source: {
        top: 8,left:16
    }
})