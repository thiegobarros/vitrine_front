<template>
    <div>
        <b-modal id="form-modal" title="Author" @ok.prevent="submit" @hidden="form = {}" ok-title="Save" ok-variant="success" ok-only>
            <b-form>
                <b-form-group id="input-group-1" label="Fisrt Name:" label-for="input-1">
                    <b-form-input
                    id="input-2"
                    v-model="form.firstName"
                    required
                    placeholder="first name"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Last Name:" label-for="input-2">
                    <b-form-input
                    id="input-2"
                    v-model="form.lastName"
                    required
                    placeholder="first name"
                    ></b-form-input>
                </b-form-group>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
    export default {
        name: 'FormModal',
        data() {
            return {
                form: {},
                action: {},
                tmpId: ''
            }
        },
        methods: {
            create() {
                this.action = {
                    url: 'author',
                    method: 'post'
                };
                this.$bvModal.show('form-modal');
            },
            async edit(id) {
                this.tmpId = id;
                try {
                    const {data} = await axios.get(`author/${id}`);
                    this.form = data;
                    this.$bvModal.show('form-modal');
                    this.action = {
                        url: 'author',
                        method: 'put'
                    };
                } catch (e) {
                    console.log(e)
                }
                
            },
            async remove(id) {
                try {
                    const {data} = await axios({
                        method: 'delete',
                        url: `author/${id}`
                    });
                    this.$emit('success');
                } catch(e) {
                    console.log(e)
                }
            },
            async submit() {
                try{
                    const {data} = await axios({
                        method: this.action.method,
                        url:this.action.method == 'post' ? this.action.url : this.action.url+`/${this.tmpId}`,
                        data: this.form
                    });
                    this.$emit('success');
                    this.$nextTick(()=> this.$bvModal.hide('form-modal'));
                }catch(e){
                    console.log(e)
                }
            },
        }
    }
</script>

<style>

</style>