<template>
    <div>
        <b-modal id="book-modal" title="Book" @ok.prevent="validation" @hidden="form = {}" ok-title="Save" ok-variant="success" ok-only>
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
                    <b-form-select
                    id="input-2"
                    v-model="form.authorId"
                    required
                    :options="options"
                    ></b-form-select>
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
                options: []
            }
        },
        methods: {
            create() {
                this.action = {
                    url: 'book',
                    method: 'post'
                };
                this.getAuthors();
                this.$bvModal.show('book-modal');
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
                } catch (e) {
                    // console.log(e);
                }
            },
            async edit(id) {
                this.tmpId = id;
                try {
                    const {data} = await axios.get(`book/${id}`);
                    this.form = data;
                    this.form.authorId = data.author.id;
                    this.$bvModal.show('book-modal');
                    this.action = {
                        url: 'book',
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
                        url: `book/${id}`
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
                        url: this.action.method == 'post' ? this.action.url : this.action.url+`/${this.tmpId}`,
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
            validation() {
                if (this.form.title === undefined) {
                    this.makeToast('error', 'Title is required');
                    return false;
                }
                if (this.form.isbn === undefined) {
                    this.makeToast('error', 'ISBN is required');
                    return false;
                }
                if (this.form.authorId === undefined) {
                    this.makeToast('error', 'Author is required');
                    return false;
                }
                return this.submit();
            },
            makeToast(type, txt=null) {
                switch (type) {
                    case 'error':
                        this.$bvToast.toast(txt === null ? 'There was an error' : txt, {
                            title: 'Error',
                            toaster: 'b-toaster-top-center',
                            variant: 'danger',
                            solid: true
                        });
                        break;
                    case 'success':
                        this.$bvToast.toast(txt === null ? 'Action successfully performed' : txt, {
                            title: 'Success',
                            toaster: 'b-toaster-top-center',
                            variant: 'success',
                            solid: true
                        });
                        break;
                    default:
                        this.$bvToast.toast('Unexpected error', {
                            title: 'Error',
                            toaster: 'b-toaster-top-center',
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