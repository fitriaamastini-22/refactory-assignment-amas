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
            axios.post('http://localhost:8080/api/users/signup', {
                first_name: 'c',
                last_name: 'c',
                email: 'c@mail.com',
                password: '1234'
            },
            {
                token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTk4ODYwOTE1LCJleHAiOjE2MDE0NTI5MTV9.WYNjAVFqRbW41GKaLQFcIWJni66c8gyMn0V-caf1pVs'
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