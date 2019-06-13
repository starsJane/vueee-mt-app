<template>
    <div class="m-nav">
        <ul class="nav">
            <!-- 每个li通过类名来判断下拉的不同样式 -->
            <!-- dl dd 和 ul li 相似，不过dl dd多了个dt可以用来做列表标题-->
            <li class="list">
                <!-- router-link和dl两个是一级的 -->
                <router-link to="/">我的美团</router-link>
                <dl>
                    <dd>
                        <router-link to="/">我的订单</router-link>
                    </dd>
                    <dd>
                        <router-link to="/">我的收藏</router-link>
                    </dd>
                    <dd>
                        <router-link to="/">抵用券</router-link>
                    </dd>
                    <dd>
                        <router-link to="/">账户设置</router-link>
                    </dd>
                </dl>
            </li>
            <li>
                <router-link to="/">手机APP</router-link>
            </li>
            <li class="list bd">
                <!-- router-link和dl两个是一级的 -->
                <router-link to="/">商家中心</router-link>
                <dl>
                    <dd>
                        <router-link to="/">登录商家中心</router-link>
                    </dd>
                    <dd>
                        <router-link to="/">美团智能收银</router-link>
                    </dd>
                    <dd>
                        <router-link to="/">我想合作</router-link>
                    </dd>
                    <dd>
                        <router-link to="/">手机免费开店</router-link>
                    </dd>
                </dl>
            </li>
            <li class="list site">
                <!-- router-link和subContainer两个是一级的 -->
                <router-link to="/">网站导航</router-link>
                <div class="subContainer">
                    <!-- dl的class表示不同类型展示不同宽度（列数） -->
                    <dl class="hotel">
                        <dt>酒店旅游</dt>
                        <dd>
                            <router-link to="/">国际机票</router-link>
                        </dd>
                        <dd>
                            <router-link to="/">火车票</router-link>
                        </dd>
                        <dd>
                            <router-link to="/">榛果民宿</router-link>
                        </dd>
                        <dd>
                            <router-link to="/">经济型酒店</router-link>
                        </dd>
                    </dl>

                    <dl class="food">
                        <dt>吃美食</dt>
                        <dd>
                            <router-link to="/">烤鱼</router-link>
                        </dd>
                        <dd>
                            <router-link to="/">特色小吃</router-link>
                        </dd>
                        <dd>
                            <router-link to="/">烧烤</router-link>
                        </dd>
                        <dd>
                            <router-link to="/">自助餐</router-link>
                        </dd>
                    </dl>

                    <dl class="movie">
                        <dt>看电影</dt>
                        <dd>
                            <router-link to="/">热映电影</router-link>
                        </dd>
                        <dd>
                            <router-link to="/">热门影院</router-link>
                        </dd>
                        <dd>
                            <router-link to="/">热映电影口碑榜</router-link>
                        </dd>
                        <dd>
                            <router-link to="/">最受期待电影</router-link>
                        </dd>
                    </dl>

                    <dl class="app">
                        <dt>手机应用</dt>
                        <dd>
                            <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2445468140,2491956848&fm=27&gp=0.jpg" title="美团app" alt="美团app">
                        </dd>
                        <dd>
                            <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3114134016,3724999534&fm=27&gp=0.jpg" title="外卖app" alt="外卖app">
                        </dd>
                        <dd>
                            <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1060470795,806559895&fm=27&gp=0.jpg" title="榛果app" alt="榛果app">
                        </dd>
                        <dd>
                            <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2291811751,1320685423&fm=27&gp=0.jpg" title="点评app" alt="点评app">
                        </dd>
                    </dl>
                </div>
            </li>
        </ul>
    </div>

</template>

<script>
export default {

}
</script>

<style scoped>

</style>
