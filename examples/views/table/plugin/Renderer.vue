<template>
  <div>
    <p class="tip">具体兼容请查看 <a class="link" href="https://github.com/x-extends/vxe-table-plugin-renderer" target="_blank">vxe-table-plugin-renderer</a> 插件的 API</p>

    <vxe-grid
      border
      resizable
      show-overflow
      height="400"
      :loading="loading"
      :data="tableData"
      :columns="tableColumn"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      tableData: [
        { id: 101, name: 'test1', num10: [60, 111], num11: [60, 111, 80], num12: [60, 134, 76], num20: [30, 70], num21: [30, 70], num30: [47, 67, 67], num31: [[60, 28, 26], [77, 100], [77, 100, 8, 55, 100, 77, 142]], num40: [20, 30, 50] },
        { id: 102, name: 'test2', num10: [85, 20], num11: [33, 25, 147], num12: [42, 73, 22], num20: [50, 50], num21: [60, 40], num30: [60, 83, 33], num31: [[28, 60, 32], [88, 40], [22, 100, 9, 55, 111, 86, 100]], num40: [200, 400, 500] },
        { id: 103, name: 'test3', num10: [45, 10], num11: [60, 104, 99], num12: [6, 64, 18], num20: [33, 67], num21: [27, 78], num30: [84, 11, 14], num31: [[100, 17, 39], [100, 220], [7, 100, 11, 77, 105, 77, 100]], num40: [10, 80, 10] },
        { id: 104, name: 'test4', num10: [105, 10], num11: [76, 99, 49], num12: [41, 81, 77], num20: [11, 89], num21: [50, 50], num30: [25, 71, 67], num31: [[19, 76, 99], [77, 702], [33, 100, 77, 66, 174, 69, 100]], num40: [80, 10, 10] },
        { id: 105, name: 'test5', num10: [72, 40], num11: [27, 157, 100], num12: [48, 101, 76], num20: [19, 81], num21: [67, 33], num30: [100, 29, 55], num31: [[35, 63, 100], [53, 8], [77, 100, 66, 33, 100, 97, 100]], num40: [18, 30, 26] },
        { id: 106, name: 'test6', num10: [50, 60], num11: [8, 111, 56], num12: [60, 5, 19], num20: [16, 84], num21: [17, 83], num30: [66, 100, 67], num31: [[13, 57, 60], [330, 546], [11, 100, 58, 72, 100, 178, 100]], num40: [14, 33, 26] },
        { id: 107, name: 'test7', num10: [16, 157], num11: [60, 6, 67], num12: [9, 97, 57], num20: [98, 2], num21: [86, 14], num30: [60, 9, 5], num31: [[60, 40, 0], [120, 100], [22, 100, 77, 44, 10, 77, 198]], num40: [20, 5, 15] },
        { id: 108, name: 'test8', num10: [24, 20], num11: [23, 68, 81], num12: [35, 111, 80], num20: [63, 37], num21: [99, 1], num30: [55, 76, 67], num31: [[46, 71, 83], [77, 100], [77, 100, 65, 97, 9, 59, 100]], num40: [10, 20, 30, 40] },
        { id: 109, name: 'test9', num10: [100, 30], num11: [14, 66, 80], num12: [27, 44, 34], num20: [48, 52], num21: [8, 92], num30: [97, 60, 41], num31: [[55, 33, 53], [747, 52], [73, 100, 78, 81, 100, 77, 174]], num40: [14, 20, 36] },
        { id: 1010, name: 'test10', num10: [100, 50], num11: [44, 98, 6], num12: [29, 107, 127], num20: [72, 28], num21: [22, 78], num30: [17, 10, 31], num31: [[77, 100, 58], [75, 85], [14, 250, 59, 44, 16, 50, 100]], num40: [200, 400, 500] }
      ],
      tableColumn: [
        { field: 'num10', title: '柱状图', cellRender: { name: 'bar' } },
        {
          field: 'num11',
          title: '柱状图 - 显示值',
          cellRender: {
            name: 'bar',
            props: {
              label: {
                formatter: '{value}'
              }
            }
          }
        },
        {
          field: 'num12',
          title: '柱状图 - 最大值',
          cellRender: {
            name: 'bar',
            props: {
              bar: {
                max: 140
              },
              colors: ['#FFDB5C', '#91C7AE', '#D48265'],
              tooltip: {
                formatter: '值：{value}'
              },
              label: {
                formatter: '{value}'
              }
            }
          }
        },
        { field: 'num20', title: '饼图 - 环形', width: 100, cellRender: { name: 'pie', props: { ring: { diameter: '60%' } } } },
        {
          field: 'num21',
          title: '饼图 - 环形',
          width: 100,
          cellRender: {
            name: 'pie',
            props: {
              colors: ['#FFDB5C', '#F0F0F0'],
              ring: {
                diameter: '60%'
              },
              label: {
                formatter: '{value[0]}%'
              }
            }
          }
        },
        {
          field: 'num30',
          title: '饼图 - 环形',
          width: 100,
          cellRender: {
            name: 'pie',
            props: {
              colors: ['#FFDB5C', '#91C7AE', '#D48265'],
              ring: {
                diameter: '60%',
                color: '#2F4554'
              },
              label: {
                color: '#ffffff',
                formatter: '概况'
              }
            }
          }
        },
        { field: 'num40', title: '饼图', width: 100, cellRender: { name: 'pie' } },
        {
          field: 'num31',
          title: '多种混合',
          width: 200,
          cellRender: {
            name: 'pies',
            children: [
              {
                props: {
                  tooltip: {
                    formatter: '值：{value}'
                  },
                  colors: ['#FFDB5C', '#D48265'],
                  ring: { diameter: '60%' }
                }
              },
              {
                props: {
                  tooltip: {
                    formatter: '值：{value}'
                  }
                }
              },
              {
                props: {
                  tooltip: {
                    formatter: '值：{value}'
                  }
                }
              }
            ]
          }
        }
      ],
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          show-overflow
          height="400"
          :loading="loading"
          :data="tableData"
          :columns="tableColumn"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [
                { id: 101, name: 'test1', num10: [60, 111], num11: [60, 111, 80], num12: [60, 134, 76], num20: [30, 70], num21: [30, 70], num30: [47, 67, 67], num31: [[60, 28, 26], [77, 100], [77, 100, 8, 55, 100, 77, 142]], num40: [20, 30, 50] },
                { id: 102, name: 'test2', num10: [85, 20], num11: [33, 25, 147], num12: [42, 73, 22], num20: [50, 50], num21: [60, 40], num30: [60, 83, 33], num31: [[28, 60, 32], [88, 40], [22, 100, 9, 55, 111, 86, 100]], num40: [200, 400, 500] },
                { id: 103, name: 'test3', num10: [45, 10], num11: [60, 104, 99], num12: [6, 64, 18], num20: [33, 67], num21: [27, 78], num30: [84, 11, 14], num31: [[100, 17, 39], [100, 220], [7, 100, 11, 77, 105, 77, 100]], num40: [10, 80, 10] },
                { id: 104, name: 'test4', num10: [105, 10], num11: [76, 99, 49], num12: [41, 81, 77], num20: [11, 89], num21: [50, 50], num30: [25, 71, 67], num31: [[19, 76, 99], [77, 702], [33, 100, 77, 66, 174, 69, 100]], num40: [80, 10, 10] },
                { id: 105, name: 'test5', num10: [72, 40], num11: [27, 157, 100], num12: [48, 101, 76], num20: [19, 81], num21: [67, 33], num30: [100, 29, 55], num31: [[35, 63, 100], [53, 8], [77, 100, 66, 33, 100, 97, 100]], num40: [18, 30, 26] },
                { id: 106, name: 'test6', num10: [50, 60], num11: [8, 111, 56], num12: [60, 5, 19], num20: [16, 84], num21: [17, 83], num30: [66, 100, 67], num31: [[13, 57, 60], [330, 546], [11, 100, 58, 72, 100, 178, 100]], num40: [14, 33, 26] },
                { id: 107, name: 'test7', num10: [16, 157], num11: [60, 6, 67], num12: [9, 97, 57], num20: [98, 2], num21: [86, 14], num30: [60, 9, 5], num31: [[60, 40, 0], [120, 100], [22, 100, 77, 44, 10, 77, 198]], num40: [20, 5, 15] },
                { id: 108, name: 'test8', num10: [24, 20], num11: [23, 68, 81], num12: [35, 111, 80], num20: [63, 37], num21: [99, 1], num30: [55, 76, 67], num31: [[46, 71, 83], [77, 100], [77, 100, 65, 97, 9, 59, 100]], num40: [10, 20, 30, 40] },
                { id: 109, name: 'test9', num10: [100, 30], num11: [14, 66, 80], num12: [27, 44, 34], num20: [48, 52], num21: [8, 92], num30: [97, 60, 41], num31: [[55, 33, 53], [747, 52], [73, 100, 78, 81, 100, 77, 174]], num40: [14, 20, 36] },
                { id: 1010, name: 'test10', num10: [100, 50], num11: [44, 98, 6], num12: [29, 107, 127], num20: [72, 28], num21: [22, 78], num30: [17, 10, 31], num31: [[77, 100, 58], [75, 85], [14, 250, 59, 44, 16, 50, 100]], num40: [200, 400, 500] }
              ],
              tableColumn: [
                { field: 'num10', title: '柱状图', cellRender: { name: 'bar' } },
                {
                  field: 'num11',
                  title: '柱状图 - 显示值',
                  cellRender: {
                    name: 'bar',
                    props: {
                      label: {
                        formatter: '{value}'
                      }
                    }
                  }
                },
                {
                  field: 'num12',
                  title: '柱状图 - 最大值',
                  cellRender: {
                    name: 'bar',
                    props: {
                      bar: {
                        max: 140
                      },
                      colors: ['#FFDB5C', '#91C7AE', '#D48265'],
                      tooltip: {
                        formatter: '值：{value}'
                      },
                      label: {
                        formatter: '{value}'
                      }
                    }
                  }
                },
                { field: 'num20', title: '饼图 - 环形', width: 100, cellRender: { name: 'pie', props: { ring: { diameter: '60%' } } } },
                {
                  field: 'num21',
                  title: '饼图 - 环形',
                  width: 100,
                  cellRender: {
                    name: 'pie',
                    props: {
                      colors: ['#FFDB5C', '#F0F0F0'],
                      ring: {
                        diameter: '60%'
                      },
                      label: {
                        formatter: '{value[0]}%'
                      }
                    }
                  }
                },
                {
                  field: 'num30',
                  title: '饼图 - 环形',
                  width: 100,
                  cellRender: {
                    name: 'pie',
                    props: {
                      colors: ['#FFDB5C', '#91C7AE', '#D48265'],
                      ring: {
                        diameter: '60%',
                        color: '#2F4554'
                      },
                      label: {
                        color: '#ffffff',
                        formatter: '概况'
                      }
                    }
                  }
                },
                { field: 'num40', title: '饼图', width: 100, cellRender: { name: 'pie' } },
                {
                  field: 'num31',
                  title: '多种混合',
                  width: 200,
                  cellRender: {
                    name: 'pies',
                    children: [
                      {
                        props: {
                          tooltip: {
                            formatter: '值：{value}'
                          },
                          colors: ['#FFDB5C', '#D48265'],
                          ring: { diameter: '60%' }
                        }
                      },
                      {
                        props: {
                          tooltip: {
                            formatter: '值：{value}'
                          }
                        }
                      },
                      {
                        props: {
                          tooltip: {
                            formatter: '值：{value}'
                          }
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        }
        `
      ]
    }
  }
}
</script>
