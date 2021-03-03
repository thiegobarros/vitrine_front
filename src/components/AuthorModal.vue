<template>
    <div>
        <b-modal id="form-modal" title="Author" @ok.prevent="validation" @hidden="form = {}" ok-title="Save" ok-variant="success" ok-only>
            <b-form>
                <b-form-group id="input-group-1" label="First Name:" label-for="input-1">
                    <b-form-input
                    id="input-1"
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
        name: 'AuthorModal',
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
                    // console.log(e);
                    this.makeToast('error');
                }
                
            },
            async remove(id) {
                try {
                    const {data} = await axios({
                        method: 'delete',
                        url: `author/${id}`
                    });
                    this.$emit('success');
                    this.makeToast('success');
                } catch(e) {
                    // console.log(e);
                    this.makeToast('error');
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
                    this.makeToast('success');
                }catch(e){
                    // console.log(e);
                    this.makeToast('error');
                }
            },
            validation() {
                if (this.form.firstName === undefined) {
                    this.makeToast('error');
                    return false;
                }
                if (this.form.lastName === undefined) {
                    this.makeToast('error');
                    return false;
                }
                return this.submit();
            },
            makeToast(type) {
                switch (type) {
                    case 'error':
                        this.$bvToast.toast('There was an error', {
                            title: 'Error',
                            variant: 'danger',
                            solid: true
                        });
                        break;
                    case 'success':
                        this.$bvToast.toast('Action successfully performed', {
                            title: 'Success',
                            variant: 'success',
                            solid: true
                        });
                        break;
                    default:
                        this.$bvToast.toast('Unexpected error', {
                            title: 'Error',
                            variant: 'danger',
                            solid: true
                        });
                        break;
                }
            }
        }
    }
</script>

<style>

</style>