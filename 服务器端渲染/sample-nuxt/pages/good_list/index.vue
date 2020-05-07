<template>
    <div>
        <h2>商品列表</h2>
        <ul>
            <li :key="item.id" v-for="item of list">
                <nuxt-link :to="'/details/'+ item.id">商品列表</nuxt-link> 
                {{item.name}}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data: () => {
            return {
                list: [
                    {id:'001', name:'aaa', price: 1000},
                    {id:'002', name:'ccc', price: 1030},
                    {id:'003', name:'vvv', price: 1200}
                ]
            }
        }
    }
</script>

<style>

</style>