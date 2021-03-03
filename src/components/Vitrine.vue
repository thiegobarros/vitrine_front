<template>
    <div>
        <b-input
            v-model="search"
            style="width: 200px;"
            class="float-right mb-2"
            placeholder="search"
        />
        <b-button-group class="mb-4">
            <b-button @click="orderBy('asc')"><b-icon-arrow-down></b-icon-arrow-down></b-button>
            <b-button @click="orderBy('desc')"><b-icon-arrow-up></b-icon-arrow-up></b-button>
            <b-button @click="reset()" variant="danger" title="Clear"><b-icon-arrow-clockwise></b-icon-arrow-clockwise></b-button>
        </b-button-group>
        <b-card-group>
            <b-row>
                <b-col
                    v-for="book in books"
                    :key="book.id"
                    md="4"
                >
                    <b-card
                        :title="book.title"
                        :img-src="'https://picsum.photos/600/300/?image='+book.id"
                        img-alt="Image"
                        img-top
                        tag="article"
                        class="mb-4"
                    >
                        <b-card-text>
                            <div>
                                <b>ISBN:</b> {{ book.isbn }}
                            </div>
                            <div>
                                <b>Author:</b> {{ book.author.firstName +" "+ book.author.lastName }}
                            </div>
                        </b-card-text>
                    </b-card>
                </b-col>
            </b-row>
        </b-card-group>
        <b-pagination
            v-model="currentPage"
            :total-rows="total"
            :per-page="perPage"
            align="center"
        ></b-pagination>
    </div>
</template>

<script>
export default {
    name: 'Vitrine',
    components: {
        
    },
    data() {
        return {
            books: [],
            search: null,
            currentPage: 1,
            perPage: 3,
            total: 0
        }
    },
    mounted() {
        this.getBooks(1);
    },
    watch: {
        search: function(value) {
            if (value.length >= 3) this.searchBook(value);
        },
        currentPage: function(value) {
            this.getBooks(value);
        }
    },
    methods: {
        async getBooks(page) {
            try {
                const {data} = await axios.get(`book/pagination/${page}`);
                this.books = data.content;
                this.total = data.totalElements;
                this.perPage = data.size;
            } catch (e) {
                console.log(e);
            }
        },
        async orderBy(val) {
            try {
                const {data} = await axios.get(`book/orderBy/${val}`);
                this.books = data;
            } catch (e) {
                console.log(e);
            }
        },
        async searchBook(param) {
            try {
                const {data} = await axios.get(`book/search/${param}`);
                this.books = data;
            } catch (e) {
                console.log(e);
            }
        },
        reset() {
            this.getBooks(1);
        }
    }
}
</script>

<style scoped>
</style>