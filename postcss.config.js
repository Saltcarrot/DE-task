module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-preset-env')({
      browsers: "last 3 versions",
      autoprefixer: { grid: true },
    })
  ]
}