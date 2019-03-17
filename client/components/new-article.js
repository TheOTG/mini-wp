Vue.component('new-article', {
    template: `
    <div class="col-9 p-0 mr-4" style="height: 500px;">
        <form enctype="multipart/form-data" @submit.prevent="createArticle">
            <h2>Title</h2>
            <input type="text" class="mb-2" ref="title" :value="$parent.articleTitle">
            <h2>Content</h2>
            <textarea ref="content" :value="$parent.articleContent"></textarea>
            <div>
                <input id="file" class="mt-2 mb-2" type="file" accept="image/*" @change="previewImage">
                <br>
                <img style="width: 100px; height: 100px;" v-if="$parent.featuredImage" :src="$parent.featuredImage">
            </div>
            <button type="submit" class="btn btn-primary mt-2">Submit</button>
        </form>
     </div>
    `,
    mounted() {
        $('textarea').froalaEditor()
    },
    data() {
        return {
            imageFile: null
        }
    },
    methods: {
        previewImage(e) {
            this.$parent.articleTitle = this.$refs.title.value
            this.$parent.articleContent = this.$refs.content.value
            this.imageFile = e.target.files[0]
            if(this.imageFile) {
                this.$parent.featuredImage = URL.createObjectURL(this.imageFile)
            } else {
                this.$parent.featuredImage = null
            }
        },
        createArticle() {
            
            var formData = new FormData()
            var dataFile = document.querySelector('#file')
            if(dataFile.files[0]) {
                formData.append('file', dataFile.files[0])
            }
            formData.append('title', this.$refs.title.value)
            formData.append('content', this.$refs.content.value)

            if(this.$parent.newArticle) {
                axios.post(`${baseURL}/articles`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        access_token: localStorage.access_token
                    }
                })
                .then(({ data }) => {
                    this.$parent.resetArticle()
                    this.$parent.getArticles()
                })
                .catch(err => {
                    console.log(err)
                })
            } else if(this.$parent.editArticle) {
                axios.put(`${baseURL}/articles/${this.$parent.articleId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        access_token: localStorage.access_token
                    }
                })
                .then(({ data }) => {
                    this.$parent.resetArticle()
                    this.$parent.getArticles()
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }
    }
})