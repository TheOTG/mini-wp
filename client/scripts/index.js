// const baseURL = 'http://miniwp-server.kennyanthonythe.xyz'
const baseURL = 'http://localhost:3000'

var vm = new Vue({
    el: '#app',
    data: {
        listArticle: false,
        newArticle: false,
        showArticle: false,
        editArticle: false,
        search: '',
        articles: [],
        userArticles: [],
        articleId: null,
        articleTitle: null,
        articleContent: null,
        articleDate: null,
        featuredImage: null,
        isLogin: false,
        showDelete: false,
        isLoading: false
    },
    computed: {
        filterArticle() {
            return this.articles.filter(article => {
                return article.title.search(new RegExp(this.search, 'i')) > -1
            })
        }
    },
    mounted() {
        if(localStorage.access_token) {
            this.isLogin = true
            this.getArticles()
        }
    },
    methods: {
        convertDate(date) {
            let timestamp = new Date(date)
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            return `${timestamp.getDate()} ${months[timestamp.getMonth() - 1]} ${timestamp.getFullYear()}`
        },
        getArticles() {
            axios.get(`${baseURL}/articles`, {
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(({ data }) => {
                this.resetArticle()
                this.articles = data
                this.togglePage(true, false, false, false)
            })
            .catch(err => {
                console.log(err)
            })
        },
        getMyArticles() {
            axios.get(`${baseURL}/articles/user`, {
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(({ data }) => {
                this.articles = data
                this.showDelete = true
                this.togglePage(true, false, false, false)
            })
            .catch(err => {
                console.log(err)
            })
        },
        resetArticle() {
            this.articleId = ''
            this.articleTitle = ''
            this.articleContent = ''
            this.articleDate = ''
            this.featuredImage = null
            this.imageFile = null
            this.imageUrl = null
            this.showDelete = false
        },
        togglePage(isList, isNew, isEdit, isShow) {
            this.listArticle = isList
            this.newArticle = isNew
            this.editArticle = isEdit
            this.showArticle = isShow
        }
    }
})