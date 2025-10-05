export class Article {
    uuid: string;
    title: string;
    description: string;
    categories: string[];
    source: string;
    imageUrl: string;
    articleUrl: string;
    source_icon: string;

    constructor(
        uuid: string,
        title: string,
        description: string,
        categories: string[],
        source: string,
        imageUrl: string,
        articleUrl: string,
        sourceIcon: string,
        
    ) {
        this.uuid = uuid;
        this.title = title;
        this.description = description;
        this.categories = categories;
        this.source = source;
        this.imageUrl = imageUrl;
        this.articleUrl = articleUrl;
        this.source_icon = sourceIcon;
    }
}