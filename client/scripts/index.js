const baseURL = 'http://localhost:3000'

var vm = new Vue({
    el: '#mainBody',
    data: {
        listArticle: true,
        newArticle: false,
        showArticle: false,
        editArticle: false,
        search: '',
        articles: [],
        articleId: '',
        articleTitle: '',
        articleContent: '',
        articleDate: ''
    },
    computed: {
        filterArticle() {
            return this.articles.filter(article => {
                return article.title.search(new RegExp(this.search, 'i')) > -1
            })
        }
    },
    methods: {
        resetTitleAndContent() {
            this.articleId = ''
            this.articleTitle = ''
            this.articleContent = ''
            this.articleDate = ''
        },
        togglePage(isList, isNew, isEdit, isShow) {
            this.listArticle = isList
            this.newArticle = isNew
            this.editArticle = isEdit
            this.showArticle = isShow
        },
        listArticlePage() {
            this.togglePage(true, false, false, false)
            this.resetTitleAndContent()
            this.getArticles()
        },
        newArticleForm() {
            this.resetTitleAndContent()
            this.togglePage(false, true, false, false)
        },
        showArticlePage(id) {
            axios.get(`${baseURL}/articles/${id}`)
            .then(({ data }) => {
                console.log(data)
                this.articleId = data._id
                this.articleTitle = data.title
                this.articleContent = data.content
                this.articleDate = data.created_at
                this.togglePage(false, false, false, true)
            })
            .catch(err => {
                console.log(err)
            })
        },
        editArticlePage(id) {
            axios.get(`${baseURL}/articles/${id}`)
            .then(({ data }) => {
                console.log(data)
                this.articleId = data._id
                this.articleTitle = data.title
                this.articleContent = data.content
                this.articleDate = data.created_at
                this.togglePage(false, false, true, false)
            })
            .catch(err => {
                console.log(err)
            })
        },
        deleteArticle(id) {
            axios.delete(`${baseURL}/articles/${id}`)
            .then(({ data }) => {
                console.log(data.message)
                this.getArticles()
            })
            .catch(err => {
                console.log(err)
            })
            
        },
        createArticle() {
            if(this.newArticle) {
                axios.post(`${baseURL}/articles`, {
                    title: this.articleTitle,
                    content: this.articleContent,
                    created_at: new Date()
                })
                .then(({ data }) => {
                    console.log(data)
                    this.resetTitleAndContent()
                    this.listArticlePage()
                })
                .catch(err => {
                    console.log(err)
                })
            } else if(this.editArticle) {
                axios.put(`${baseURL}/articles/${this.articleId}`, {
                    title: this.articleTitle,
                    content: this.articleContent,
                })
                .then(({ data }) => {
                    console.log(data)
                    this.resetTitleAndContent()
                    this.listArticlePage()
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        getArticles() {
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

vm.getArticles()