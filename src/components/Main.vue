<template>
    <b-container class="mt-3">
        <b-card no-body>
            <b-tabs card>
                <b-tab title="Showcase" active>
                    <Vitrine/>
                </b-tab>
                <b-tab title="Books">
                    <BookTab/>
                </b-tab>
                <b-tab title="Authors">
                    <AuthorTab/>
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
        }
    }
</script>

<style>
</style>
