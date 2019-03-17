Vue.component('navbar-left', {
    template: `
    <div class="col mr-5 border border-left-0 border-top-0">
        <ul class="nav flex-column">
            <li class="nav-item">
                <a class="nav-link active" href="#" @click.prevent="newArticlePage"><i class="fas fa-file mr-2"></i> Write</a>
            </li>
            <li class="nav-item">
                <div class="nav-link">
                    <i class="fas fa-tools mr-2"></i>Customize
                </div>
            </li>
        </ul>
    </div>
    `,
    methods: {
        newArticlePage() {
            this.$parent.resetArticle()
            this.$parent.togglePage(false, true, false, false)
        }
    },
})