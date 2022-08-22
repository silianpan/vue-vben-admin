<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import { Drawer } from 'ant-design-vue';

  export default defineComponent({
    setup() {
      const visible = ref<boolean>(true);

      const afterVisibleChange = (bool: boolean) => {
        console.log('visible', bool);
      };

      return () => {
        return (
          <Drawer
            visible={visible.value}
            title="Basic Modal"
            onAfterVisibleChange={afterVisibleChange}
          />
        );
      };
    },
  });
</script>
