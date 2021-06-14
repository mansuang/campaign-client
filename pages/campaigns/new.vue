<template lang="html">
  <sui-form>
      <sui-header dividing>Create a Campaign</sui-header>
    <sui-form-field>
      <label>Minimum Contribution (wei)</label>
      <input placeholder="100" />
    </sui-form-field>
    <sui-button type="submit" primary>Create</sui-button>
  </sui-form>
</template>

<script>
export default {
  name: 'FormExample',
};
</script>
