<template>
    <div>
        <b-button class="float-right mb-2" variant="primary" @click.prevent="$refs.author_modal.create()"> <b-icon icon="file-earmark-plus"></b-icon> Add</b-button>
        <b-table
            striped
            hover
            responsive
            :items="authors"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
        >
            <template v-slot:cell(id)="data">
                <b-dropdown text='Actions'>
                    <b-dropdown-item variant="primary" @click="$refs.author_modal.edit(data.value)"> <b-icon icon="pencil"></b-icon> Edit</b-dropdown-item>
                    <b-dropdown-item variant="danger" @click="$refs.author_modal.removeConfirm(data.value)"> <b-icon icon="x-circle"></b-icon> Remove</b-dropdown-item>
                </b-dropdown>
            </template>
        </b-table>
        <b-pagination
            v-model="currentPage"
            :total-rows="total"
            :per-page="perPage"
            align="center"
        ></b-pagination>
        <author-modal ref="author_modal" @success="getData"/>
    </div>
</template>

<script>
import AuthorModal from "./AuthorModal";
export default {
    name: 'BookTab',
    components: {
        AuthorModal
    },
    data() {
        return {
            perPage: 6,
            currentPage: 1,
            total: 0,
            authors: [],
            fields: [
                {key: 'id', label: '#'},
                {key: 'firstName', label: 'First Name', sortable: true},
                {key: 'lastName', label: 'Last Name', sortable: true}
            ]
        }
    },
    created() {
        this.getData();
    },
    methods:{
        async getData(){
            try {
                const {data} = await axios.get('author');
                this.authors = data;
                this.total = data.length;
            } catch (e) {
                // console.log(e);
                this.$bvToast.toast('Failed to get data', {
                    title: 'Error',
                    toaster: 'b-toaster-top-center',
                    variant: 'danger',
                    solid: true
                });
            }
        }
    }
}
</script>

<style scoped>

</style>