<template>
  <div>
    <NavList :value="navItems"></NavList>
  </div>
</template>

<script>
import NavList from '@/nav-list/NavList'

export default {
  name: 'App',
  components: {NavList},
  computed: {
    navItems() { // Temporary
      return [{name: 'foo'}]
    },
  },
}
</script>
