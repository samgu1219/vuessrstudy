module.exports = (isDev)=>{
  return {
    preserveWhitespace:true,
    extractCSS:!isDev,
    hotReload: isDev
  }
}