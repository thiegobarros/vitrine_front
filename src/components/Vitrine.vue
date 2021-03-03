<template>
    <div>
        <b-button class="float-right mb-2" variant="primary" @click.prevent="$refs.book_modal.create()"> <b-icon icon="file-earmark-plus"></b-icon> Add</b-button>
        <book-modal ref="book_modal"/>
    </div>
</template>

<script>
import BookModal from './BookModal'
export default {
    name: 'Vitrine',
    components: {
        BookModal
    }
}
</script>

<style scoped>

</style>