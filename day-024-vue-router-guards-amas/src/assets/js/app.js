var app = new Vue({
    el: '#app',
    data: {
        show: true,
        show2: 'ready',
        message: 'hello vue',
        message2: '<b>hello vue2</b>',
        int1: 1,
        int2: 2,
        result: null,
        kilometer:0,
        meter:0
    },
    computed: {
        sum: function () {

            return this.int1 + this.int2;
        }
    },
    methods: {
        sumProses: function (int3) {
            return this.result = this.int1 + this.int2 + int3;
        }
    },
    watch: {
        kilometer:function(val){
            this.kilometer= val;
            this.meter = val * 1000;
        },
        meter:function(val){
            this.meter = val;
            this.kilometer= val / 1000;
            
        }
    },
})