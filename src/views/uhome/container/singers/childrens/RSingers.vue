<template>
  <div id="rsingers">
    <div class="title">
      <h3>
        <span>{{ title }}</span>
      </h3>
      <div class="singer-info">
        <div
          class="singer-img"
          v-for="(item, index) in pageSingerInfo"
          :key="index"
        >
          <a href="javascript:void(0);" @click="itemClick(item.singerid)">
            <img :src="item.singerphotourl" alt="" />
            <div class="singer-name">
              <span>{{ item.singername }}</span>
            </div>
          </a>
        </div>
      </div>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pagesize"
          layout="total, prev, pager, next, jumper"
          background
          :total="singerInfo.length"
          style="textAlign: center"
          @prev-click="prevClick"
          @next-click="nextClick"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rsingers",
  data() {
    return {
      total: 0,
      //当前页数
      currentPage: 1,
      //1页10个数据
      pagesize: 20,
      pageSingerInfo: []
    };
  },
  props: {
    title: {
      type: String,
      deafult: ""
    },
    singerInfo: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mounted() {},
  watch: {
    singerInfo(newValue, oldValue) {
      this.pageSingerInfo = newValue.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    }
  },
  methods: {
    itemClick(sid) {
      this.$router.push({
        path: "/singer",
        query: {
          sid
        }
      });
    }, //点击之后的当前页数
    handleCurrentChange(val) {
      // 当前页数
      this.currentPage = val;
      // slice会改变原数组，故将其赋值给一个新数组从而展示这个新数组的数据
      this.pageSingerInfo = this.singerInfo.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
    prevClick() {
      window.scrollTo(0, 0);
    },
    nextClick() {
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style scoped>
#rsingers {
  display: flex;
  flex-direction: column;
}

#rsingers .title {
  height: 40px;
  border-bottom: 2px solid #c20c0c;
}

#rsingers .title h3 {
  padding: 0;
  margin: 0;
  font-size: 24px;
  font-weight: normal;
}

#rsingers .singer-info {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}

#rsingers .singer-info a {
  color: #000;
  font-size: 12px;
  text-decoration: none;
}

#rsingers .singer-info a span:hover {
  border-bottom: 1px solid #000;
}

#rsingers .singer-info img {
  width: 130px;
  height: 130px;
}

#rsingers .singer-info .singer-img {
  margin-bottom: 20px;
  margin-right: 18px;
}

#rsingers .block {
  margin-top: 70px;
}
</style>
