Vue.component('navbar-top', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-dark justify-content-between">
        <div class="row">
        <a class="navbar-brand ml-3 p-1 rounded" href="#" style="color: black; background-color: white;" @click.prevent="homePage">Mini <i class="fab fa-wordpress"></i></a>
        <a class="nav-link" href="#" style="color: white;" @click.prevent="homePage">Home</a>
        <a class="nav-link" href="#" style="color: white;" @click.prevent="$parent.getMyArticles">My Articles</a>
        </div>
        <button class="navbar-item btn btn-danger my-2 my-sm-0" @click.prevent="logout">Logout</button>
    </nav>
    `,
    methods: {
        homePage() {
            this.$parent.resetArticle()
            this.$parent.getArticles()
            this.$parent.togglePage(true, false, false, false)
        },
        logout() {
            let auth2 = gapi.auth2.getAuthInstance()
            auth2.signOut()
            .then(() => {
                this.$parent.isLogin = false
                localStorage.clear()
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
})