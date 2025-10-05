import { Article } from '@/components/article';
import Empty from '@/components/empty';
import ListArticleComponent from '@/components/list-article-component';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ArticleModal from '@/components/ui/article-modal';
import { API_KEY } from '@env';
import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, useColorScheme, View } from 'react-native';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();

  const [articles, setArticles] = useState<Article[]>([]);
  const [reload,setReload] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchTopStories = async () => {
        console.log("fetching");
        const api_url = "https://newsdata.io/api/1/news?apikey="+API_KEY+"&language=en";
        const result = await fetch(api_url);
        console.log(result);
        const data = await result.json();
        let articlesArray: Article[] = []
        for(let i = 0; i < 10; i++) {
          let jsonArticle = data.results[i];
          let newArticle = new Article("", jsonArticle.title, jsonArticle.description, jsonArticle.category,jsonArticle.source_name,jsonArticle.image_url,jsonArticle.link,jsonArticle.source_icon);
          articlesArray.push(newArticle);
        }
        setArticles(articlesArray);
    };

    fetchTopStories();
  }, [reload]);

  return (
    <>
    <ScrollView style={{flex: 1, flexDirection:'column'}} contentContainerStyle={{flexGrow:1, justifyContent:'center'}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setReload(!reload)} />}>
      <ThemedView style={styles.container}>
        <Empty />
        <ThemedText type='title' style={{marginBottom: 24}}>All articles</ThemedText>
        {articles.map((value, index)=>(
          <View key={index}><ListArticleComponent article={value} onPress={() => {
            console.log("modal pressed");
            setSelectedArticle(value);
            setModalVisible(true);
          }} /></View>
        ))}
        <Empty />
      </ThemedView>
    </ScrollView>
    {selectedArticle && <ArticleModal visible={modalVisible} article={selectedArticle} onClose={() => {setModalVisible(false)}} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
