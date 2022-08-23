<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import { Drawer } from 'ant-design-vue';

  export default defineComponent({
    setup(props, { slots }) {
      console.log('props', props);
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
          >
            {{
              default: () => slots.default?.(),
            }}
          </Drawer>
        );
      };
    },
  });
</script>
