
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## stylus/stylus-loader
```
npm install stylus/stylus-loader --save
```

## DatePicker.vue
- 这个组件就是成果啦,直接把文件放到别的项目中就可以使用

## 关键点
- 1.Date()中month是0-11,day是1234560
- 2.按六周计算，循环42次获得每一个i对应的真实日期currDate(可能有负值),month,展示在频幕上的日期showDate
- 3.想要完整获得每个月的日期表，需要三天的数据，分别是上个月最后一天(可用这个月month加上日期0获得)，这个月第一天和本月最后一天(用下个月month加上日期0来获得)
- 弹出的日期框为了可复用性且不影响到别的元素的布局用了绝对定位，所以位置需要动态获取(根据input框的位置+vue的生命周期钩子函数)