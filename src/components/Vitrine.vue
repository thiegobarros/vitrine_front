<template>
    <div>
        <b-input
            v-model="search"
            style="width: 200px;"
            class="float-right mb-2"
            placeholder="search"
        />
        <b-button-group class="mb-4">
            <b-button @click="setOrderBy()">
                <b-icon-arrow-down v-if="orderBy == 'asc'"></b-icon-arrow-down>
                <b-icon-arrow-up v-if="orderBy == 'desc'"></b-icon-arrow-up>
            </b-button>
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
            search: '',
            currentPage: 1,
            perPage: 6,
            total: 0,
            orderBy: 'asc'
        }
    },
    mounted() {
        this.getData();
    },
    watch: {
        search: function(value) {
            this.getData();
        },
        currentPage: function(value) {
            this.getData();
        }
    },
    methods: {
        async getData() {
            try {
                const {data} = await axios.post('book/vitrine', {
                    currentPage: this.currentPage,
                    perPage: this.perPage,
                    orderBy: this.orderBy,
                    param: this.search
                });
                this.books = data.content;
                this.total = data.totalElements;
                this.perPage = data.size;
            } catch (e) {
                // console.log(e);
                this.$bvToast.toast('Failed to get data', {
                    title: 'Error',
                    toaster: 'b-toaster-top-center',
                    variant: 'danger',
                    solid: true
                });
            }
        },
        async setOrderBy() {
            this.orderBy = this.orderBy == 'asc' ? 'desc' : 'asc';
            this.getData();
        },
        reset() {
            this.currentPage = 1;
            this.orderBy = 'asc';
            this.search = '',
            this.getData();
        }
    }
}
</script>

<style scoped>
</style>