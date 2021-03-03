<template>
    <div>
        <b-modal id="book-modal" title="Book" @ok.prevent="submit" @hidden="form = {}" ok-title="Save" ok-variant="success" ok-only>
            <b-form>
                <b-form-group id="input-group-1" label="Title:" label-for="input-1">
                    <b-form-input
                    id="input-2"
                    v-model="form.title"
                    required
                    placeholder="title"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="ISBN:" label-for="input-2">
                    <b-form-input
                    id="input-2"
                    v-model="form.isbn"
                    required
                    placeholder="isbn"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Author:" label-for="input-2">
                    <b-form-select v-model="form.authorId" :options="options">{{ selected }}</b-form-select>
                </b-form-group>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
    export default {
        name: 'BookModal',
        data() {
            return {
                form: {},
                action: {},
                tmpId: '',
                selected: null,
                options: []
            }
        },
        watch:{
            // options: function (newVal, oldVal) {
            //     console.log(newVal, oldVal);
            // }
        },
        methods: {
            create() {
                this.action = {
                    url: 'book',
                    method: 'post'
                };
                this.$bvModal.show('book-modal');
                this.getAuthors();
            },
            async getAuthors() {
                try {
                    const {data} = await axios.get('author');
                    Object.entries(data).forEach(([key, obj]) => {
                        this.options.push({
                            "value": obj.id,
                            "text": obj.firstName
                        })
                    });
                    // this.selected = '1';
                } catch (e) {
                    console.log(e);
                }
            },
            async edit(id) {
                this.tmpId = id;
                try {
                    const {data} = await axios.get(`book/${id}`);
                    this.form = data;
                    this.$bvModal.show('book-modal');
                    this.action = {
                        url: 'book',
                        method: 'put'
                    };
                    this.makeToast('success');
                } catch (e) {
                    console.log(e);
                    this.makeToast('error');
                }
                
            },
            async remove(id) {
                try {
                    const {data} = await axios({
                        method: 'delete',
                        url: `book/${id}`
                    });
                    this.$emit('success');
                    this.makeToast('success');
                } catch(e) {
                    console.log(e);
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
                    this.$nextTick(()=> this.$bvModal.hide('book-modal'));
                    this.makeToast('success');
                }catch(e){
                    // console.log(e);
                    this.makeToast('error');
                }
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