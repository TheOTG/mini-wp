Vue.component('home-page', {
    template: `
     <div class="col-9 p-0 m-2" v-if="$parent.listArticle">
        <div class="row">
            <div class="mt-3 mr-3" v-for="article in $parent.articles">
                <div class="col-12 p-1 border">
                    <div class="row align-items-center">
                        <div class="col-4">
                            <img :src="article.featured_image" class="m-2" style="width: 100px; height: 100px;">
                        </div>
                        <div class="col-6">
                            <div>
                                {{ article.title }}
                            </div>
                            <div>
                                {{ convertDate(article.created_at) }}
                            </div>
                        </div>
                        <div class="col">
                            <div><a class="btn btn-block" style="background-color: #1a73e8;color: white; padding-top:1px; padding-bottom: 1px;" @click="showArticle(article._id)">View</a></div>
                            <div><a class="btn btn-block mt-1" v-if="$parent.showDelete" style="background-color:green;color: white;padding-top:1px;padding-bottom: 1px;" @click.prevent="editArticle(article._id)">Edit</a></div>
                            <div><a class="btn btn-block mt-1" v-if="$parent.showDelete" style="background-color:red;color: white;padding-top:1px;padding-bottom: 1px;" @click.prevent="deleteArticle(article._id)">Delete</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </div>
    `,
    methods: {
        shareFacebookUrl(file) {
            return `https://www.facebook.com/sharer/sharer.php?u=${item.url}`
        },
        shareTwitterUrl(file) {
            return `https://twitter.com/home?status=${item.url}`
        },
        shareLinkedInUrl(file) {
            return `https://www.linkedin.com/shareArticle?mini=true&url=${item.url}&title=Title&summary=Summary&source=Sorce`
        },
        shareGoogleUrl(file) {
            return `https://plus.google.com/share?url=${item.url}`
        },
        convertDate(date) {
            let timestamp = new Date(date)
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            return `${timestamp.getDate()} ${months[timestamp.getMonth()]} ${timestamp.getFullYear()}`
        },
        showArticle(id) {
            axios.get(`${baseURL}/articles/${id}`, {
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(({ data }) => {
                this.$parent.articleId = data._id
                this.$parent.articleTitle = data.title
                this.$parent.articleContent = data.content
                this.$parent.articleDate = data.created_at
                this.$parent.featuredImage = data.featured_image
                this.$parent.togglePage(false, false, false, true)
            })
            .catch(err => {
                console.log(err)
            })
        },
        editArticle(id) {
            axios.get(`${baseURL}/articles/${id}`, {
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(({ data }) => {
                this.$parent.articleId = data._id
                this.$parent.articleTitle = data.title
                this.$parent.articleContent = data.content
                this.$parent.articleDate = data.created_at
                this.$parent.featuredImage = data.featured_image
                this.$parent.togglePage(false, false, true, false)
            })
            .catch(err => {
                console.log(err)
            })
        },
        deleteArticle(id) {
            axios.delete(`${baseURL}/articles/${id}`, {
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(({ data }) => {
                this.$parent.getMyArticles()
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
})