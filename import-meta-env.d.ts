// NOTE: so we can use import.meta.env inside workers without having to
// import the entire wmr types.d.ts which references jsx and other dom
// related stuff

declare interface ImportMeta {
  env: Record<string, string>
}
