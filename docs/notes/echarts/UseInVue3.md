## 在 Vue3 中使用 echarts

::: tip 地址

[`vue`](https://v3.cn.vuejs.org/): <code class="default">3.2.6</code> 版本<br />
[`echarts`](https://www.npmjs.com/package/echarts): 5.3.3 版本<br />
[`echarts-liquidfill`](https://github.com/ecomfe/echarts-liquidfill): 3.1.0 版本（水球图，个人觉得非常不错）
:::

### 用水球图作为使用案例
``` js
<template>
    <div ref="echartsRef" class="water-polo-echart"></div>
</template>
<script>
import * as echarts from 'echarts';
import 'echarts-liquidfill';
import { onMounted, onUnmounted, shallowRef } from 'vue';

export default {
    props: {
        data: Object // 后续新要求自己添加参数修改组件，目前只考虑常用
    },
    setup(props) {
        /**
         * shallowRef 能够创建一个跟踪自身 .value 变化的 ref，但不会使其值也变成响应式的
         * 使用ref时，框架对属性的代理，会影响到ECharts实例底层的运行，所以建议使用shallowRef
         * github参考地址：https://github.com/apache/echarts/issues/14974#issuecomment-842796847
         */
        const echartsRef = shallowRef();
        const myChart = shallowRef();
        onMounted(() => {
            myChart.value = echarts.init(echartsRef.value);
            myChart.value.setOption({
                title: {
                    text: props.data.title,
                    textStyle: {
                        align: 'center',
                        color: '#fff',
                        fontSize: 20
                    },
                    top: '5%',
                    left: 'center',
                    subtext: props.data.subtitle
                },
                backgroundColor: '#0F224C',
                graphic: [{
                    type: 'text',
                    left: 'center',
                    bottom: '5%',
                    style: {
                        fill: '#6e7079',
                        text: props.data.graphicText
                    }
                }],
                series: [
                    {
                        type: 'liquidFill',
                        radius: '65%',
                        center: ['50%', '55%'],
                        color: [
                            {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#446bf5'
                                    },
                                    {
                                        offset: 1,
                                        color: '#2ca3e2'
                                    }
                                ],
                                globalCoord: false
                            }
                        ],
                        data: props.data.value, // data个数代表波浪数
                        backgroundStyle: {
                            borderWidth: 1,
                            color: 'RGBA(51, 66, 127, 0.7)'
                        },
                        label: {
                            normal: {
                                textStyle: {
                                    fontSize: 50,
                                    color: '#fff'
                                }
                            }
                        },
                        outline: {
                            show: false,
                            borderDistance: 10,
                            itemStyle: {
                                borderWidth: 2,
                                borderColor: '#112165'
                            }
                        }
                    }
                ]
            });
        });

        onUnmounted(() => {
            myChart.value.dispose();
        });

        const resize = () => {
            myChart.value.resize();
        };

        return {
            resize,
            echartsRef
        };
    }
};
</script>
<style lang="less" scoped>
.water-polo-echart {
    flex: 1;
    min-width: 400px;
    height: 400px;
}
</style>
```