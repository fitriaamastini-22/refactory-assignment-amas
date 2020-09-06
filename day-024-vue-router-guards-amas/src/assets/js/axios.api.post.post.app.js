var app = new Vue({
    el: '#app',
    data: {

        info: '',
        errored: null,
        error: ''
    },
    mounted() {

    },
    methods: {
        adduser: function () {
            axios.post({
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTk4ODYxNDI0LCJleHAiOjE2MDE0NTM0MjR9.IPV-ujyO8vZcAPQrcOwd1k3e0awmaNpOmYlPNkTeaic'
            },'http://localhost:8080/api/posts/',
                {
                    title: 'pemgroman',
                    description: 'JAVA WITH PBO'
                },
            ).then(response => {
                this.info = response.data.id
            })
                .catch(error => {
                    this.error = error
                    this.errored = true
                })

        }
    },


})