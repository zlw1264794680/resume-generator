import type { ResumeData } from "@/types/resume";

// 示例数据（假数据）
export const sampleResumeData: ResumeData = {
  personalInfo: {
    name: "李明",
    phone: "13812345678",
    email: "liming@example.com",
    location: "北京",
    birthYear: "1995",
    gender: "男",
    status: "在职，正在找工作",
    currentCity: "北京",
    targetCities: ["北京", "上海", "深圳"],
    salaryExpectation: "20k-30k",
  },
  education: [
    {
      school: "北京大学",
      department: "计算机科学与技术 本科",
      degree: "本科",
      startDate: "2014年09月",
      endDate: "2018年07月",
      location: "北京",
    },
  ],
  skills: [
    { name: "HTML5, CSS3, JavaScript", level: "精通" },
    { name: "React, Vue, Angular", level: "熟练" },
    { name: "Node.js, Express", level: "熟练" },
    { name: "TypeScript", level: "熟练" },
    { name: "MySQL, MongoDB", level: "熟悉" },
    { name: "Docker, Kubernetes", level: "了解" },
  ],
  workExperience: [
    {
      company: "北京科技有限公司",
      position: "高级前端开发工程师",
      startDate: "2021年03月",
      endDate: "至今",
      location: "北京",
      responsibilities: [
        "负责公司核心产品的前端架构设计和开发",
        "带领5人前端团队，制定技术规范和工作流程",
        "优化前端性能，提升用户体验和页面加载速度",
        "与产品、设计和后端团队紧密合作，确保项目按时交付",
      ],
    },
    {
      company: "上海网络科技有限公司",
      position: "前端开发工程师",
      startDate: "2018年08月",
      endDate: "2021年02月",
      location: "上海",
      responsibilities: [
        "参与电商平台的前端开发和维护",
        "使用React开发响应式用户界面",
        "实现复杂的交互功能和数据可视化",
        "编写单元测试和集成测试，确保代码质量",
      ],
    },
  ],
  projectExperience: [
    {
      name: "企业资源管理系统",
      role: "前端负责人",
      startDate: "2022年01月",
      endDate: "2022年06月",
      description:
        "为大型制造企业开发的资源管理系统，包括人力资源、财务、库存和生产管理等模块",
      responsibilities: [
        "负责前端架构设计，使用React + TypeScript开发",
        "实现复杂的数据表格和图表展示功能",
        "开发可复用组件库，提高团队开发效率",
        "优化前端性能，减少首屏加载时间",
      ],
    },
    {
      name: "移动电商平台",
      role: "前端开发工程师",
      startDate: "2020年03月",
      endDate: "2020年09月",
      description:
        "面向年轻用户的移动端电商平台，支持商品浏览、购物车、支付和订单管理等功能",
      responsibilities: [
        "使用Vue.js开发移动端界面",
        "实现商品列表、详情页、购物车等核心功能",
        "优化页面加载速度和交互体验",
        "与后端团队协作，解决接口对接问题",
      ],
    },
  ],
  selfEvaluation: [
    "技术热情：持续关注前沿技术，具备快速学习能力，并乐于技术分享",
    "解决问题：善于分析复杂问题，能够独立思考并提出创新解决方案",
    "团队协作：良好的沟通能力和团队合作精神，能够有效与各角色协作",
    "项目管理：具备项目规划和任务分解能力，确保项目按时高质量交付",
  ],
};

