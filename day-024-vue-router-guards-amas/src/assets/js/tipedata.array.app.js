var app = new Vue({
    el: '#app',
    data: {
        content:'',
        vehicles:['mobil','motor','truk']
    },
    methods: {
        addVehicle: function(){
            this.vehicles.
            push(this.content);
            this.content='';
        },
        removeVehicle:function(index){
            this.vehicles.splice(index,1);
        }
    },
    
})