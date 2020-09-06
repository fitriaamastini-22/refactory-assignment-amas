<template>
  <div>
    <navbar>
      <slot name="navbar"></slot>
    </navbar>
    <div class="row align-items-start">
      <div class="col-3">
        <sidebar>
          <slot name="sidebar"></slot>
        </sidebar>
      </div>
      <div class="col">
        <slot></slot>
      </div>
    </div>

    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>