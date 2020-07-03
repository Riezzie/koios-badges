export function onAppInit(svc: any): () => Promise<any> {
  console.log("%cinitialize service", 'color: red; font-weight: bold');
  return svc.initialize;
}