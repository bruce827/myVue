import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 20

/**
 * 补休剩余天数逻辑，随机生成：补休、已休和剩余天数，其关系为：
 * 补休天数 = 已休天数 + 剩余天数
 */
const vacationDays = ()=>{
    const repairDays = Math.floor(Math.random(365)*100);
    const alreadyDays = Math.floor(Math.random()*repairDays);
    const residueDays = repairDays - alreadyDays;

    return {
        repairDays,
        alreadyDays,
        residueDays
    }
    
}

for (let i = 0; i < count; i++) {
    // 随机生成休假时间
    const vDays = vacationDays();
    List.push(Mock.mock({
        /* 通用测试用例数据*/
        id:'@guid',
        // 员工编号
        empNum: 'SR@integer(0,9999999999)',
        // 员工姓名
        empName: '@cname',
        // 身份证号
        empIdCard: '@id',
        // 出生日期
        birthday: '@date',
        // 所属公司
        company: Mock.Random.region() + '大区',
        // 二级组织单元
        secondUnit: Mock.Random.city() + '分部',
        // 三级组织单元
        'thirdUnit|1': ['开发', '市场', '销售', '计划', 'UI', '测试', '运维', '管理'],
        // 合同履行地
        contractCity: Mock.Random.city(),
        // 签约地点
        signCity: Mock.Random.city(),
        // 合同类型
        'contractType|1': ['个人劳务合同', '无', '-'],
        // 合同期限类型
        'contractlimitType|1': ['固定期限合同', '-'],
        // 合同状态
        'contractStus|1': ['续签', '解除', '新签订', '-'],
        // 当前应用合同
        presentContract: '-',
        // 合同编号
        contrtactCode: 'SR@date("yyyy")' +'-@integer(0,9)'+ '@integer(1,5)',
        // 起始日期
        startDate: '@date',
        // 合同终止日期
        endDate: '@date',
        // 合同主体
        contractMajor:  Mock.Random.pick(['沈阳', '大连', '上海', '南京', '广州', '青岛'])+'斯锐信息技术有限公司',
        /** 调休假管理 */
        // 调休假所属年份
        vacationYear: '@date("yyyy")',
        // 到期日期
        expireDate:'@date()',
        // 补休天数
        repairDays:vDays.repairDays,
        // 已休天数
        alreadyDays:vDays.alreadyDays,
        // 剩余天数
        residueDays:vDays.residueDays,
        // 补休原因
        vacationReason:'@ctitle',
        // 是否可折现
        'isCash|1':['是','否'],
        // 是否已过期
        'isDated|1':['是','否'],
        // 录入人
        enteringPerson:'@cname',
        // 录入日期
        enteringDate:'@date()'

    }))
}

export default {
    getList: config => {
        // debugger
        // 筛选条件：员工编号、员工姓名、合同状态、组织机构、合同主体、合同期限类型、合同类型、起始日期、终止日期
        const {
            empNum,
            empName,
            contractStus,
            secondUnit,
            contractMajor,
            contractlimitType,
            contractType,
            startDate,
            endDate,
            page = 1, limit = 20, sort } = param2Obj(config.url)

        let mockList = List.filter(item => {
            // 员工编号模糊查询 
            if (empNum && item.empNum.indexOf(empNum) < 0) return false
            //  员工姓名
            if (empName && item.empName.indexOf(empName) < 0) return false
            // 合同状态
            if (contractStus && item.contractStus !== contractStus) return false
            // 组织机构
            if (secondUnit && item.secondUnit !== secondUnit) return false
            // 合同主体
            if (contractMajor && item.contractMajor !== contractMajor) return false
            // 合同期限类型
            if (contractlimitType && item.contractlimitType !== contractlimitType) return false
            // 合同类型
            if (contractType && item.contractType !== contractType) return false

            return true
        })

        if (sort === '-id') {
            mockList = mockList.reverse()
        }

        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    

        return {
            total: mockList.length,
            items: pageList
        }
    },
    getPv: () => ({
        pvData: [
            { key: 'PC', pv: 1024 }, 
            { key: 'mobile', pv: 1024 }, 
            { key: 'ios', pv: 1024 }, 
            { key: 'android', pv: 1024 }
        ]
    }),
    getArticle: (config) => {
        const { id } = param2Obj(config.url)
        for (const article of List) {
            if (article.id === +id) {
                return article
            }
        }
    },
    createArticle: () => ({
        data: 'success'
    }),
    updateArticle: () => ({
        data: 'success'
    }),
    getInlineSortTable: () => ({
        data: List
    })
}
