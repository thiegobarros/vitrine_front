<template>
    <b-container class="mt-3">
        <b-card no-body>
            <b-tabs card>
                <b-tab title="Showcase" active @click="renderTab('vitrine')">
                    <Vitrine ref="vitrine"/>
                </b-tab>
                <b-tab title="Books" @click="renderTab('book')">
                    <BookTab ref="book"/>
                </b-tab>
                <b-tab title="Authors" @click="renderTab('author')">
                    <AuthorTab ref="author"/>
                </b-tab>
            </b-tabs>
        </b-card>
    </b-container>
</template>

<script>
    import Vitrine from "./Vitrine";
    import BookTab from "./BookTab";
    import AuthorTab from "./AuthorTab";
    export default {
        name: 'Main',
        components: {
            Vitrine,
            BookTab,
            AuthorTab
        },
        methods: {
            renderTab(param) {
                this.$refs[param].getData();
            }
        }
    }
</script>

<style>
</style>