// 真实数据（基于提供的简历案例）
export const realResumeData: ResumeData = {
  personalInfo: {
    name: "张乐伟",
    phone: "18320551866",
    email: "zlw1264794680@qq.com",
    location: "深圳",
    birthYear: "1998-03",
    gender: "男",
    status: "在职，正在找工作",
    currentCity: "深圳",
    targetCities: ["深圳", "广州"],
    salaryExpectation: "14k-16k",
  },
  education: [
    {
      school: "华南农业大学珠江学院",
      department: "计算机科学与技术 本科",
      degree: "本科",
      startDate: "2017年01月",
      endDate: "2021年01月",
      location: "广州",
    },
  ],
  skills: [
    { name: "HTML5, CSS3, ES6, TypeScript, Echarts", level: "熟练" },
    { name: "Vue2, Vue3, uni-app, Nuxt", level: "熟练" },
    { name: "微信小程序", level: "熟练" },
    { name: "React, Taro, ReactNative, Next", level: "熟悉" },
    { name: "Node, Express, Nest", level: "熟悉" },
    { name: "Electron", level: "熟悉" },
    { name: "MySQL, PostgreSQL", level: "熟悉" },
  ],
  workExperience: [
    {
      company: "深圳市滚水科技有限公司",
      position: "前端开发工程师",
      startDate: "2023年12月",
      endDate: "至今",
      location: "深圳",
      responsibilities: [
        "独立负责官网开发，使用 Nuxt 框架，优化SEO，提高产品页面交互效果",
        "独立负责企业管理小程序、app跨端开发，使用 uni-app 框架，提高产品页面交互效果",
        "独立负责内部项目研发，使用 Vue3 + Nest + MySQL + uni-app ",
      ],
    },
    {
      company: "深圳影儿时尚集团有限公司",
      position: "前端开发工程师",
      startDate: "2023年03月",
      endDate: "2023年10月",
      location: "深圳",
      responsibilities: [
        "独立负责商城h5个人中心模块重构，使用 Vue 2全家桶，提高产品页面交互效果",
        "独立负责商城 app 个人中心模块重构，使用 ReactNative 框架，提高产品页面交互效果",
        "参与商城模板配置模块重构，实现快速更换活动主题",
        "维护商城h5、小程序、app 多端，解决生产应急问题",
      ],
    },
    {
      company: "广州正盟计算机科技有限公司",
      position: "前端开发工程师",
      startDate: "2020年11月",
      endDate: "2023年02月",
      location: "广州",
      responsibilities: [
        "独立负责移动端项目开发，使用 uni-app 框架，进行业务表单流程类项目的H5移动端、微信小程序开发",
        "独立负责门户网站、H5移动端项目开发，使用 Vue2、Vue3+ElementUI ，配合 Echarts 图表，完成产品页面交互效果",
        "使用 Taro 框架，开发粤省事小程序、App的H5移动端项目。对 Taro 框架使用、注意事项，进行部门培训",
      ],
    },
  ],
  projectExperience: [
    {
      name: "CRM分析系统",
      role: "全栈开发工程师",
      startDate: "2024年05月",
      endDate: "2024年06月",
      description:
        "为提升销售团队效率与决策能力，开发了CRM分析系统，集成销售数据统计、客户跟进分析、话术效果评估等功能。通过可视化看板实时展示业绩与转化率。帮助销售团队优化跟进策略，缩短转化周期。",
      responsibilities: [
        "后台管理系统，使用Vue3 + arco-admin 开发",
        "后端服务，使用 Nest + TypeOrm + MySQL 开发，搭建日志打印在内的一系列基础后端架构。",
        "实现看板数据统计集成、销售人员的销售数据分析、客户跟进分析、集合AI实现有效话术库推荐。",
      ],
    },
    {
      name: "XX智能充换电项目",
      role: "前端开发工程师",
      startDate: "2024年03月",
      endDate: "2024年05月",
      description:
        "基于物联网的电池租赁平台，旨在为电动车用户提供高效便捷的电池更换和充电服务。",
      responsibilities: [
        "用户端重构，使用 uni-app + UnoCSS 开发，支持扫码租赁还电、冻结、礼品卡、地图查询、轨迹查看、BMS电池管理等。",
        "后台管理系统，基于 Vue2 开发，功能调整优化，支持设备轨迹追踪、定价调整、设备信息查看等。",
        "商户端，基于微信原生小程序开发，功能调整优化，复刻大部分后台管理系统功能，方便运营人员快捷处理问题。",
      ],
    },
    {
      name: "3D模具智慧生产报价系统",
      role: "前端开发工程师",
      startDate: "2024年01月",
      endDate: "2025年03月",
      description:
        "为解决传统模具制造行业的报价流程，高度依赖人工经验与繁琐计算，既耗费大量时间与精力，又极易产生误差。项目实现了全自动报价功能，极大地简化了传统的报价流程。不仅提高了买卖双方的沟通效率，还增强了报价的透明度和公正性，智慧赋能模具制造行业。",
      responsibilities: [
        "后台管理系统，使用 Vue2  开发，实现对模具官网的配置展示，订单查看，审核等操作。",
        "模具官网，使用 Nuxt + UnoCSS 开发， 实现上传模具、解析文件展示3d模具，实现模具并模、参数选择多样化，计算价格，调用paypal支付等操作。",
      ],
    },
    {
      name: "影儿商城",
      role: "前端开发工程师",
      startDate: "2023年03月",
      endDate: "2023年10月",
      description:
        "用于方便消费者购买商品和服务，以新零售的方式，将线上线下渠道进行融合，通过提供丰富的商品选择、安全的交易环境和良好的售后服务，为消费者提供便利和满意的购物体验。",
      responsibilities: [
        "个人中心H5、App 端重构开发、微信小程序端的维护调整。",
        "H5端使用 Vue 2全家桶开发、App 端使用 React Native 框架开发、小程序使用原生开发。",
        "优化页面交互性能，减少个人中心首页加载响应时间。",
        "根据 diff 算法，优化列表数据的表单添加，避免元素重复渲染，减少多余请求。",
      ],
    },
    {
      name: "清远粤省事供水服务",
      role: "前端开发工程师",
      startDate: "2022年11月",
      endDate: "2023年01月",
      description: "用于清远市供水服务，线上缴费、水费查询等民生服务。",
      responsibilities: [
        "H5移动端开发。",
        "使用 Taro 框架，开发业务流程类表单。",
        "实现消息订阅通知、支付功能。",
        "负责项目进度把控，封装项目通用轮子，带领前端同事参与开发。",
      ],
    },
    {
      name: "数看鹤山",
      role: "前端开发工程师",
      startDate: "2021年07月",
      endDate: "2022年11月",
      description: "用于鹤山数据分析管理，了解鹤山企业经济情况分析。",
      responsibilities: [
        "平板H5移动端开发。",
        "开发企业库模块，主要处理可视化数据图表、地图等交互页面，使用 Vue3、Ts ，配合 Less、Echarts、Vant 开发。",
        "路由 meta 配置不同页面的缓存、顶部搜索，利用 afterEach 守卫和 onActivated 钩子，解决有 KeepAlive 和路由切换导致页面切换失效问题。",
        "封装业务可视化组件，解决重复切换选择数据的渲染问题。",
      ],
    },
  ],
  selfEvaluation: [
    "技术热情：持续关注前沿技术（如WebAssembly等），具备快速学习能力，并乐于技术分享",
    "问题解决：逻辑清晰，善于分析复杂问题，能够立足全局视角设计开发，具备良好的代码优化与性能调优能力",
    "团队协作：良好的沟通表达能力，项目中积极协同后端，产品等角色，推动高效交付",
  ],
};

