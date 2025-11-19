<template>
  <div :style="{height:height+'px',zIndex:zIndex}" class="simplemde-container">
    <textarea :id="id"/>
  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.min.css'
import 'simplemde/dist/simplemde.min.css'
import SimpleMDE from 'simplemde'

export default {
  name: 'SimplemdeMd',
  props: {
    value: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: false,
      default: 'markdown-editor-' + +new Date()
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 150
    },
    zIndex: {
      type: Number,
      default: 10
    },
    toolbar: {
      type: Array,
      default: function() {
        return [
          {
            name: "bold",
            action: SimpleMDE.toggleBold,
            className: "fa fa-bold",
            title: "粗体",
          },
          {
            name: "italic",
            action: SimpleMDE.toggleItalic,
            className: "fa fa-italic",
            title: "斜体",
          },
          {
            name: "quote",
            action: SimpleMDE.toggleBlockquote,
            className: "fa fa-quote-left",
            title: "引用",
          },
          {
            name: "code",
            action: SimpleMDE.toggleCodeBlock,
            className: "fa fa-code",
            title: "代码",
          },
          {
            name: "strikethrough",
            action: SimpleMDE.toggleStrikethrough,
            className: "fa fa-strikethrough",
            title: "更正",
          },
          {
            name: "heading-1",
            action: SimpleMDE.toggleHeading1,
            className: "fa fa-header fa-header-x fa-header-1",
            title: "一级标题",
          },
          {
            name: "heading-1",
            action: SimpleMDE.toggleHeading1,
            className: "fa fa-header fa-header-x fa-header-1",
            title: "二级标题",
          },
          // 目前两级标题就够使用了
          // {
          //   name: "heading-3",
          //   action: SimpleMDE.toggleHeading3,
          //   className: "fa fa-header fa-header-x fa-header-3",
          //   title: "三级标题",
          // },
          {
            name: "unordered-list",
            action: SimpleMDE.toggleUnorderedList,
            className: "fa fa-list-ul",
            title: "无序列表",
          },
          {
            name: "ordered-list",
            action: SimpleMDE.toggleOrderedList,
            className: "fa fa-list-ol",
            title: "有序列表",
          },
          "|",
          {
            name: "preview",
            action: SimpleMDE.togglePreview,
            className: "fa fa-eye no-disable",
            title: "预览",
          },
          {
            name: "side-by-side",
            action: SimpleMDE.toggleSideBySide,
            className: "fa fa-columns no-disable no-mobile",
            title: "双栏模式",
          },
          {
            name: "fullscreen",
            action: SimpleMDE.toggleFullScreen,
            className: "fa fa-arrows-alt no-disable no-mobile",
            title: "全屏编辑",
          }
        ]
      }
    }
  },
  data() {
    return {
      simplemde: null,
      hasChange: false
    }
  },
  watch: {
    value(val) {
      if (val === this.simplemde.value() && !this.hasChange) return
      this.simplemde.value(val)
    }
  },
  mounted() {
    this.simplemde = new SimpleMDE({
      element: document.getElementById(this.id),
      autoDownloadFontAwesome: false,
      autofocus: this.autofocus,
      toolbar: this.toolbar.length > 0 ? this.toolbar : undefined,
      spellChecker: false,
      insertTexts: {
        link: ['[', ']( )']
      },
      // hideIcons: ['guide', 'heading', 'quote', 'image', 'preview', 'side-by-side', 'fullscreen'],
      placeholder: this.placeholder
    })
    if (this.value) {
      this.simplemde.value(this.value)
    }
    this.simplemde.codemirror.on('change', () => {
      if (this.hasChange) {
        this.hasChange = true
      }
      this.$emit('input', this.simplemde.value())
    })
  },
  destroyed() {
    this.simplemde.toTextArea()
    this.simplemde = null
  }
}
</script>

<style scoped>
.simplemde-container>>>.CodeMirror {
  min-height: 150px;
  line-height: 20px;
}

.simplemde-container>>>.CodeMirror-scroll {
  min-height: 150px;
}

.simplemde-container>>>.CodeMirror-code {
  padding-bottom: 40px;
}

.simplemde-container>>>.editor-statusbar {
  display: none;
}

.simplemde-container>>>.CodeMirror .CodeMirror-code .cm-link {
  color: #1890ff;
}

.simplemde-container>>>.CodeMirror .CodeMirror-code .cm-string.cm-url {
  color: #2d3b4d;
}

.simplemde-container>>>.CodeMirror .CodeMirror-code .cm-formatting-link-string.cm-url {
  padding: 0 2px;
  color: #E61E1E;
}
.simplemde-container >>> .editor-toolbar.fullscreen,
.simplemde-container >>> .CodeMirror-fullscreen {
  z-index: 1003;
}
</style>
