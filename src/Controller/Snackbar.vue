<script setup>
export default {
    name: 'Snackbar',
    props:{
        message: String,
        colorCode : String,

    }
};
</script>

<template>
    <v-snackbar
      :timeout="2000"
      :color="colorCode === success? green : colorCode === danger? red : colorCode === warning ? yellow : white"
    >
    {{message}}

    </v-snackbar>
</template>

<style lang="scss" scoped>

</style>