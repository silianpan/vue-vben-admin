export function configSingleHMRConfig() {
  return {
    name: 'singleHMR',
    handleHotUpdate({ modules, file }) {
      // todo 等作者更新 https://github.com/anncwb/vue-vben-admin/issues/376
      if (file.match(/xml$/)) return [];

      // 清掉所有依赖注入
      modules.map((m: any) => {
        m.importedModules = new Set();
        m.importers = new Set();
      });

      return modules;
    },
  };
}
