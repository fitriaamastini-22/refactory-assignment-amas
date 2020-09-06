var app = new Vue({
    el: '#app',
    data: {
        message: '',
    },
    methods: {
        escKey: function () {
            this.message=
            'anda menekan tombol esc'
        },
        spaceKey: function () {
            this.message=
            'anda menekan tombol spasi'
        },
        upKey: function () {
            this.message=
            'anda menekan tombol up'
        },
        downKey: function () {
            this.message=
            'anda menekan tombol down'
        },
        aKey: function () {
            this.message=
            'anda menekan tombol a'
        },
    }
})