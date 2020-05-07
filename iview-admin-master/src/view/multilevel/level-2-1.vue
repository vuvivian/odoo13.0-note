<!--
 * @Author: your name
 * @Date: 2019-08-15 03:33:52
 * @LastEditTime: 2020-04-07 15:03:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /iview-admin-master/src/view/multilevel/level-2-1.vue
 -->
<template>
  <SideMenu
    :menuList = 'menuList'
   >
  </SideMenu>
</template>
<script>
import SideMenu from 'ivew-side-menu-search-chg';
export default {
  name: 'level_2_1',
  data(){
    menuList: [ {
      name: '采购审核',
      menuIcon: ' iconfont icon-fenlei',
      url: '/check',
      children: [
        {
          name: '采购订单',
          menuIcon: ' iconfont icon-fenlei',
          url: '/check/po-list'
        }
      ]
    }]
  }
}
</script>
