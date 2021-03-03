<template>
    <div>
        <b-button class="float-right mb-2" variant="primary" @click.prevent="$refs.book_modal.create()"> <b-icon icon="file-earmark-plus"></b-icon> Add</b-button>
        <b-table
            striped
            hover
            responsive
            :items="books"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
        >
            <template v-slot:cell(id)="data">
                <b-dropdown text='Actions'>
                    <b-dropdown-item variant="primary" @click="$refs.book_modal.edit(data.value)"> <b-icon icon="pencil"></b-icon> Edit</b-dropdown-item>
                    <b-dropdown-item variant="danger" @click="$refs.book_modal.remove(data.value)"> <b-icon icon="x-circle"></b-icon> Remove</b-dropdown-item>
                </b-dropdown>
            </template>
        </b-table>
        <b-pagination
            v-model="currentPage"
            :total-rows="total"
            :per-page="perPage"
            align="center"
        ></b-pagination>
        <book-modal ref="book_modal" @success="getTable"/>
    </div>
</template>

<script>
import BookModal from './BookModal'
export default {
    name: 'BookTab',
    components: {
        BookModal
    },
    data() {
        return {
            perPage: 6,
            currentPage: 1,
            total: 0,
            books: [],
            fields: [
                {key: 'id', label: '#'},
                {key: 'title', label: 'Title', sortable: true},
                {key: 'isbn', label: 'ISBN', sortable: true},
                {key: 'author.firstName', label: 'Author', sortable: true}
            ]
        }
    },
    created() {
        this.getTable();
    },
    methods:{
        async getTable(){
            try {
                const {data} = await axios.get('book');
                this.books = data;
                this.total = data.length;
            } catch (e) {
                console.log(e);
            }
        }
    }
}
</script>

<style scoped>

</style>