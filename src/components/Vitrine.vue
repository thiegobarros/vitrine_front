<template>
    <b-container class="mt-3">
        <b-card>
            <template v-slot:header>
                <h1 class="mb-0">Vitrine</h1>
            </template>
            <b-button class="float-right mb-2" variant="primary" @click.prevent="$refs.form_modal.create()"> <b-icon icon="file-earmark-plus"></b-icon> Cadastrar</b-button>
            <b-table striped hover :items="contatos" :fields="fields">
                <template v-slot:cell(id)="data">
                    <b-dropdown text='Ações'>
                        <b-dropdown-item variant="primary" @click="$refs.form_modal.edit(data.value)"> <b-icon icon="pencil"></b-icon> Editar</b-dropdown-item>
                        <b-dropdown-item variant="danger" @click="$refs.form_modal.remove(data.value)"> <b-icon icon="x-circle"></b-icon> Excluir</b-dropdown-item>
                    </b-dropdown>
                </template>
            </b-table>    
        </b-card>
        <form-modal ref="form_modal" @success="getTable"/>
    </b-container>
</template>

<script>
    import FormModal from "./FormModal";
    export default {
        name: 'Vitrine',
        components: {
            FormModal
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
