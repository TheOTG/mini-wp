Vue.component('login-form', ({
    template: `
    <div class="container">

        <div class="row align-items-center" style="height:100vh">

            <div class="col-sm-6">
                <h1>Welcome to Mini WP</h1>
                <p>Where you can write and publish an article</p>
            </div>

            <div class="col-sm-6">

                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="signIn-tab" data-toggle="tab" href="#login" role="tab" aria-controls="signIn" aria-selected="true" @click.prevent="clearField">Sign In</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="signUp-tab" data-toggle="tab" href="#register" role="tab" aria-controls="signUp" aria-selected="false" @click.prevent="clearField">Sign Up</a>
                    </li>
                </ul>

                <div class="tab-content" id="myTabContent">

                    <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="signIn-tab">
                        <form @submit.prevent="login">
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" class="form-control" placeholder="Enter email" v-model="email">
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" class="form-control" placeholder="Password" v-model="password">
                            </div>
                            <div class="mb-2">
                                <pre style="color: red;">{{ errorMsg }}</pre>
                            </div>
                            <div class="row justify-content-between align-items-center">
                                <div class="loader ml-4" v-if="$parent.isLoading"></div>
                                <button type="submit" class="btn btn-primary ml-3" v-if="!$parent.isLoading">Submit</button>
                                <div id="google-signin-button" class="mr-3"></div>
                            </div>
                        </form>    
                    </div>

                    <div class="tab-pane fade" id="register" role="tabpanel" aria-labelledby="signUp-tab">
                        <form @submit.prevent="register">
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" class="form-control" placeholder="Email" v-model="email">
                            </div>
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control"  placeholder="Name" v-model="name">
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" class="form-control" placeholder="Password" v-model="password">
                            </div>
                            <div class="mb-2">
                                <pre style="color: red;">{{ errorMsg }}</pre>
                            </div>
                            <div class="row justify-content-between align-items-center">
                                <div class="loader ml-4" v-if="$parent.isLoading"></div>
                                <button type="submit" class="btn btn-primary ml-3" v-if="!$parent.isLoading">Submit</button>
                            </div>
                        </form>
                    </div>

                </div>

            </div>

        </div>

    </div>
    `,
    data (){
        return {
            name: '',
            email :'',
            password : '',
            errorMsg: null
        }
    },
    mounted() {
        gapi.signin2.render('google-signin-button', {
            onsuccess: this.googleLogin
        })
    },
    methods : {
        clearField() {
            this.name = ''
            this.email = ''
            this.password = ''
            this.errorMsg = null
        },
        register() {
            this.$parent.isLoading = true
            axios.post(`${baseURL}/users/register`, {
                name: this.name,
                email: this.email,
                password: this.password
            })
            .then(({ data })=> {
                swal('Registration Success!')
            })
            .catch(err => {
                this.errorMsg = []
                let errors = err.response.data.errors
                for(let key in errors) {
                    this.errorMsg.push(errors[key].message)
                }
                this.errorMsg = this.errorMsg.join('\n')
                console.log(err)
            })
            .finally(() => {
                this.$parent.isLoading = false
            })
        },
        login() {
            this.$parent.isLoading = true
            axios.post(`${baseURL}/users/login`, {
                email: this.email,
                password: this.password
            })
            .then(({data})=> {
                localStorage.setItem('access_token', data)
                this.$parent.isLogin = true
                this.$parent.getArticles()
            })
            .catch(err => {
                this.errorMsg = 'Wrong email/password!'
                console.log(err)
            })
            .finally(() => {
                this.$parent.isLoading = false
            })
        },
        googleLogin(googleUser) {
            const idToken = googleUser.getAuthResponse().id_token
            axios.post(`${baseURL}/users/googleLogin`, {
                idToken
            })
            .then(({ data }) => {
                localStorage.setItem('access_token', data)
                this.$parent.isLogin = true
                this.$parent.getArticles()
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}))