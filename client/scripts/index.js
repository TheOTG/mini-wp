const baseURL = 'http://localhost:3000'

var vm = new Vue({
    el: '#mainBody',
    data: {
        listArticle: false,
        newArticle: false,
        search: '',
        articles: [],
        articleTitle: '',
        articleContent: ''
    },
    computed: {
        filterArticle() {
            return this.articles.filter(article => {
                return article.title.indexOf(this.search) > -1
            })
        }
    },
    methods: {
        listArticlePage() {
            this.newArticle = false
            this.listArticle = true
            this.articleTitle = ''
            this.articleContent = ''
            this.getArticles()
        },
        newArticlePage() {
            this.articleTitle = ''
            this.articleContent = ''
            this.newArticle = true
            this.listArticle = false
        },
        consoleTest() {
            console.log('hai')
        },
        editArticle() {

        },
        deleteArticle() {

        },
        createArticle() {
            axios.post(`${baseURL}/articles`, {
                id: this.articles.length,
                title: this.articleTitle,
                content: this.articleContent,
                created_at: new Date()
            })
            .then(({ data }) => {
                console.log(data)
                this.articleTitle = ''
                this.articleContent = ''
                this.listArticlePage()
            })
            .catch(err => {
                console.log(err)
            })
        },
        getArticles(email) {
            axios.get(`${baseURL}/articles`)
            .then(({ data }) => {
                vm.articles = data
            })
            .catch(err => {
                console.log(err)
            })
        },
        changeTheme(bgColor, textColor) {
            $('body')[0].style.backgroundColor = bgColor
            $('body')[0].style.color = textColor
            // axios.get(`${baseURL}/users/1`)
            // .then(({ data }) => {
            //     document.querySelector('body').style.backgroundColor = data.bgColor
            //     document.querySelector('body').style.color = data.textColor
            //     console.log(data)
            // })
            // .catch(err => {
            //     console.log(err)
            // })
        }
    }
})