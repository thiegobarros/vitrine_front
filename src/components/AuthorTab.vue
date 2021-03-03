<template>
    <div>
        <b-button class="float-right mb-2" variant="primary" @click.prevent="$refs.author_modal.create()"> <b-icon icon="file-earmark-plus"></b-icon> Add</b-button>
        <b-table striped hover :items="authors" :fields="fields">
            <template v-slot:cell(id)="data">
                <b-dropdown text='Actions'>
                    <b-dropdown-item variant="primary" @click="$refs.author_modal.edit(data.value)"> <b-icon icon="pencil"></b-icon> Edit</b-dropdown-item>
                    <b-dropdown-item variant="danger" @click="$refs.author_modal.remove(data.value)"> <b-icon icon="x-circle"></b-icon> Remove</b-dropdown-item>
                </b-dropdown>
            </template>
        </b-table>    
        <author-modal ref="author_modal" @success="getTable"/>
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
            authors: [],
            fields: [
                {key: 'id', label: '#'},
                'firstName',
                'lastName'
            ]
        }
    },
    created() {
        this.getTable();
    },
    methods:{
        async getTable(){
            try {
                const {data} = await axios.get('author');
                this.authors = data;
            } catch (e) {
                console.log(e);
            }
        }
    }
}
</script>

<style scoped>

</style>