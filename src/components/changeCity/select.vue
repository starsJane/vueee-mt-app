<template>
<!-- 封装的省市选择器 showWrapper是点击显示下拉框，documentClick是点击外边文档隐藏下拉框-->
<!-- 自定义指令: 通过自定义指令绑定document事件   在入口文件绑定 -->
    <!-- disabled为true时不展示，动态加一个class类名，加样式不让它点击即cursor:not-allowed -->
    <div :class="['choose-wrap', disabled?'disabled':'']"   @click="showWrapper" v-document-click="documentClick">
        <div class="choose">
            <span>{{value}}</span>
            <i class="el-icon-caret-bottom"></i>

            <!-- 第一个类名mt-content必须有，第二个类名active动态添加 -->
            <!-- 不是按行，是按列来渲染的；每一列最多十二个，所以有列没占满 -->
            <div :class="{'mt-content': true, 'active': showWrapperActive}">
                <h2>{{title}}</h2>

                <div :class="['wrapper', className]">
                    <!-- 添加类名className，改变宽度 -->
                    <!-- listData经过分列后的数据 -->
                    <div class="col" v-for="(listData, index) in renderList" :key="index">
                        <span 
                            :class="{'mt-item': true, 'active': item.name == value}" 
                            v-for="(item, index) in listData" 
                            :key="index" 
                            @click="changeValue(item)">{{item.name}}</span>
                        <!-- @click="changeValue"点击选择城市相应展示在框里   'active'控制样式-->
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            // 两个组件之间通信，点击其中一个下拉框再点击另外一个，另外一个消失
            // showWrapperActive: false   父级传过来
        }
    },
    // 父组件province通过 props 向下传递数据给子组件；子组件通过 events 给父组件发送消息。
    props: [
        "list",
        "title",
        "value",

        "showWrapperActive",

        "disabled",

        "className"
    ],

    // 对list进行处理，每一列最多十二个，控制下拉数据的分列
    computed: {
        renderList: function () {
            // col列数      Math.ceil向上取整
            let col = Math.ceil(this.list.length / 12);
            let resultList = [];
            for (var i = 0; i < col; i ++) {
                // 传坐标值，从第几个位置获取到第几个位置
                let data = this.list.slice(i * 12, i * 12 + 12);
                resultList.push(data);
            }
            return resultList;
        }
    },

    methods: {
        showWrapper(e) {
            // 阻止事件冒泡 防止同时触发documentClick
            e.stopPropagation();

            // this.showWrapperActive = true

            // $emit调用父组件的自定义事件change_active，disabled为false时才展示（changeProvince执行完之后）
            if (!this.disabled) {
                this.$emit('change_active', true);
            }

        },
        documentClick() {
            // this.showWrapperActive = false;

            this.$emit('change_active', false);
            console.log('document-click')
        },
        changeValue(item) {
            this.$emit('change', item);
        }

    }
}
</script>

<style lang = scss>
    @import "@/assets/css/changecity/select.scss";
</style>