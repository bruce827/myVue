// 立即执行函数，处理sidebar的交互逻辑
(function(){
    // 侧边栏按钮构造函数
    var Menubar = function(){
        this.el = document.querySelector('#sidebar ul');
        this.state = 'allClose';//open
        this.el.addEventListener('click',function(e){
            // 阻止事件的向上传递
            e.stopPropagation();
        });
        // 使用闭包来保存this指向
        var self = this; 
        // 打开页面的内容
        this.currentOpenMenuContent = null;
        this.menuList = document.querySelectorAll('#sidebar ul > li');
        for(var i=0;i<this.menuList.length;i++){
            this.menuList[i].addEventListener('click',function(e){
                var menuContentEl = document.getElementById(e.currentTarget.id + '-content');
                // console.log(menuContentEl);
                // 如果没有打开菜单，就直接打开，如果打开了，要先关闭
                if(self.state === 'allClose'){
                    console.log('打开'+menuContentEl.id);
                    menuContentEl.style.top = '0';
                    menuContentEl.style.left = '-85px';
                    // 初始化原有的类
                    menuContentEl.className = 'nav-content';
                    menuContentEl.classList.add('menuContent-move-right');
                    self.state = 'open';
                    // 保存内容页的状态，下同
                    self.currentOpenMenuContent = menuContentEl;

                }else{
                    console.log('关闭'+ self.currentOpenMenuContent.id);
                    self.currentOpenMenuContent.className = 'nav-content';
                    self.currentOpenMenuContent.style.top = '0';
                    self.currentOpenMenuContent.style.left = '35px';
                    self.currentOpenMenuContent.classList.add('menuContent-move-left');
                    console.log('打开' + menuContentEl.id);
                    menuContentEl.className = 'nav-content';
                    menuContentEl.style.top = '250px';
                    menuContentEl.style.left = '35px';
                    menuContentEl.classList.add('menuContent-move-up');
                    self.state = 'open';
                    self.currentOpenMenuContent = menuContentEl;
                }
            });
        };
        this.menuContentList = document.querySelectorAll('.nav-content > div.nav-con-close');
        for(i=0;i<this.menuContentList.length;i++){
            this.menuContentList[i].addEventListener('click',function(e){
                //关闭菜单内容
                var menuContent = e.currentTarget.parentNode; 
                menuContent.className = 'nav-content';
                menuContent.style.top = '0';
                menuContent.style.left = '35px';
                menuContent.classList.add('menuContent-move-left');
                this.state = 'allClose';
            });
        }

    };
    // 侧边栏菜单构造函数
    var Sidebar = function(eId,closeBarId){
        // 声明状态
        this.state = 'open';
        // 如果不传参数则使用默认参数
        this.el = document.getElementById(eId||'sidebar');
        this.closeBarEl = document.getElementById(closeBarId||'closeBar');
        // 采用闭包来调用函数外的对象
        var self = this;
        // 初始化菜单按钮
        this.menubar = new Menubar(); 
        this.el.addEventListener('click',function(event){
                // 回调函数采用冒泡机制实现事件传递
                if(event.target !== self.el){
                    // 如果目标点击的是自身
                    self.triggerSwich();
                }
        });
    }
    // 用原型链添加属性
    Sidebar.prototype.close = function(){
            console.log('关闭');
            this.el.className = 'sidebar-move-left';
            this.closeBarEl.className = 'closeBar-move-right';
            // 更改状态
            this.state = 'close';
    };
    Sidebar.prototype.open = function(){
            console.log('打开');
            // 设置起始坐标
            this.el.style.left = '-120px';
            this.closeBarEl.style.left = '160px';
            this.el.className = 'sidebar-move-right';
            this.closeBarEl.className = 'closeBar-move-left';
            // 更改状态
            this.state = 'open';
    }
    Sidebar.prototype.triggerSwich = function(){
        // 如果已经打开的就执行关闭函数，其余情况执行打开函数
        if(this.state === 'open'){
            this.close();
        }else{
            this.open();
        }
    };

    var sidebar = new Sidebar();
})();