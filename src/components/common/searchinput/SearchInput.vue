<template>
  <div id="search-input">
    <el-row class="demo-autocomplete">
      <el-autocomplete
        class="inline-input"
        v-model="currentSearch"
        :fetch-suggestions="querySearch"
        :placeholder="singerContent"
        :trigger-on-focus="false"
        @select="handleSelect"
        size="mini"
        @focus="sentFocus"
        :debounce="0"
      ></el-autocomplete>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  data() {
    return {
      values: [],
      currentSearch: ""
    };
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    singerContent: {
      type: String,
      default: ""
    },
    search: {
      type: String,
      default: ""
    }
  },
  created() {},
  mounted() {},
  methods: {
    querySearch(queryString, cb) {
      var list = this.list;
      var results = queryString
        ? list.filter(this.createFilter(queryString))
        : list;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return lists => {
        return (
          lists.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      //将从父组件传过来的search值作为子组件显示的值
      this.currentSearch = this.search;
      //发送事件给父组件，使得父组件可以根据传过去的值作为搜索条件
      this.$emit("sentSearch", item.value);
    },
    sentFocus() {
      //发送焦点事件给父组件，当有焦点时，清空其它以及自身搜索框的值
      this.$emit("sentFocus");
    }
  },
  computed: {}
};
</script>

<style scoped>
#search-input {
  display: inline-block;
}

.inline-input {
  height: 28px;
  width: 150px;
}

.el-input__inner {
  height: 28px;
  width: 150px;
}
</style>
