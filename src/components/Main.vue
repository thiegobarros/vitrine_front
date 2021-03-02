<template>
    <b-container class="mt-3">
        <b-card no-body>
            <b-tabs card>
                <b-tab title="Books" active>
                    <Vitrine/>
                </b-tab>
                <b-tab title="Authors">
                    <div>
                        <b-button class="float-right mb-2" variant="primary" @click.prevent="$refs.form_modal.create()"> <b-icon icon="file-earmark-plus"></b-icon> Add</b-button>
                        <b-table striped hover :items="contatos" :fields="fields">
                            <template v-slot:cell(id)="data">
                                <b-dropdown text='Actions'>
                                    <b-dropdown-item variant="primary" @click="$refs.form_modal.edit(data.value)"> <b-icon icon="pencil"></b-icon> Edit</b-dropdown-item>
                                    <b-dropdown-item variant="danger" @click="$refs.form_modal.remove(data.value)"> <b-icon icon="x-circle"></b-icon> Remove</b-dropdown-item>
                                </b-dropdown>
                            </template>
                        </b-table>    
                        <form-modal ref="form_modal" @success="getTable"/>
                    </div>
                </b-tab>
            </b-tabs>
        </b-card>
    </b-container>
</template>

<script>
    import FormModal from "./FormModal";
    import Vitrine from "./Vitrine";
    export default {
        name: 'Main',
        components: {
            FormModal,
            Vitrine
        },
        data() {
            return {
                contatos: [],
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
                    this.contatos = data;
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
</script>

<style>
</style>
