Vue.component('hello-bold', {
    template:
        ` <div>
            <b>hello</b><br>
            <i>hello</i>
            
        </div>
        `
});

Vue.component('button-counter', {
    data: function () {
        return {
            count: 0
        }
    },
    template:
        '<button v-on:click="count++">ditekan sebanyak {{count}} kali</button>'
});

Vue.component('blog-post', {
    props: ['postpros'],
    template:
        `
    <div>
        <h3>{{postpros.title}}</h3>
        <div v-html="postpros.content"></div>
    </div>
    `
});

var app = new Vue({
    el: '#app',
    data: {
        posts: [
            { id: 1, title: "program", content: "lorem ipsum" },
            { id: 2, title: "program", content: "lorem ipsum" },
            { id: 3, title: "program", content: "lorem ipsum" }
        ]
    }


});