module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  //vue官方格式指导https://github.com/vuejs/eslint-config-vue
  rules: {
    // 每行最大属性数
    "vue/max-attributes-per-line": [2, {
      // 单行
      "singleline": 10,
      // 多行
      "multiline": {
        "max": 1,
        // 允许第一行设置属性
        "allowFirstLine": false
      }
    }],
    // name属性强制大小写，大写驼峰
    "vue/name-property-casing": ["error", "PascalCase"],
    // 对象中的get和set方法必须同时出现
    'accessor-pairs': 2,
    // 箭头函数的前后空格
    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],
    // 单行语句强制空格
    'block-spacing': [2, 'always'],
    // 大括号与缩进样式
    'brace-style': [2, '1tbs', {
      'allowSingleLine': true
    }],
    // 强制驼峰命名
    'camelcase': [0, {
      'properties': 'always'
    }],
    // 对象字面量项尾不能有逗号
    'comma-dangle': [2, 'never'],
    //逗号前后的空格
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    //末尾逗号 
    'comma-style': [2, 'last'],
    // 派生类必调super
    'constructor-super': 2,
    // if必须加{}
    'curly': [2, 'multi-line'],
    // 对象方法调用"."的位置
    'dot-location': [2, 'object'],
    // 尾随换行符
    'eol-last': 2,
    // 必须使用全等
    'eqeqeq': [2, 'allow-null'],
    // 生成器函数*前后加空格
    'generator-star-spacing': [2, {
      'before': true,
      'after': true
    }],
    // nodejs 处理错误
    'handle-callback-err': [2, '^(err|error)$'],
    // 缩进
    'indent': [2, 2, {
      'SwitchCase': 1
    }],
    // jsx 语法
    'jsx-quotes': [2, 'prefer-single'],
    // 对象属性值冒号前后加空格
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true
    }],
    // 对象属性冒号
    'keyword-spacing': [2, {
      'before': true,
      'after': true
    }],
    // new对象时候对象以大写字母开头
    'new-cap': [2, {
      'newIsCap': true,
      'capIsNew': false
    }],
    // new对象时候允许省略括号
    'new-parens': 2,
    // 不允许使用Array来构造函数
    'no-array-constructor': 2,
    // 禁止使用arguments.caller（es5废弃）
    'no-caller': 2,
    /** 
     * 以下是js规范中的内容，建议配置为vscde默认
     */
    'no-console': 'off',
    'no-class-assign': 2,
    'no-cond-assign': 2,
    'no-const-assign': 2,
    'no-control-regex': 0,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty-character-class': 2,
    'no-empty-pattern': 2,
    'no-eval': 2,
    'no-ex-assign': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': [2, 'functions'],
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [2, {
      'allowLoop': false,
      'allowSwitch': false
    }],
    'no-lone-blocks': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-multiple-empty-lines': [2, {
      'max': 1
    }],
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-return-assign': [2, 'except-parens'],
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    'no-trailing-spaces': 2,
    'no-undef': 2,
    'no-undef-init': 2,
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [2, {
      'defaultAssignment': false
    }],
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unused-vars': [2, {
      'vars': 'all',
      'args': 'none'
    }],
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,
    /** 
     * js规范结束
    */
    // var声明一个变量 
    'one-var': [2, {
      'initialized': 'never'
    }],
    // 折行语句换行符
    'operator-linebreak': [2, 'after', {
      'overrides': {
        '?': 'before',
        ':': 'before'
      }
    }],
    // 语句块内首行空行
    'padded-blocks': [2, 'never'],
    // 引号类型
    'quotes': [2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    // 强制分号结尾
    'semi': [2, 'never'],
    // 分号前后空格
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
    //不以新行开始的块 
    'space-before-blocks': [2, 'always'],
    // 方法声明前空格
    'space-before-function-paren': [2, 'never'],
    // （）里面不要有空格
    'space-in-parens': [2, 'never'],
    // 运算符两边的空格
    'space-infix-ops': 2,
    // 一元运算符前后空格
    'space-unary-ops': [2, {
      'words': true,
      'nonwords': false
    }],
    // 语句块{前不要加空格
    'spaced-comment': [2, 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    // 模板中{}内不允许有空格
    'template-curly-spacing': [2, 'never'],
    // 判断数值类型是否NaN
    'use-isnan': 2,
    // typeof是否可以和其他值比较
    'valid-typeof': 2,
    // 立即执行函数（）规则
    'wrap-iife': [2, 'any'],
    // yield 前后空格
    'yield-star-spacing': [2, 'both'],
    // 尤达条件
    'yoda': [2, 'never'],
    // 如果一个变量从不重新分配，使用const声明更好
    'prefer-const': 2,
    // 禁止使用debuger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 检查{}内允许不必要的空格
    'object-curly-spacing': [2, 'always', {
      objectsInObjects: false
    }],
    // 是否允许非空数组里面有多余的空格
    'array-bracket-spacing': [2, 'never']
  }
}
