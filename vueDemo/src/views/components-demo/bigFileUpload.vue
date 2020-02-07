<template>
  <div class="components-container">
    <code>核心思想是前台通过 <strong>Blob.prototype.slice</strong>方法来分割大文件，然后通过并发将分段文件发给nodejs搭建的后台服务，
      后台接收到分段文件后，先进行排序（由于是并发所以顺序有可能乱），后台在收到合并请求后，调用<strong>fs.appendFileSync</strong>API来进行拼接保存。
      这里后台使用简单的nodejs搭建服务，目的只是为了模拟过程，后台代码不具有参考价值。<br />
      另外，通常项目中，对于大文件的传输与存放一定是一个单独的地址接口甚至可能将大文件存放在公司级的服务器上，所以demo中没有经过service层来处理请求
      而是使用了原生的request方案。
    </code>
    <div>
      <!-- TODO:改用element中的upload -->
      <input type="file" @change="handleFileChange" />
      <el-button @click="handleUpload">上传</el-button>
    </div>
  </div>
</template>

<script>
  //   import BackToTop from "@/components/BigFileUpload";

  // 切片数量
  const LENGTH = 10;
  // 文件服务器
  const requestURL = "http://localhost:3000"
  export default {
    name: "bigFileUpload",
    components: {},
    data() {
      return {
        container: {
          file: null,
          data: []

        }
      };
    },
    mounted() {},
    methods: {
      // 使用原生请求
      // TODO:使用原生请求
      request({
        url,
        method = "post",
        data,
        headers = {},
        requestList
      }) {
        return new Promise(resolve => {
          const xhr = new XMLHttpRequest();
          xhr.open(method, url);
          Object.keys(headers).forEach(key =>
            xhr.setRequestHeader(key, headers[key])
          );
          xhr.send(data);
          xhr.onload = e => {
            resolve({
              data: e.target.response
            });
          };
        });
      },

      // 监听文件改变
      handleFileChange(e) {
        // 用二进制数组接收
        const [file] = e.target.files;
        if (!file) return;
        Object.assign(this.$data, this.$options.data());
        this.container.file = file;
      },

      // 生成文件切片
      createFileChunk(file, length = LENGTH) {
        const fileChunkList = [];
        // 计算每个切片的大小单位为Kb
        const chunkSize = Math.ceil(file.size / length);
        let cur = 0;
        while (cur < file.size) {
          fileChunkList.push({
            // 传入开始位置与终止位置
            file: file.slice(cur, cur + chunkSize)
          });
          cur += chunkSize;
        }
        return fileChunkList;
      },
      // 上传切片
      async uploadChunks() {
        console.log(this.data);
        const requestList = this.data
          // 创建formdata对象
          // https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects
          .map(({
            chunk
          }) => {
            const formData = new FormData();
            formData.append("chunk", chunk);
            formData.append("hash", hash);
            formData.append("filename", this.container.file.name);
            return {
              formData
            };
          })
          // 将文件切片逐个发送至后台
          .map(async ({
              formData
            }) =>
            this.request({
              url: requestURL,
              data: formData
            }));
        await Promise.all(requestList); // 并发切片
        await this.mergeRequest(); // 合并请求
      },
      // 合并请求,告知服务器哪个文件可以合并了
      async mergeRequest() {
        await this.request({
          url: requestURL+"/merge",
          headers: {
            "content-type": "application/json"
          },
          data: JSON.stringify({
            filename: this.container.file.name
          })
        });
      },
      // 上传
      async handleUpload() {
        if (!this.container.file) return;
        // 创建切片
        const fileChunkList = this.createFileChunk(this.container.file);
        this.data = fileChunkList.map(({
          file
        }, index) => ({
          chunk: file,
          // 在生成文件切片时，需要给每个切片一个标识作为 hash，这里暂时使用文件名 + 下标，这样后端可以知道当前切片是第几个切片，用于之后的合并切片。
          hash: this.container.file.name + "-" + index
        }));
        await this.uploadChunks();
      }
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/variables.scss";

  .components-container {
    margin: 10px;

    strong {
      color: $light-blue;
    }
  }

</style>
