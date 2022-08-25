import { useAppProviderContext } from '/@/components/Application';
import { prefixCls } from '/@/settings/designSetting';
// import { computed } from 'vue';
// import { lowerFirst } from 'lodash-es';
export function useDesign(scope: string, prefixClsParam: string = prefixCls) {
  const values = useAppProviderContext();
  const prefixClsRet = values.prefixCls || prefixClsParam;
  // const $style = cssModule ? useCssModule() : {};

  // const style: Record<string, string> = {};
  // if (cssModule) {
  //   Object.keys($style).forEach((key) => {
  //     // const moduleCls = $style[key];
  //     const k = key.replace(new RegExp(`^${values.prefixCls}-?`, 'ig'), '');
  //     style[lowerFirst(k)] = $style[key];
  //   });
  // }
  return {
    // prefixCls: computed(() => `${values.prefixCls}-${scope}`),
    prefixCls: `${prefixClsRet}-${scope}`,
    prefixVar: prefixClsRet,
    // style,
  };
}
